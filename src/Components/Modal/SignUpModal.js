import { Alert, Box, Button, IconButton, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../navbar.css';
import { register } from '../../utils/FirebaseMethods';
import CloseIcon from '@mui/icons-material/Close';

const SignUpModal = ({ activeModal, open, setActiveModal }) => {

    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage('')
        setError(false)
    }, []);


    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(false)
        setErrorMessage('')
        if (fname === '' || lname === '') {
            setErrorMessage('Invalid Field')
            setError(true)
            return;
        }

        if (password === '' || password.length < 6) {
            setErrorMessage('Invalid Field Password (atleast 6 characters)')
            setError(true)
            return;
        }
        if (email === '') {
            setErrorMessage('Empty Field')
            setError(true)
            return;
        }

        const msg = await register(email, password, fname, lname)
        console.log(msg)
        if (msg === 'Firebase: Error (auth/invalid-email).') {
            setErrorMessage('Invalid Email')
            setError(true)
            return;
        }
        if (msg === 'Firebase: Error (auth/email-already-in-use).') {
            setErrorMessage('Email already in use')
            setError(true)
            return;
        }
        if (msg === 'success') {
            setErrorMessage('success')
        }
        setFname('')
        setLname('')
        setEmail('')
        setPassword('')
        console.log('hello end')
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    };
    return (
        <Modal
            open={open}
            onClose={() => setActiveModal('')}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <h1 className='mgb'>Sign Up</h1>
                <Alert action={errorMessage === 'success' ?
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setErrorMessage(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton> : ''
                } variant="filled" icon={false} severity={errorMessage === 'success' ? 'success' : 'info'}>{errorMessage === 'success' ? 'User Created Successfully' : 'Get setup in 30 seconds'}</Alert>


                <div className='names form'>
                    <TextField required sx={{ marginRight: '10px', marginTop: '10px' }} helperText={errorMessage === 'Invalid Field' ? errorMessage : ''} type='firstName' variant='outlined' label='First Name' value={fname} onChange={(e) => setFname(e.target.value)} />
                    <TextField required sx={{ marginLeft: '10px', marginTop: '10px' }} helperText={errorMessage === 'Invalid Field' ? errorMessage : ''} type='lastName' variant='outlined' label='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} />
                </div>
                <div className='form'>
                    <TextField required sx={{ width: '100%', marginBottom: '20px' }} helperText={errorMessage === 'Empty Field' || errorMessage === 'Invalid Email' || errorMessage === 'Email already in use' ? errorMessage : ''} variant='outlined' label='Email Address' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField required sx={{ width: '100%' }} variant='outlined' helperText={errorMessage === 'Invalid Field Password (atleast 6 characters)' ? errorMessage : ''} label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>


                <Button  style={{ borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} variant='container'type='submit' onClick={handleSignUp} className='mgb'>Sign Up</Button>

                <div >Already have an account? <Button style={{ textTransform: 'none' }} onClick={() => setActiveModal('sign in')}>Sign in</Button> </div>
                <SignUpModal open={activeModal === 'sign in' ? true : false} setActiveModal={setActiveModal} />
            </Box>
        </Modal >
    )
};

export default SignUpModal;
