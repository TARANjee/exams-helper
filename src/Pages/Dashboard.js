import { Container, Grid, IconButton, InputAdornment, Skeleton, TextField } from '@mui/material';
import React from 'react';
import CustomCard from '../Components/CustomCard';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import '../index.css'

const Dashboard = () => {
    return (
        <div>
            <Container>
                <div className='Heading'>
                    <div>Free Question Papers &#38; Study Material</div>
                    <div className='college'>of SGRRU</div>
                </div>
                <div className='searchBar'>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Search any study material"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchRoundedIcon color='primary' />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    ></TextField>

                </div>
               
                {/* cards */}
                <Grid className='CardContainer' container rowSpacing={1} >
                    <Grid item xs={6}>
                        <CustomCard title='School of Computer Application &#38; IT' image='img/it.jpg' />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomCard title='School Of Pharmaceutical Sciences' image='img/pharmeceutical.jpg' />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomCard title='School of Management &#38; Commerce Studies' image='img/management.jpg' />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomCard title='School of Basic &#38; Applied Sciences &#38; Health Sciences' image='img/science.webp' />
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
};

export default Dashboard;
