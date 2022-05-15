import { Grid } from '@mui/material'
import GridCard from './GridCard'
import React, { useEffect, useState } from 'react'
import '../index.css'
import { ref as sRef, getDownloadURL } from "firebase/storage";
import { storage } from '../utils/firebase';
import useDownloader from 'react-use-downloader';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Department = (props) => {
 
    const auth = getAuth();
    const [data, setData] = useState(props.data);
    const { download } = useDownloader();

    let itemList = []
    
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
            if (window.location.pathname === '/')
                window.scrollTo(0, 350)
            else
                window.scrollTo(0, 0)
        }

        if (data[response].file) {
    
            onAuthStateChanged(auth, (user) => {
                if (user) {

                    downloadFiles(data[response].file)

                } else {
                    alert("Please signin ")

                }
            });

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