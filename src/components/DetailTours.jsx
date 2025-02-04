import React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import MyImg from './../assets/photos/5ftsj0mn7lkw08ws40k4w4wss.jpg'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Description } from '@mui/icons-material'

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  }
}

function DetailTours() {
  return (
    <>
      <img src={MyImg} alt="bg-img" className="tour-bg" />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <ImageList
                sx={{ maxWidth: '100%', maxHeight: '100%' }}
                variant="quilted"
                cols={4}
                rowHeight={121}
              >
                {itemData.map((item) => (
                  <ImageListItem
                    key={item.img}
                    cols={item.cols || 1}
                    rows={item.rows || 1}
                  >
                    <img
                      {...srcset(item.img, 121, item.rows, item.cols)}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Grid size={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent></CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    Description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, omnis repudiandae. Doloribus dolor quae hic',
    title: 'Bike',
    cols: 2,
  },
]

export default DetailTours
