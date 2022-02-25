import { Container, Grid, Skeleton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Department from '../Components/Department';

const Questionpaper = ({items}) => {
    
    return (
        <div>
            <Container> 
                {items && Object.keys(items).length === 0 ? (
                    <div >
                        <Skeleton className='deptTitle' variant="h1" width="20%" />
                        <Grid container columnGap={4} rowGap={2}>
                            {Array.from(new Array(6)).map(() => (
                                <div>
                                    <Skeleton variant="rectangular" width={345} height={200} />
                                    <Skeleton style={{marginTop:'1rem', display: 'flex', justifyContent: 'center' }}  variant="h6" component="div" />
                                </div>
                            ))}
                        </Grid>
                    </div>
                ) : <Department data={items} />}
            </Container>
        </div>
    )
};

export default Questionpaper;
