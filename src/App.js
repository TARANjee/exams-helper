import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Navbar from './Components/Navbar';
import Questionpaper from './Pages/Questionpaper';
import Notes from './Pages/Notes';
import Footer from './Components/Footer';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Terms from './Pages/Terms';
import Courses from './Pages/Courses';
import NoPage from './Pages/NoPage';


const App = () => {
    let items = [{
        title: "Computer Application & IT",
        image: "img/it.jpg",
        MainTitle: 'Department',
        data: [{
            MainTitle: 'Courses',
            title: "BCA",
            image: "https://sparc.org.in/wp-content/uploads/2018/12/BCA-course-in-gtb-nagar-sparc-academy.jpg",
            data: [{
                MainTitle: 'Courses',
                title: "Sem1",
                image: "https://1.bp.blogspot.com/-N8C0I6rxZSs/Xu2Q1FSa8kI/AAAAAAAAHfo/T_kmDxf0wYsBoINvzIj9Xstw2Af7tGxbgCLcBGAsYHQ/s1600/1st_semester.gif",
                data:[{
                    MainTitle: 'QuestionPaper',
                    title: "2019",
                    image: "https://sparc.org.in/wp-content/uploads/2018/12/BCA-course-in-gtb-nagar-sparc-academy.jpg",
                    file:'Dashboard Design.png'
                },{
                    title: "2018",
                    image: "https://sparc.org.in/wp-content/uploads/2018/12/BCA-course-in-gtb-nagar-sparc-academy.jpg",
                    file:'https://firebasestorage.googleapis.com/v0/b/exams-helper.appspot.com/o/Dashboard%20Design.png?alt=media&token=4faf8f4d-d4fc-4043-ae77-0cb68e124a79'
                
                }]
            }, {
                title: "Sem2",
                image: "https://4.bp.blogspot.com/-exOErh5WjjI/V2dFVuhj7wI/AAAAAAAAE0g/CwuRJ2bSgAw9l-Z6JwIZrXC9Fa204uuBgCLcB/s1600/2nd_semester.gif",
            }, {
                title: "Sem3",
                image: "https://infoshakil.files.wordpress.com/2016/06/3rd_semester1.gif",
            },
            {
                title: "Sem4",
                image: "https://1.bp.blogspot.com/-YyKfmwvLI6M/WIecOfZmNPI/AAAAAAAARkw/LF5npyRGR-07ID8DMHMfLzry-DvcUBAFgCK4B/s400/4th_semester.gif",
            },
            {
                title: "Sem5",
                image: "http://solveout.in/wp-content/uploads/2016/08/Logomakr_1drEhI.png",
            },
            {
                title: "Sem6",
                image: "https://solveout.in/wp-content/uploads/2016/08/Logomakr_6qLhVU.png",
            }]
        }, {
            title: "BSC IT",
            image: "https://qph.fs.quoracdn.net/main-qimg-0802d9401b1b80d8e560d5b2643fbe7f",
            data: [{
                MainTitle: 'Courses',
                title: "Sem1",
                image: "http://educlash.com/wp-content/uploads/2016/04/sem1-300x155.jpg",
            },{
                title: "Sem2",
                image: "https://4.bp.blogspot.com/-exOErh5WjjI/V2dFVuhj7wI/AAAAAAAAE0g/CwuRJ2bSgAw9l-Z6JwIZrXC9Fa204uuBgCLcB/s1600/2nd_semester.gif",
            }, {
                title: "Sem3",
                image: "https://infoshakil.files.wordpress.com/2016/06/3rd_semester1.gif",
            },
            {
                title: "Sem4",
                image: "https://1.bp.blogspot.com/-YyKfmwvLI6M/WIecOfZmNPI/AAAAAAAARkw/LF5npyRGR-07ID8DMHMfLzry-DvcUBAFgCK4B/s400/4th_semester.gif",
            },
            {
                title: "Sem5",
                image: "http://solveout.in/wp-content/uploads/2016/08/Logomakr_1drEhI.png",
            },
            {
                title: "Sem6",
                image: "https://solveout.in/wp-content/uploads/2016/08/Logomakr_6qLhVU.png",
            }]
        }, {
            title: "BSC CS",
            image: "https://dashscholar.com/wp-content/uploads/2020/07/BSC-Computer-Science.jpg",
        }, {
            title: "MCA",
            image: "https://blog.mmumullana.org/wp-content/uploads/2018/07/Blog-Creative-MCA.jpg",
        }]
    }, {

        title: "Management & Commerce",
        image: "img/management.jpg",
        MainTitle: 'Department',
        data: [{
            MainTitle: 'Courses',
            title: "BBA",
            image: "img/it.jpg",
        }, {

            title: "MBA",
            image: "img/it.jpg",
        }]
    }, {
        title: "Pharmaceutical Sciences",
        image: "img/pharmeceutical.jpg",
        MainTitle: 'Department',
        data: [{
            MainTitle: 'Courses',
            title: "B PHARMA",
            image: "img/it.jpg",
        }, {

            title: "BSC IT2",
            image: "img/it.jpg",
        }]
    }, {
        title: "Basic & Applied Sciences ",
        image: "img/Bscience.jpg",
        MainTitle: 'Department',
        data: [{
            MainTitle: 'Courses',
            title: "BSC",
            image: "img/it.jpg",
        }, {

            title: "BSC",
            image: "img/it.jpg",
        }]
    }];
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard items={items} />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="notes" element={<Notes />} />
                <Route path="questionpaper" exact element={<Questionpaper items={items} />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />

                <Route path="*" element={<NoPage />} />
            </Routes>
            <Footer />
        </div>
    )
};

export default App;
