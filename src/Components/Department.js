import { Button, Grid } from '@mui/material'
import GridCard from './GridCard'
import React, { useState } from 'react'
import '../index.css'
import { ref as sRef, getDownloadURL } from "firebase/storage";
import { storage } from '../utils/firebase';
import useDownloader from 'react-use-downloader';

const Department = (props) => {
   
const [data, setData] = useState(props.data);

const { download } = useDownloader();
let itemList = []
console.log('Department', data)
const downloadFiles = async (filename) => {
    const QPRef = sRef(storage, filename);
    await getDownloadURL(QPRef)
        .then((url) => {
            download(url, filename)
        })
}

const cardClicked = (response) => {
    console.log("card clicked", response);

    if (data[response].data) {
        setData(data[response].data);
    }

    if (data[response].file) {
        console.log("get exam data and route to page");
        downloadFiles(data[response].file)
    }

};

data.forEach((item, index) => {

    itemList.push(
        <GridCard key={item.title} title={item.title} image={item.image} eventCalled={cardClicked} data={index} />
    )

})





return (
    <div>
        <div className='deptTitle'> {data[0].MainTitle}</div>
        {/* <Button onClick={() => setData(props.data)}>Department</Button>/
        <Button onClick={() => props.data.data}>Courses</Button>/ */}
        <Grid container className="ItemList"  columnGap={4} rowGap={2}>
            {itemList}
        </Grid>
    </div >
)
}

export default Department