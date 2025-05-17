import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  Rating,
  IconButton,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import PublicIcon from '@mui/icons-material/Public'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const HotelList = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const BASE_URL = 'http://127.0.0.1:8000/storage/'

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/hotels')
        setHotels(response.data.hotels.data || [])
      } catch (err) {
        console.error('Қонақүйлерді жүктеу кезінде қате кетті:', err)
        setError(err.message || 'Қонақүйлерді жүктеу кезінде қате кетті.')
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  const handleGoBack = () => {
    navigate(-1)
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x200' // Әдепкі сурет
    if (imagePath.startsWith('http')) return imagePath
    return `${BASE_URL}${imagePath}`
  }

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h6" color="error">
          Қате: {error}
        </Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 14 }}>
      <Typography variant="h4" gutterBottom>
        <IconButton onClick={handleGoBack} sx={{ mb: 2 }}>
          <ArrowBackIosIcon />
        </IconButton>
        Қонақүйлер тізімі
      </Typography>
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 6,
              }}
              onClick={() => (window.location.href = `/hotels/${hotel.id}`)}
            >
              <CardMedia
                component="img"
                height="140"
                image={getImageUrl(hotel.image)} // Қонақүй суретінің URL-і
                alt={hotel.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <LocationOnIcon sx={{ mr: 0.5, fontSize: 'inherit' }} />{' '}
                  {hotel.address}, {hotel.city}, {hotel.country}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {hotel.description?.substring(0, 100)}...
                </Typography>
                <Box display="flex" alignItems="center" mb={0.5}>
                  <Rating
                    name={`hotel-rating-${hotel.id}`}
                    value={hotel.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary" ml={0.5}>
                    ({hotel.rating})
                  </Typography>
                </Box>
                <Typography variant="subtitle1" mt={1}>
                  ${hotel.price_per_night} / night
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<PhoneIcon />}
                  sx={{ mr: 1 }}
                >
                  {hotel.phone}
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  startIcon={<EmailIcon />}
                  sx={{ mr: 1 }}
                >
                  {hotel.email}
                </Button>
                {hotel.website && (
                  <Button
                    size="small"
                    color="info"
                    startIcon={<PublicIcon />}
                    href={hotel.website}
                    target="_blank"
                  >
                    Website
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default HotelList
