import { Button, Box, FormControl, FormControlLabel, IconButton, FormLabel, Alert, Modal, Radio, RadioGroup, TextField, Avatar } from '@mui/material';
import '../navbar.css';
import React, { useState, useEffect } from 'react';
import { showFiles } from '../../utils/FirebaseMethods'
import { logout } from '../../utils/FirebaseMethods'
import { register } from '../../utils/FirebaseMethods';
import CloseIcon from '@mui/icons-material/Close';
import { login } from '../../utils/FirebaseMethods';

const UploadModal = ({ activeModal, data, open, setActiveModal }) => {
    console.log("DATA", data)
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
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

    const handleSignUp = async (e) => {
        e.preventDefault();

        setErrorMessage('')
        if (fname === '' || lname === '') {
            setErrorMessage('Invalid Field')

            return;
        }
        if (email === '') {
            setErrorMessage('Empty Field')

            return;
        }
        if (password === '' || password.length < 6) {
            setErrorMessage('Invalid Field Password (atleast 6 characters)')

            return;
        }


        const msg = await register(email, password, fname, lname)
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
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    };
    const handleClick = (e) => {
        console.log('Helli')
        showFiles();
        if (e.key === 'Enter') {
        }

    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSignUp(e)
        }
    }
    return (
        <Modal
            open={open}
            onClose={() => setActiveModal('')}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {activeModal === 'upload' ? (
                <Box sx={style} >
                    <h1 className='mgb'>Upload File</h1>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Select File Folder</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Notes"
                            name="radio-buttons-group"

                        >
                            <FormControlLabel value="Notes" control={<Radio />} label="Notes" />
                            <FormControlLabel value="QuestionPaper" control={<Radio />} label="Question Paper" />
                            {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                        </RadioGroup>
                        <TextField fullWidth className='mgb' style={{ marginBottom: '15px' }} label="FileName" id="standard-basic" variant="standard" />

                        <TextField fullWidth className='mgb' style={{ marginBottom: '15px' }} accept='/*' type='file' id="standard-basic" variant="standard" />
                        <Button onClick={handleClick} style={{ borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} className='mgb btnText' variant="contained">Upload</Button>
                    </FormControl>
                </Box>
            ) : activeModal === 'profile' && data && Object.keys(data).length !== 0 ? (
                <Box sx={style} >
                    <h1 className='mgb'>Profile</h1>
                    <Avatar style={{ textAlign: 'center' }} className='mgb' alt={data.displayName} src={data.photoURL} sx={{ width: 150, height: 150 }} />
                    <div>
                        <div className='mgb'>Name :{data.displayName}</div>
                        <div className='mgb'>Email :{data.email}</div>
                    </div>
                    <Button style={{ borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} className=' mgb btnText' variant='container' onClick={() => { logout(); setActiveModal('') }}>Logout</Button>
                </Box>
            ) : activeModal === 'sign up' ? (
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
                        <TextField required onKeyDown={(e) => handleEnter(e)} sx={{ marginRight: '10px', marginTop: '10px' }} helperText={errorMessage === 'Invalid Field' ? errorMessage : ''} type='firstName' variant='outlined' label='First Name' value={fname} onChange={(e) => setFname(e.target.value)} />
                        <TextField required onKeyDown={(e) => handleEnter(e)} sx={{ marginLeft: '10px', marginTop: '10px' }} helperText={errorMessage === 'Invalid Field' ? errorMessage : ''} type='lastName' variant='outlined' label='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} />
                    </div>
                    <div className='form'>
                        <TextField required onKeyDown={(e) => handleEnter(e)} sx={{ width: '100%', marginBottom: '20px' }} helperText={errorMessage === 'Empty Field' || errorMessage === 'Invalid Email' || errorMessage === 'Email already in use' ? errorMessage : ''} variant='outlined' label='Email Address' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField required onKeyDown={(e) => handleEnter(e)} sx={{ width: '100%' }} variant='outlined' helperText={errorMessage === 'Invalid Field Password (atleast 6 characters)' ? errorMessage : ''} label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>


                    <Button style={{ borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} variant='container' type='submit' onClick={handleSignUp} className='mgb btnText'>Sign Up</Button>

                    <div >Already have an account? <Button style={{ textTransform: 'none' }} onClick={() => setActiveModal('sign in')}>Sign in</Button> </div>
                    <Modal open={activeModal === 'sign in' ? true : false} setActiveModal={setActiveModal} />
                </Box>
            ) : activeModal === 'sign in' ? (
                <Box sx={style} >
                    <h1 className='mgb'>Sign in</h1>


                    <div className='form'>
                        <TextField required onKeyDown={(e) => handleEnter(e)} sx={{ width: '100%', marginBottom: '20px' }} helperText={errorMessage === 'Empty Field' || errorMessage === 'Invalid Email' || errorMessage === 'Email already in use' ? errorMessage : ''} variant='outlined' label='Email Address' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField required onKeyDown={(e) => handleEnter(e)} sx={{ width: '100%' }} variant='outlined' helperText={errorMessage === 'Invalid Field Password (atleast 6 characters)' ? errorMessage : ''} label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>


                    <Button style={{ borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} variant='container' type='submit' onClick={handleSignIn} className=' mgb btnText'>Sign In</Button>

                    <div>Don&lsquo;t have an account? <Button style={{ textTransform: 'none' }} onClick={() => setActiveModal('sign up')}>Sign Up</Button> </div>

                    <Modal open={activeModal === 'sign up' ? true : false} setActiveModal={setActiveModal} />
                </Box>
            ) :
                (<Box sx={style} >
                    <h1 className='mgb'>Something Wrong</h1>
                </Box>
                )}
        </Modal>
    )
};

export default UploadModal;
