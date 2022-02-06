import React from 'react';
import Dashboard from './Pages/Dashboard';
import About from './Pages/About';
import Contact from './Pages/Contact';
import {
    Routes,
    Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Questionpaper from './Pages/Questionpaper';
import Notes from './Pages/Notes';
const App = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route exact path="/about" element={<About />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/notes" element={<Notes />} />
                <Route exact path="/questionpaper" element={<Questionpaper />} />
                <Route exact path="/" element={<Dashboard />} />
            </Routes>
        </div>
    )
};

export default App;
