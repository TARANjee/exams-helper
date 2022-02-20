import { Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Department from '../Components/Department';

const Questionpaper = ({items}) => {
    
    return (
        <div>
            <Container>
                <Department data ={items} />
            </Container>
        </div>
    )
};

export default Questionpaper;
