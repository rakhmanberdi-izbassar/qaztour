import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  Container,
  Button,
  Rating,
  Grid,
  Divider,
  ImageList,
  ImageListItem,
  Dialog
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleIcon from '@mui/icons-material/People'
import itemData from './../data_example'
import Header from './Header'

const TourDetail = () => {
  const { id } = useParams()
  const item = itemData.find((tour) => tour.id === Number(id))
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  if (!item) {
    return (
      <Typography
        variant="h5"
        sx={{ textAlign: 'center', mt: 5, color: 'error.main' }}
      >
        Tour not found
      </Typography>
    )
  }

  const tempGallery = [
    "https://travosy.vercel.app/static/media/1.07f134933e8c8ac359b9.jpg",
    "https://travosy.vercel.app/static/media/2.e083e5af6b98325ac9ed.jpg",
    "https://travosy.vercel.app/static/media/3.597c87bf0632b9e644e2.jpg",
    "https://travosy.vercel.app/static/media/4.738a1d5ee8bdcfd7b945.jpg"
  ]

  const galleryImages = item.gallery && item.gallery.length > 0 ? item.gallery : tempGallery

  const handleOpen = (img) => {
    setSelectedImage(img)
    setOpen(true)
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          width: '100%',
          height: '400px',
          background: `url(${item.img}) center/cover no-repeat`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', p: 3, borderRadius: 2 }}>
          <Typography variant="h3" fontWeight="bold">
            {item.title}
          </Typography>
        </Box>
      </Box>

      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, boxShadow: 5 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                Tour Gallery
              </Typography>
              <ImageList variant="masonry" cols={2} gap={8} sx={{ width: '100%' }}>
                {galleryImages.map((img, index) => (
                  <ImageListItem key={index} onClick={() => handleOpen(img)} sx={{ cursor: 'pointer' }}>
                    <img
                      src={img}
                      alt={`Gallery Image ${index + 1}`}
                      loading="lazy"
                      style={{ width: '100%', borderRadius: '8px', transition: 'transform 0.3s ease-in-out' }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </ImageListItem>
                ))}
              </ImageList>

              <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
                {selectedImage && (
                  <img src={selectedImage} alt="Full Size" style={{ width: '100%', height: '100%' }} />
                )}
              </Dialog>

              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
                About This Tour
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {item.Description}
              </Typography>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight="bold">Tour Details:</Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <AccessTimeIcon sx={{ color: 'gray', mr: 1 }} />
                <Typography variant="body2">Duration: 5 Days</Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <PeopleIcon sx={{ color: 'gray', mr: 1 }} />
                <Typography variant="body2">Group Size: Up to 15 people</Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <LocationOnIcon sx={{ color: 'gray', mr: 1 }} />
                <Typography variant="body2">Location: {item.location || 'Unknown'}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3, boxShadow: 5 }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                ${item.price}
              </Typography>
              <Rating value={item.rating || 4} precision={0.5} readOnly sx={{ mt: 1 }} />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, width: '100%' }}
              >
                Book Now
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default TourDetail