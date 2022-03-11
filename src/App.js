import React, { useEffect, useState } from "react"
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Terms from './Pages/Terms';
import NoPage from './Pages/NoPage';
import { onValue, getDatabase, ref } from 'firebase/database';
import Questionpaper from './Pages/Questionpaper';

import BooksAndNotes from './Pages/BooksAndNotes';


const App = () => {

  const [item, setItem] = useState({})
  const [otherItem, setOtherItem] = useState({})
  const [bookItem, setBookItem] = useState([])
  const [NoteItem, setNoteItem] = useState([])
  useEffect(() => {
    ReadDataItems()
    ReadDataOther()
    fetchBooks()
    fetchNotes()
  }, [])
  

  const ReadDataItems = async () => {

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
  const ReadDataOther = async () => {

    try {
      const db = getDatabase();
      const itemRef = ref(db, `otherItems`);
      onValue(itemRef, (snapshot) => {
        let data = snapshot.val();
        setOtherItem(data)
      });
    }
    catch (err) {
      console.log(err)
    }
  }
  
  const fetchBooks = async() => {
    try {
      const db = getDatabase();
      const itemRef = ref(db, `books`);
      onValue(itemRef, (snapshot) => {
        let data = snapshot.val();
  
        setBookItem(data)
      });
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchNotes = async() => {
    try {
      const db = getDatabase();
      const itemRef = ref(db, `notes`);
      onValue(itemRef, (snapshot) => {
        let data = snapshot.val();
  
        setNoteItem(data)
      });
    }
    catch (err) {
      console.log(err)
    }
  }
 
 
console.log('bookitem',bookItem)
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard items={item} otherItem={otherItem} />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="notes" element={<BooksAndNotes data={NoteItem}/>} />
        <Route path="questionpaper" element={<Questionpaper items={item} />} />
        <Route path="/books" element={<BooksAndNotes data={bookItem}/>} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </div>
  )
};

export default App;
