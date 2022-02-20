import { Box, Button, Modal, TextField } from '@mui/material';
import React from 'react';
import { EmailVerify } from '../../utils/FirebaseMethods';
import '../navbar.css';

const EmailVerification = ({ open, setActiveModal }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        height:'200px',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius:10
    };

    const handleClick = (e) => {
        EmailVerify();
        if (e.key === 'Enter'){
            
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
                <h1 className='mgb'>Please Verify Your Email</h1>

                <div className='names'>
                    <TextField fullWidth variant='outlined' label='Email Address' type='email' onKeyDown={handleClick} />
                </div>

                <Button className='mgb btnText' style={{ borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} variant='container' onClick={() => handleClick} >Send</Button>

            </Box>
        </Modal >
    )
};

export default EmailVerification;
