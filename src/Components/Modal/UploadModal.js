import { Button,Box, FormControl, FormControlLabel, FormLabel, Input, Modal, Radio, RadioGroup, TextField } from '@mui/material';

import React from 'react';

const UploadModal = ({open,handleClose}) => {
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
                <h1 className='mg'>Upload File</h1>
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
                    <TextField fullWidth className='mg' style={{marginBottom:'15px'}}  label="FileName"  id="standard-basic" variant="standard" />

                    <TextField fullWidth className='mg'  style={{marginBottom:'15px'}} accept='/*' type='file' id="standard-basic" variant="standard" />
                    <Button className='mg' variant="contained">Upload</Button>
                </FormControl>
            </Box>
        </Modal>
    )
};

export default UploadModal;
