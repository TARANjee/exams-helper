import { Alert, Box, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../CallFunction';

const SignUpModal = ({ open, handleClose }) => {

    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(false)
        setErrorMessage('')
        if (fname === '' || lname === '') {
            setErrorMessage('Invalid Field')
            setError(true)
        }
        if (email === '' || emailValid(email)) {
            setErrorMessage('Invalid Field Email')
            setError(true)
        }
        if (password === '' || password.length <= 6) {
            setErrorMessage('Invalid Field Password (atleast 6 characters)')
            setError(true)
        }
       
        //    await register(email, password, fname, lname)

        //     setFname('')
        //     setLname('')
        //     setEmail('')
        //     setPassword('')
        //     console.log('hello end')
    }
    const emailValid = (email) => {
        var em=false;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log("emailtest",email)
        em=email.value.match(mailformat);
            console.log("email",em)
        if (em === true)
            return true;
        else {
            return false;
        }
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
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                {/* <div className='error'>{error}</div> */}
                <h1 className='mg'>Sign Up</h1>
                <div className='text'>Get setup in 30 seconds</div>

                <div className='names form'>
                    <TextField required sx={{ marginRight: '10px', marginTop: '10px' }} error={error ? error : ""} helperText={errorMessage === 'Invalid Field' ? errorMessage : ''} type='firstName' variant='outlined' label='First Name' value={fname} onChange={(e) => setFname(e.target.value)} />
                    <TextField required sx={{ marginLeft: '10px', marginTop: '10px' }} error={error ? error : ""} helperText={errorMessage === 'Invalid Field' ? errorMessage : ''} type='lastName' variant='outlined' label='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} />
                </div>
                <div className='form'>
                    <TextField required sx={{ width: '100%', marginBottom: '20px' }} error={error ? error : ""} helperText={errorMessage === 'Invalid Field Email' ? errorMessage : ''} variant='outlined' label='Email Address' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField required sx={{ width: '100%' }} variant='outlined' error={error ? error : ""} helperText={errorMessage === 'Invalid Field Password (atleast 6 characters)' ? errorMessage : ''} label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>


                <button type='submit' onClick={handleSignUp} className='CustomBtn pBlue mg'>Sign Up</button>

                <div >Already have an account? <Link to=''>Signin</Link> </div>

            </Box>
        </Modal >
    )
};

export default SignUpModal;
