import { Container, List } from '@mui/material'
import React from 'react'
import BookList from '../Components/BookList'
import { ref as sRef, getDownloadURL } from "firebase/storage";
import { storage } from '../utils/firebase';
import useDownloader from 'react-use-downloader';
import '../index.css'
const Books = ({ data }) => {
  console.log('booooook', data)
  const itemList = []

  const { download } = useDownloader();

  const downloadFiles = async (filename) => {
    const QPRef = sRef(storage,`books/${filename}`);
    await getDownloadURL(QPRef)
      .then((url) => {
        download(url, filename)
      })
  }

  const listIndex = (i, j) => {
    console.log(i, j)
    if (data[i].data[j].file) {
      downloadFiles(data[i].data[j].file)
    }

  }
  data.forEach((item, index) => {

    itemList.push(
      <BookList key={item.title} title={item.title} item={item.data} listIndex={listIndex} i={index} />
    )

  })

  return (
    <Container>
      {data && Object.keys(data).length === 0 ? <div>Loading</div> : (
        <List>
          {itemList}
        </List>
      )
      }
    </Container >
  )
}

export default Books