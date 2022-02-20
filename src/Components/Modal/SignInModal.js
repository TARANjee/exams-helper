import { Box,  Modal, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { login } from '../../utils/FirebaseMethods';
import '../navbar.css'
import SignUpModal from './SignUpModal';

const SignInModal = ({ activeModal, open, setActiveModal }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage('')
       
    }, []);


    const handleSignIn = async (e) => {
        e.preventDefault();
        
        setErrorMessage('')
        if (email === '') {
            setErrorMessage('Empty Field')
           
            return;
        }
        if (password === '' || password.length < 6) {
            setErrorMessage('Invalid Field Password (atleast 6 characters)')
           
            return;
        }
       

        const msg = await login(email, password)
        console.log(msg)
        if (msg === 'Firebase: Error (auth/invalid-email).') {
            setErrorMessage('Invalid Email')
           
            return;
        }
        if (msg === 'Firebase: Error (auth/email-already-in-use).') {
            setErrorMessage('Email already in use')
       
            return;
        }
        if (msg === 'success') {
            setErrorMessage('success')
        }
        setEmail('')
        setPassword('')

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    };
    const handleEnter = (e)=>{
        if(e.key==='Enter'){
            handleSignIn(e)
        }
    }
    return (
        <Modal
            open={open}
            onClose={() => setActiveModal('')}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <h1 className='mgb'>Sign in</h1>


                <div className='form'>
                    <TextField required onKeyDown={(e)=>handleEnter(e)} sx={{ width: '100%', marginBottom: '20px' }} helperText={errorMessage === 'Empty Field' || errorMessage === 'Invalid Email' || errorMessage === 'Email already in use' ? errorMessage : ''} variant='outlined' label='Email Address' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField required onKeyDown={(e)=>handleEnter(e)} sx={{ width: '100%' }} variant='outlined'  helperText={errorMessage === 'Invalid Field Password (atleast 6 characters)' ? errorMessage : ''} label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>


                <Button style={{ borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} variant='container' type='submit' onClick={handleSignIn} className=' mgb btnText'>Sign In</Button>

                <div>Don&lsquo;t have an account? <Button style={{textTransform:'none'}} onClick={()=>setActiveModal('sign up')}>Sign Up</Button> </div>
                
                <SignUpModal open={activeModal === 'sign up' ? true : false} setActiveModal={setActiveModal} />
            </Box>
        </Modal >
    )
};

export default SignInModal;
