import { Button, Box, FormControl, IconButton, FormLabel, Alert, Modal, TextField, Avatar, Select, MenuItem } from '@mui/material';
import './navbar.css';
import React, { useState, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { logout, register, login, facebook, google } from '../utils/FirebaseMethods'
import CloseIcon from '@mui/icons-material/Close';


const UploadModal = ({ activeModal, data, open, setActiveModal }) => {
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [radioValue, setRadioValue] = useState('')

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

    const MenuProps = {
        PaperProps: {
            style: {
                width: 300,

            },
        },
    };
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
    const handleUpload = (e) => {

        console.log("radioValue", radioValue);
        // showFiles();


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
                    {/* <FormControl fullWidth>
                        <FormLabel id="demo-radio-buttons-group-label">Select File Folder</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Notes"
                            name="radio-buttons-group"
                            onChange={(e) => setRadioValue(e.target.value)}
                        >

                            <FormControlLabel value="QuestionPaper" control={<Radio />} label="Question Paper" />
                            <FormControlLabel value="notes" control={<Radio />} label="Notes" />
                            <FormControlLabel value="book" control={<Radio />} label="Books" />
                           <FormControlLabel value="other" control={<Radio />} label="Other" /> 
                        </RadioGroup> 
                    </FormControl> */}
                    <FormControl fullWidth>
                        <FormLabel id="label">Department</FormLabel>
                        <Select labelId="label" id="select" value="10" MenuProps={MenuProps} className='marbot'  >
                            <MenuItem value="10">Computer Application and IT</MenuItem>
                            <MenuItem value="20">Commerce and Management</MenuItem>
                            <MenuItem value="20">Pharmaceutical Science</MenuItem>
                            <MenuItem value="20">Basic and Applied Science</MenuItem>
                        </Select>
                        <FormLabel id="label">Course</FormLabel>
                        <Select labelId="label" id="select1" value="30" MenuProps={MenuProps} className='marbot' >
                            <MenuItem value="bca">Bca</MenuItem>
                            <MenuItem value="bscIt">BSc It</MenuItem>
                            <MenuItem value="bscCs">BSc cs</MenuItem>
                            <MenuItem value="Mca">Mca</MenuItem>
                        </Select>
                        <FormLabel id="label">Semester</FormLabel>
                        <Select labelId="label" id="select1" value="1" MenuProps={MenuProps} className='marbot' >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField fullWidth className='mgb' style={{ marginBottom: '15px' }} label="FileName" id="standard-basic" variant="standard" />
                    <TextField fullWidth className='mgb' style={{ marginBottom: '15px' }} accept='/*' type='file' id="standard-basic" variant="standard" />
                    <Button onClick={handleUpload} style={{ borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} className='mgb btnText' variant="contained">Upload</Button>

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

                    <Button   variant="contained"  style={{textTransform: 'none',marginBottom:'5px',width:'100%'}}color="success"  startIcon={<GoogleIcon />}onClick={google}>Sign in with Google</Button>
                    <Button   variant="contained"  style={{textTransform: 'none',marginBottom:'10px',width:'100%'}} startIcon={<FacebookIcon />}onClick={facebook}>Sign in with Facebook</Button>

                    <div>Don&lsquo;t have an account? <Button style={{ textTransform: 'none' }} onClick={() => setActiveModal('sign up')}>Sign Up</Button> </div>
                    <hr style={{width:'100%'}}></hr>
                    <Button style={{ textTransform: 'none' }} onClick={() => setActiveModal('signin with email')}>Signin with Email</Button>

                    <Modal open={activeModal === 'signup' ? true : false} setActiveModal={setActiveModal} />
                
                    <Modal open={activeModal === 'signin with email' ? true : false} setActiveModal={setActiveModal} />
                

                </Box>
            ) : activeModal === 'signin with email' ? (
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
