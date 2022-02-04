import React, { useEffect, useState } from 'react';
import { auth, database } from '../utils/firebase';
import { ref, onValue } from "firebase/database";

import { Avatar } from '@mui/material';
const Dashboard = ({user, logout }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [imgUrl, setImgUrl] = useState('');
 
    useEffect(() => {
   
        if (user != null) {
            const starCountRef = ref(database, 'users/' + user.uid);
            onValue(starCountRef, async (snapshot) => {
                
                const data = await snapshot.val();
                setUsername(data.username)
                setEmail(data.email)
                setImgUrl(data.profile_picture)
            });

        }
    }, [user]);

    return (

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px' }
        }>
            {user ? (
                <div>
                    <Avatar src={imgUrl} alt='' />
                    <h3>username:{username}</h3>
                    <h3>email:{email}</h3>

                    <div>
                        <button onClick={()=>logout()}>Logout</button>
                    </div>
                </div>) : ''}
        </div >
    )
};

export default Dashboard;
