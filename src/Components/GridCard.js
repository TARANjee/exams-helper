import { ColorLensOutlined } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CustomCard = ({ title, image, eventCalled,data }) => {

  const cardClicked = () => {
    console.log("lolll",data);
    eventCalled(data);
  };

  return (
    <Card
      onClick={cardClicked}
      style={{
        backgroundColor: 'transparent',
        boxShadow: 'none'
      }}
      sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
        />
        <CardContent >
          <Typography style={{ display: 'flex', justifyContent: 'center' }} gutterBottom variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CustomCard