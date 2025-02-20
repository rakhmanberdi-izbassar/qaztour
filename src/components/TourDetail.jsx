import { useParams } from 'react-router-dom'
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import itemData from './../data_example'
import Header from './Header'

const TourDetail = () => {
  const { id } = useParams()
  const item = itemData.find((tour) => tour.id === Number(id))

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

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          p: 3,
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            boxShadow: 5,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            height="350"
            image={item.img}
            alt={item.title}
            sx={{ transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#333' }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.6 }}
            >
              {item.Description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default TourDetail
