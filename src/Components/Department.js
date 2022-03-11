import { Grid } from '@mui/material'
import GridCard from './GridCard'
import React, { useEffect,useState } from 'react'
import '../index.css'
import { ref as sRef, getDownloadURL } from "firebase/storage";
import { storage } from '../utils/firebase';
import useDownloader from 'react-use-downloader';

const Department = (props) => {
    console.log('DEP', window.location.pathname);

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
            if (window.location.pathname==='/')
                window.scrollTo(0, 350)
            else
                window.scrollTo(0, 0)
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

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])




    return (
        < >
            <div className='deptTitle'> {data[0].MainTitle}</div>
            {/* <Button onClick={() => setData(props.data)}>Department</Button>/
        <Button onClick={() => props.data.data}>Courses</Button>/ */}
            <Grid className='center' container columnGap={3} rowGap={2}>
                {itemList}
            </Grid>
        </ >
    )
}

export default Department