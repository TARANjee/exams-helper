import { Button, IconButton, Box, Modal, TextField, Avatar, InputAdornment } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { Link } from 'react-router-dom';

const SignUpModal = ({ open, handleClose }) => {
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
                <h1 className='mg'>Sign In</h1>
               
                <div className='Email'>
                    <TextField fullWidth variant='outlined' label='Email Address' type='email'/>
                </div>
                
                <button className='CustomBtn pBlue mg'>Sign In</button>

                <div >Already have an account? <Link to=''>Signup</Link> </div>

            </Box>
        </Modal >
    )
};

export default SignUpModal;
