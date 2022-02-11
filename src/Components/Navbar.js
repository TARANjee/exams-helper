import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AppBar, Container, Menu, MenuItem, Button, Chip } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import './navbar.css'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { logout } from '../utils/FirebaseMethods';
import EmailVerification from './Modal/EmailVerificationModal';
import UploadModal from './Modal/UploadModal';
import ProfileModal from './Modal/ProfileModal';
import SignUpModal from './Modal/SignUpModal';
import SignInModal from './Modal/SignInModal';
import { createTheme } from '@mui/material/styles';
const Navbar = () => {

    const [activeModal, setActiveModal] = useState('');
    const [autheticated, setautheticated] = useState(false);
    const SignIn = Boolean(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [data, setData] = useState('')

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser === null) {
                setautheticated(false);
                return;
            }
            setActiveModal('')
            if (currentUser.emailVerified === false) {
                setActiveModal('verification')
            }
            else {
                setActiveModal('')
            }
            if (currentUser) {
                setautheticated(true)
                setData(currentUser.providerData[0])
            }
            if (currentUser.email === 'taranjeets120@gmail.com') {
                setUploadBtn(true)
            }

        })
    }, []);


    return (
        <AppBar position="sticky" style={{
            backgroundColor: "#5c5c5c",
            width: '100%',
            fontSize: "15px"
        }}>
            <Container >
                <nav >
                    <div className='Logo'>
                        <Link to='/' className='link'>
                            <img src='./img/logo.png' alt='hello' width='50px' loading="lazy" />
                            <div style={{ marginLeft: '10px', fontSize: '20px' }}>Exam Helper</div>
                        </Link>
                    </div>
                    <div className='Items'>
                        <li>
                            <Link to='/' className='link'>Home</Link>
                        </li>
                        <li>
                            <Link to='/Questionpaper' className='QPaper link'>Question Paper</Link>
                        </li>

                        <li>
                            <Link to='/notes' className='link'>Notes</Link>
                        </li>
                        <li>
                            <Link to='/about' className='link'>About</Link>
                        </li>
                        <li>
                            <Link to='/contact' className='link'>Contact</Link>
                        </li>
                    </div>



                    <div>

                        {autheticated ? (
                            <div style={{ display: 'flex' }}>
                                {/* Upload Button */}
                                {uploadBtn ? (
                                    <li>
                                        <Button style={{ borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} onClick={() => setActiveModal('upload')} variant="contained" startIcon={<UploadIcon />}>Upload</Button>
                                    </li>
                                ) : ''}
                                {/* Avatar Start */}
                                <Button onClick={handleMenu} className='avatar'>
                                    <Avatar alt={data.displayName} src={data.photoURL} />
                                </Button>

                            </div>


                        ) : (
                            <div style={{ display: 'flex' }}>
                                <li >
                                    <Button style={{width:'100px', borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} onClick={() => setActiveModal('sign in')} variant="contained">Sign In</Button>
                                </li>
                                <li>
                                    <Button style={{width:'100px', borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} onClick={() => setActiveModal('sign up')} variant="contained" >Sign Up</Button>

                                </li>
                            </div>
                        )}
                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => { setActiveModal('profile'); handleMenuClose() }}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                        <MenuItem onClick={() => { logout(); handleMenuClose() }}>Logout</MenuItem>
                    </Menu>

                </nav >

                {/* Already Authenticated */}
                <UploadModal open={activeModal === 'upload' ? true : false} setActiveModal={setActiveModal} />
                <ProfileModal data={data} open={activeModal === 'profile' ? true : false} setActiveModal={setActiveModal} />

                {/* Not Authenticated yet */}
                <SignUpModal activeModal={activeModal} open={activeModal === 'sign up' ? true : false} setActiveModal={setActiveModal} />
                <SignInModal activeModal={activeModal} open={activeModal === 'sign in' ? true : false} setActiveModal={setActiveModal} />


                <EmailVerification open={activeModal === 'verification' ? true : false} setActiveModal={setActiveModal} />



            </Container >
        </AppBar >
    )
};

export default Navbar
    ;
