import { Container, Grid, IconButton, Skeleton, TextField, useMediaQuery } from '@mui/material';
import React from 'react';
import GridCard from '../Components/GridCard';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import '../index.css'
import Department from '../Components/Department';
const Dashboard = ({ items }) => {
    console.log("DASHBOARD", items)
    const matches = useMediaQuery('(min-width:850px)', { 'noSsr': true });

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
                    <div >
                        <Skeleton className='deptTitle' variant="h1" />
                        <Grid style={{marginBottom:'5rem'}} container columnGap={4} rowGap={2}>
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
            <hr style={{ marginBottom: '5rem' }}></hr>
            <Container>
                {/* Icon Card */}
                <Grid container rowSpacing={2} >
                    <Grid className='CardItem' item xs={matches ? 2.4 : 12}>
                        <GridCard title='Past Paper' image='img/paperIcon.png' />
                    </Grid>
                    <Grid className='CardItem' item xs={matches ? 2.4 : 12}>
                        <GridCard title='E-Book' image='img/bookIcon.png' />
                    </Grid>
                    <Grid className='CardItem' item xs={matches ? 2.4 : 12}>
                        <GridCard title='Notes' image='img/notesIcon.jpg' />
                    </Grid>
                    <Grid className='CardItem' item xs={matches ? 2.4 : 12}>
                        <GridCard title='Assignments' image='img/assignmentIcon.jpg' />
                    </Grid>
                    <Grid className='CardItem' item xs={matches ? 2.4 : 12}>
                        <GridCard title='Syllabus' image='img/syallabusIcon.png' />
                    </Grid>

                </Grid>
            </Container>


        </div>
    )
};

export default Dashboard;
