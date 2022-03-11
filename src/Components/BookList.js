import { Button, Collapse, ListItemButton, List } from '@mui/material'
import React, { useState } from 'react'

const BookList = ({ title, item,listIndex,i }) => {
  
    const [show, setShow] = useState(false)
    return (
        <>
            <Button onClick={() => setShow(!show)}>{title}</Button>
            <Collapse orientation='vertical' in={show} >
                <List style={{ display: 'flex', flexDirection: 'column', width: '100%' }} component="div" >
                    {item.map((data,j) => (
                            <ListItemButton key={j} onClick={()=>listIndex(i,j)} style={{ width: '100%' }} className='center' component="div">{data.title}</ListItemButton>
                       ))}
                </List>
            </Collapse>
        </>
    )
}

export default BookList