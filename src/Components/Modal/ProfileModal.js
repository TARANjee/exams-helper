import {  Box, Modal, Avatar, Button } from '@mui/material';

import React from 'react';
import '../navbar.css';
import {logout} from '../../utils/FirebaseMethods'
const UploadModal = ({ data, open, setActiveModal }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    };
    return (
        <Modal
            open={open}
            onClose={() => setActiveModal('')}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <h1 className='mgb'>Profile</h1>
                <Avatar style={{ textAlign: 'center' }} className='mgb' alt={data.displayName} src={data.photoURL} sx={{ width: 150, height: 150 }} />
                <div>
                    <div className='mgb'>Name :{data.displayName}</div>
                    <div className='mgb'>Email :{data.email}</div>
                </div>
                <Button style={{ borderRadius: 35, backgroundColor: "#9e9e9e", fontSize: "15px" }} className=' mgb' variant='container'  onClick={()=>{logout(); setActiveModal('')}}>Logout</Button>
            </Box>
        </Modal >
    )
};

export default UploadModal;
