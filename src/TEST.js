import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth, database, storage } from './utils/firebase';
import { ref, set, update } from "firebase/database";
import useDownloader from 'react-use-downloader';
import { LinearProgress } from '@mui/material';

import { ref as sRef, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import './App.css';
import Dashboard from './Components/Dashboard';
import List from './Components/List';

function App() {

  const {
    size,
    elapsed,
    percentage,
    download,
    cancel,
    error,
    isInProgress,
  } = useDownloader();
  const [progess, setProgess] = useState(0);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});
  const [url, setUrl] = useState('');
  const [show, setShow] = useState([]);
  const defaultImg = 'https://e7.pngegg.com/pngimages/1004/160/png-clipart-computer-icons-user-profile-social-web-others-blue-social-media.png'
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  }
  const showFiles = () => {
    const listRef = sRef(storage, 'files/');

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        setShow(res.items)
        res.items.forEach((itemRef) => {

        });
      }).catch((error) => {
        console.log(error.message)
      });
  }
  
  const downloadFiles = async (filename) => {
    const starsRef = sRef(storage, filename);
    await getDownloadURL(starsRef)
      .then((url) => {

        setUrl(url)
        download(url, filename)
      })
  }
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = sRef(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed', (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgess(prog)
    }, (err) => console.log('error :>> ', err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => setUrl(url))
      });
  }
  const register = async () => {
    try {
      const userData = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      const data = userData.user

      await set(ref(database, 'users/' + data.uid), {
        username: registerName,
        email: registerEmail,
        profile_picture: defaultImg
      });

    } catch (error) {
      alert(error.message)
    }
  }

  const login = async () => {
    try {
      const userData = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log('userData :>> ', userData);
      const data = userData.user;
      await update(ref(database, 'users/' + data.uid), {
        last_login: Date.now()
      });
    } catch (error) {
      console.log(error.message)
    }

  }
  const google = async () => {
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
  const facebook = async () => {
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
  const logout = async () => {
    await signOut(auth)
  }

  return (
    <div className="App">
      <div>
        <h3> Register User </h3><br></br>
        <input
          placeholder="Name..."
          onChange={(e) => setRegisterName(e.target.value)}
        /><br></br>
        <input
          placeholder="Email..."
          type='email'
          onChange={(e) => setRegisterEmail(e.target.value)}
        /><br></br>
        <input
          placeholder="Password..."
          onChange={(e) => setRegisterPassword(e.target.value)}
        /><br></br><br></br>
        <button onClick={register}> Create User</button>
      </div><br></br>
      <div>
        <h3> Login </h3><br></br>
        <input
          placeholder="Email..."
          onChange={(e) => setLoginEmail(e.target.value)}
        /><br></br>
        <input
          placeholder="Password..."
          onChange={(e) => setLoginPassword(e.target.value)}
        /><br></br><br></br>
        <button onClick={login}> Login</button>
        <button onClick={google}> Google</button>
        <button onClick={facebook}> Facebook</button>
      </div><br></br>

      <h4> User Logged In: </h4><br></br>
      {user ? <Dashboard user={user} logout={logout} /> : "User Don't Exist"}

      <div>
        <form onSubmit={formHandler}>
          <input type='file' />
          <button type='submit'>Upload</button>
        </form>
        <hr />
        <LinearProgress variant="determinate" value={progess} />
        <h3>{progess} %</h3>
        <img src={url} alt='img' width='200px' />
        <button onClick={downloadFiles}>Click to download the file</button>
        <button onClick={showFiles}>Show the file</button>
        {show !== null ? show.map((item,index) => {
          return <button key={index} onClick={()=>downloadFiles(item._location.path_)}  style={{ display: 'flex', flexDirection: 'column', margin: '10px' }} >
              {item._location.path_}
            </button>
          
        }) : 'nothing'}
      </div>
    </div>
  );
}

export default App;
