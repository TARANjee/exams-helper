import { Button, IconButton, Box, Modal, TextField, Avatar, InputAdornment } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

const UploadModal = ({ open, handleClose }) => {
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
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <h1 className='mg'>Profile</h1>
                <Avatar className='mg' alt="Remy Sharp" src="" sx={{ width: 150, height: 150 }} />

                <TextField fullWidth className='mg' id="standard-basic" label="Username" variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                <IconButton>
                                    <CheckIcon />
                                </IconButton>

                            </InputAdornment>
                        )
                    }}
                />

                <TextField fullWidth className='mg' type='file' id="standard-basic" variant="standard" />
            </Box>
        </Modal >
    )
};

export default UploadModal;
