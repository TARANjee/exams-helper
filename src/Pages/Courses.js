import { Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import GridCard from '../Components/GridCard'

const Courses = () => {
    const matches = useMediaQuery('(min-width:850px)', { 'noSsr': true });
    return (
        <div>
            <Grid container rowSpacing={2} >
                <Grid className='CardItem' item xs={matches ? 2.4 : 12}>
                    <Link to='BCA'> <GridCard title='BCA' image='../img/paperIcon.png' /></Link>
                </Grid>
                <Grid className='CardItem' item xs={matches ? 2.4 : 12}>
                    <GridCard title='BSc IT' image='../img/bookIcon.png' />
                </Grid>
                <Grid className='CardItem' item xs={matches ? 2.4 : 12}>
                    <GridCard title='BSc CS' image='../img/notesIcon.jpg' />
                </Grid>
                <Grid className='CardItem' item xs={matches ? 2.4 : 12}>
                    <GridCard title='MCA' image='../img/assignmentIcon.jpg' />
                </Grid>

            </Grid>
        </div>
    )
}

export default Courses