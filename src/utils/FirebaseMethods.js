import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { onValue, ref, set, update } from "firebase/database";
import { auth, database } from "./firebase";
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
      displayName: fname+" "+lname,
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
