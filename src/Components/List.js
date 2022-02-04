import React from 'react';
import { ref as sRef, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { auth, database, storage } from '../utils/firebase';
import useDownloader from 'react-use-downloader';
const List = ({ item }) => {
    const {
        size,
        elapsed,
        percentage,
        download,
        cancel,
        error,
        isInProgress,
    } = useDownloader();
    const downloadFiles = async (filename) => {
        const starsRef = sRef(storage, filename);
        await getDownloadURL(starsRef)
          .then((url) => {
            download(url, filename)
          })
      }
    return (
        <button onClick={downloadFiles(item)} style={{ display: 'flex', flexDirection: 'column', margin: '10px' }} >
            <a href='' >{item}</a>
        </button>
    )
};

export default List;
