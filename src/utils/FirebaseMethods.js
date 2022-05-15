import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { child, get, onValue, ref, set, update, getDatabase } from "firebase/database";
import { ref as sRef, listAll } from "firebase/storage";
import { auth, database, storage } from "../utils/firebase";

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
export const ReadData = async (i) => {
  console.log("i", i)
  let index = i === '' ? '' : i;
  console.log("index", index)
  const dbRef = ref(getDatabase());
  get(child(dbRef, `items/${index}`)).then((snapshot) => {

    if (snapshot.exists()) {
      console.log("helo",snapshot.val());
     
    } else {
      console.log("No data available");
    }
    return snapshot.val()
  }).catch((error) => {
    console.error(error);
  });

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

export const google = async () => {
  const provider = new GoogleAuthProvider()
  const userData = await signInWithPopup(auth, provider)
  console.log('userData :>> ', userData);
  const data = userData.user

  await set(ref(database, 'users/' + data.uid), {
    username: data.displayName,
    email: data.email,
    profile_picture: data.photoURL
  });

}
export const facebook = async () => {
  const provider = new FacebookAuthProvider()
  const userData = await signInWithPopup(auth, provider)
  console.log('userData :>> ', userData);
  const data = userData.user

  await set(ref(database, 'users/' + data.uid), {
    username: data.displayName,
    email: data.email,
    profile_picture: data.photoURL
  });
}