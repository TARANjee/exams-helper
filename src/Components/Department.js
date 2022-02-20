import { Container, Grid, useMediaQuery } from '@mui/material'
import GridCard from './GridCard'
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import '../index.css'
import { DownloadFiles } from '../utils/FirebaseMethods';

const Department = (props) => {
    const matches = useMediaQuery('(min-width:850px)', { 'noSsr': true });

    const [data, setData] = useState(props.data);
    let itemList = []

    const cardClicked = (response) => {
        console.log("card clicked", response.data);
        if (response.data !== undefined) {
            setData(response.data);
        }

        if (response.file) {
            console.log("get exam data and route to page");
            DownloadFiles(response.file)
        }

    };

    data.forEach((item, index) => {

        itemList.push(
            <GridCard title={item.title} image={item.image} eventCalled={cardClicked} data={data[index]} />
        )

    })

    // useEffect(() => {
    //     console.log("setting data");
    //     console.log(data);
    //     data.forEach((item, index) => {

    //         itemList.push(
    //             <GridCard title={item.title} image={item.image} eventCalled={cardClicked} data={data[index]} />
    //         )

    //     })

    //   return () => {

    //   }
    // }, [data])


    console.log('TEST', data[0].MainTitle)

    return (
        <div>
            <div className='deptTitle'> {data[0].MainTitle}</div>
            <Grid container style={{ marginBottom: '5rem',display: 'flex', justifyContent: 'center', alignItems: 'center' }} columnGap={4} rowGap={2}>
                {itemList}
            </Grid>
        </div >
    )
}

export default Department