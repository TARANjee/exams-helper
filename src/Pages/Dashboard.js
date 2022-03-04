import { Container, Grid, IconButton, Skeleton, TextField, useMediaQuery } from '@mui/material';
import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import '../index.css'
import Department from '../Components/Department';
import IconCard from '../Components/IconCard';

const Dashboard = ({ items,otherItem }) => {
    // console.log("DASHBOARD", items)

console.log("otherItem",otherItem)
    return (
        <div className='content'>
            <Container>
                <div className='Heading'>
                    <div>Free Question Papers &#38; Study Material</div>
                    {/* <div className='college'>of SGRRU</div> */}
                </div>
                <div className='searchBar'>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Search any study material"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (

                                <IconButton>
                                    <SearchRoundedIcon color='primary' />
                                </IconButton>

                            )
                        }}
                    ></TextField>

                </div>
               
                {items && Object.keys(items).length === 0 ? (
                    <Container>
                        <div  className='deptSkel'><Skeleton variant="rectangular"  height={40} width={200} /></div>
                        <Grid style={{marginBottom:'10rem'}} container columnGap={4} rowGap={2}>
                            {Array.from(new Array(6)).map(() => (
                                <div>
                                    <Skeleton variant="rectangular" width={345} height={200} />
                                    <Skeleton style={{marginTop:'1rem', display: 'flex', justifyContent: 'center' }}  variant="h6" component="div" />
                                </div>
                            ))}
                        </Grid>
                    </Container>
                ) : <Department data={items} />}
             </Container>
            <hr style={{ marginBottom: '5rem' }}></hr>
            <Container>
                {/* Icon Card */}
                {otherItem && Object.keys(otherItem).length === 0 ? (
                    <Container >
                        <Grid style={{marginBottom:'1rem',marginTop:'5rem'}} container columnGap={4} rowGap={2}>
                            {Array.from(new Array(5)).map(() => (
                                <div>
                                    <Skeleton variant="circular" width={200} height={200} />
                                    <Skeleton style={{marginTop:'1rem', display: 'flex', justifyContent: 'center' }}  variant="h6" component="div" />
                                </div>
                            ))}
                        </Grid>
                    </Container>
                ) : <IconCard otherItem={otherItem}/>}
            </Container>


        </div>
    )
};

export default Dashboard;
