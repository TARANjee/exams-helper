import { Container, Grid, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import GridCard from './GridCard'
import { useNavigate } from 'react-router-dom';
import Syllabus from './Syllabus';
import Department from './Department';

const IconCard = ({ otherItem }) => {
    let navigate = useNavigate();
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState(otherItem);
    console.log("ixoncard", data)
    // const { download } = useDownloader();
    let itemList = []
    const cardClicked = (response) => {
        console.log("card clicked", response);

        if (response === 0) {
            console.log('past paper')

            navigate('/questionpaper')
        }
        if (response === 1) {
            console.log('E book')
            navigate('/books')
        }
        if (response === 2) {
            console.log('notes')
            navigate('/notes')
        }
        if (response === 4) {
            console.log('syallbus')
            setVisible(true)
        }

    };
    data.forEach((item, index) => {

        itemList.push(
            <GridCard key={item.title} title={item.title} image={item.image} eventCalled={cardClicked} data={index} />
        )

    })


    return (
        <>
            {
                !visible ? (
                    <Grid className='center' rowSpacing={2} columnGap={3} >
                        {itemList}
                    </Grid >
                ) : (
                    <Syllabus  data={otherItem[4].data} />
                )
            }
        </>
    )
        
        }

export default IconCard