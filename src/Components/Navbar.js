import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AppBar, Container, Menu, MenuItem, Button, useMediaQuery, IconButton,  Collapse } from '@mui/material';
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
import MenuIcon from '@mui/icons-material/Menu';
import {List} from './MenuList'
const Navbar = () => {
    const matches = useMediaQuery('(min-width:850px)', { 'noSsr': true });
    const [show, setShow] = useState(false)
    const [activeModal, setActiveModal] = useState('');
    const [autheticated, setautheticated] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [data, setData] = useState('')

    const menuItems = () => {
        return (
            <div className={matches ? 'Items' : 'col'}>
               {List()}
                {autheticated ? (
                        <div style={matches?{ display: 'flex', alignItems: 'center' }:{display: 'flex',flexDirection:'column',width:'100%'}}>
                            {/* Upload Button */}
                            {uploadBtn ? (
                                <li>
                                    <Button style={{ textTransform:'none',borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: '15px',color:"#2F4F4F" }} onClick={() => setActiveModal('upload')} variant="contained" startIcon={<UploadIcon />}>Upload</Button>
                                </li>
                            ) : ''}
                            {/* Avatar Start */}
                            <Button onClick={handleMenu} className='avatar'>
                                <Avatar alt={data.displayName} src={data.photoURL} />
                            </Button>

                        </div>


                    ) : (
                        <div style={matches?{ display: 'flex', alignItems: 'center' }:{display: 'flex',flexDirection:'column',width:'100%'}}>
                            <li >
                                <Button style={{ textTransform:'none', width: `${matches ? '100px' : '100%'}`,marginTop: `${matches ? '0px' : '10px'}`, borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: '15px',color:"#2F4F4F" }} onClick={() => setActiveModal('sign in')} variant="contained">Sign In</Button>
                            </li>
                            <li>
                                <Button style={{  textTransform:'none',width: `${matches ? '100px' : '100%'}`,marginTop: `${matches ? '0px' : '20px'}`,marginBottom: `${matches ? '0px' : '20px'}`, borderRadius: 35, backgroundColor: "#9e9e9e",  fontSize: '15px',color:"#2F4F4F" }} onClick={() => setActiveModal('sign up')} variant="contained" >Sign Up</Button>
                            </li>

                        </div>
                    )}
            </div>
        )
    }
    const OpenMenu = () => {
        setShow(!show)
    }
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
        <AppBar position="sticky" style={{ backgroundColor: "#5c5c5c", width: '100%', fontSize: "15px" }}>
            <Container >
                <nav >
                    <div className='Logo'>
                        <Link to='/' className='link'>
                            <img src='./img/logo.png' alt='hello' width={matches ? '50px' : '40px'} loading="lazy" />
                            <div style={{ marginLeft: '10px', fontSize: ` ${matches ? '20px' : '15px'} ` }}>Exam Helper</div>
                        </Link>
                    </div>

                    {matches ? menuItems() : ""}

                    
                    {matches ? '' :
                        (
                            <li>
                                <IconButton onClick={OpenMenu}>
                                    <MenuIcon color='primary' />
                                </IconButton>
                            </li>
                        )
                    }

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
                <Collapse orientation='vertical' in={show} >
                    {matches?'':menuItems()}
                </Collapse>
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

export default Navbar;
