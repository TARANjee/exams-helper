import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Navbar from './Components/Navbar';
import Notes from './Pages/Notes';
import Footer from './Components/Footer';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Terms from './Pages/Terms';
import NoPage from './Pages/NoPage';
import { onValue, getDatabase, ref } from 'firebase/database';
import Questionpaper from './Pages/Questionpaper';


const App = () => {

  const [item, setItem] = useState({})
  useEffect(() => {
    console.log("HELLO");
    ReadData('')
  }, [])

  const ReadData = async () => {

    try {
      const db = getDatabase();
      const itemRef = ref(db, `items`);
      onValue(itemRef, (snapshot) => {
        let data = snapshot.val();
        setItem(data)
      });
    }
    catch (err) {
      console.log(err)
    }
  }

  console.log("items", item)
  return (

    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard items={item} />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="notes" element={<Notes />} />
        <Route path="questionpaper" element={<Questionpaper items={item} />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </div>
  )
};

export default App;
