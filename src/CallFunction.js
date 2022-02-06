import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "./utils/firebase";
const defaultImg = 'https://e7.pngegg.com/pngimages/1004/160/png-clipart-computer-icons-user-profile-social-web-others-blue-social-media.png'
  
export const register = async (email,pwd,fname,lname) => {
    try {
      const userData = await createUserWithEmailAndPassword(auth, email, pwd)
      const data = userData.user

      await set(ref(database, 'users/' + data.uid), {
        email: email,
        firstName: fname,
        lastName:lname,
        profile_picture: defaultImg
      });
      return 'success'

    } catch (error) {
      
      return error.message
    }
    
  }
