import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  CircularProgress,
  Rating,
  Divider,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import PublicIcon from '@mui/icons-material/Public'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BookingForm from './BookingForm' // Броньдау формасын импорттау

const HotelDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const BASE_URL = 'http://127.0.0.1:8000/storage/' // Сіздің API storage URL-і

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/hotels/${id}`
        )
        if (response.status !== 200) {
          throw new Error('Қонақүйді жүктеу кезінде қате кетті.')
        }
        setHotel(response.data.hotels)
      } catch (err) {
        console.error('Қонақүйді жүктеу кезінде қате кетті:', err)
        setError(
          err.message || 'Қонақүй туралы мәліметтерді алу мүмкін болмады.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchHotel()
  }, [id])

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/600x400' // Әдепкі сурет
    if (imagePath.startsWith('http')) return imagePath
    return `${BASE_URL}${imagePath}`
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleBookNow = () => {
    navigate(`/hotel-booking/${hotel.id}`) // Броньдау бетіне бағыттау
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

  if (!hotel) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h6">Қонақүй табылмады.</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 8 }}>
      <IconButton onClick={handleGoBack} sx={{ mb: 2 }}>
        <ArrowBackIosIcon />
      </IconButton>
      <Card>
        <CardMedia
          component="img"
          alt={hotel.name}
          height="400"
          image={getImageUrl(hotel.image)}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {hotel.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <LocationOnIcon sx={{ mr: 0.5, fontSize: 'inherit' }} />{' '}
            {hotel.address}, {hotel.city}, {hotel.country}
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <Rating
              name={`hotel-rating-${hotel.id}`}
              value={hotel.rating}
              precision={0.1}
              readOnly
            />
            <Typography variant="body2" color="text.secondary" ml={0.5}>
              ({hotel.rating})
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {hotel.description}
          </Typography>
          <Typography variant="subtitle1">
            ${hotel.price_per_night} / night
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Room Types
          </Typography>
          {hotel.room_types && hotel.room_types.length > 0 ? (
            hotel.room_types.map((roomType) => (
              <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  alt={hotel.name}
                  height="200"
                  image={getImageUrl(hotel.image)} // Қонақүйдің басты суреті
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {hotel.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                  >
                    ${hotel.price_per_night} / night
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Max Guests: {hotel.max_guests}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available Rooms: {hotel.available_rooms}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBookNow}
                  >
                    Броньдау
                  </Button>
                </Box>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No room types available for this hotel.
            </Typography>
          )}
          <Box sx={{ mt: 2 }}>
            <Button color="primary" startIcon={<PhoneIcon />} sx={{ mr: 1 }}>
              {hotel.phone}
            </Button>
            <Button color="secondary" startIcon={<EmailIcon />} sx={{ mr: 1 }}>
              {hotel.email}
            </Button>
            {hotel.website && (
              <Button
                color="info"
                startIcon={<PublicIcon />}
                href={hotel.website}
                target="_blank"
              >
                Website
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* <BookingForm /> Броньдау формасын қосу */}
    </Container>
  )
}

export default HotelDetail
