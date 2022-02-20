import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { onValue, ref, set, update } from "firebase/database";
import { ref as sRef, listAll, getDownloadURL } from "firebase/storage";
import { auth, database, storage } from "../utils/firebase";
import useDownloader from 'react-use-downloader';
import { Redirect } from "react-router-dom";
const defaultImg = 'https://e7.pngegg.com/pngimages/1004/160/png-clipart-computer-icons-user-profile-social-web-others-blue-social-media.png'

export const register = async (email, pwd, fname, lname) => {
  try {
    const userData = await createUserWithEmailAndPassword(auth, email, pwd)
    const data = userData.user

    await set(ref(database, 'users/' + data.uid), {
      email: email,
      firstName: fname,
      lastName: lname,
      profile_picture: defaultImg
    });
    await updateProfile(auth.currentUser, {
      displayName: fname + " " + lname,
      photoURL: defaultImg
    })

  } catch (error) {

    return error.message
  }

}
export const login = async (email, pwd) => {
  try {
    const userData = await signInWithEmailAndPassword(auth, email, pwd)
    const data = userData.user

    await update(ref(database, 'users/' + data.uid), {
      last_login: Date.now()
    });
    return 'success'

  } catch (error) {

    return error.message
  }

}
export const logout = async () => {
  try {
    await signOut(auth)
    return;
  } catch (error) {

    return error.message
  }

}
export const EmailVerify = async () => {
  try {
    await sendEmailVerification(auth.currentUser)
    return 'success'

  } catch (error) {

    return error.message
  }

}
export const ReadData = async (user) => {
  let data = {}
  try {
    let currentUserRef = await ref(database, 'users/' + user.uid);
    await onValue(currentUserRef, async (snapshot) => {
      data = await snapshot.val();

    });

    console.log('full', data)
    return data

  } catch (error) {

    return error.message
  }

}
export const showFiles = (folder) => {
  const filesRef = sRef(storage, `${folder}/`);

  // Find all the prefixes and items.
  listAll(filesRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      console.log(res.items)
      res.items.forEach((itemRef) => {

      });
    }).catch((error) => {
      console.log(error.message)
    });
}

export async function DownloadFiles(filename) {
  
  const starsRef = sRef(storage, filename);
  await getDownloadURL(starsRef)
    .then((url) => {
      <a download={url}></a>
    })
}
