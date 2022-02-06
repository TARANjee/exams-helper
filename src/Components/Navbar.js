import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AppBar, Container, Menu, MenuItem, Button } from '@mui/material';
import './navbar.css'
import UploadIcon from '@mui/icons-material/Upload';
import UploadModal from './Modal/UploadModal';
import ProfileModal from './Modal/ProfileModal';
import SignUpModal from './Modal/SignUpModal';
import SignInModal from './Modal/SignInModal';
const Navbar = () => {
    const SignIn = Boolean(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [visible, setVisible] = useState(false);
    const [open, setopen] = useState(false);
    const handleopen = () => setopen(true);
    const handleClose = () => {
        setVisible(false)
        setopen(false);
        setAnchorEl(null)
    }
    const handleMenu = (e) => {
        setVisible(true)
        setAnchorEl(e.currentTarget);

    }
    const handleMenuClose = () => {
        setVisible(false)
        setAnchorEl(null);
    }


    return (
        <AppBar position="sticky">
            <Container>
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

                        {/* Upload Button */}

                        {/* <li>
                            <Button onClick={handleopen} color='success' variant="contained" startIcon={<UploadIcon />}>Upload</Button>
                        </li> */}

                        {/* Avatar Start */}

                        {/* <Button onClick={handleMenu} className='avatar'>
                            <Avatar alt="Remy Sharp" src="" />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleopen}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu> */}

                        {/* Avatar Start */}
                        <li>
                            <button onClick={handleopen} className={SignIn ? 'CustomBtn dark' : ''}>Sign In</button>
                        </li>
                        <li>
                            <button  onClick={handleopen} className={SignIn ? 'CustomBtn light' : ''}>Sign Up</button>
                        </li>
                    </div>
                </nav>

                {/* Already Authenticated */}
                {/* {!visible && <UploadModal open={open} handleClose={handleClose} />}
                {visible && <ProfileModal open={open} handleClose={handleClose} />} */}

                {/* Not Authenticated yet */}
                <SignUpModal open={open} handleClose={handleClose} />
                {/* <SignInModal open={open} handleClose={handleClose} /> */}
               




            </Container>
        </AppBar>
    )
};

export default Navbar
    ;
