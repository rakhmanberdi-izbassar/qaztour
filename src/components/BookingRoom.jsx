import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Container,
  CircularProgress,
} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // navigate хукын қосыңыз

const BookingRoom = () => {
  const { bookingId } = useParams() // URL параметрін алу
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate() // navigate хукын инциализациялау

  console.log(bookingId)

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!bookingId) {
      alert('Қате! Бронь ID табылмады.')
      return
    }

    if (!token) {
      alert('Қолданушы авторизациядан өтпеген.')
      return
    }

    axios
      .get(`http://127.0.0.1:8000/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooking(response.data.booking) // `.booking` ішінен алу керек
        setLoading(false)
      })
      .catch((error) => {
        console.error('Қате шықты:', error)
        setLoading(false)
      })
  }, [bookingId])
  // `bookingId` өзгерген сайын қайта жүктеледі

  if (loading) {
    return (
      <Container sx={{ paddingY: 14 }}>
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

  if (!booking) {
    return <Typography>Брондау мәліметтері табылмады</Typography>
  }

  const {
    hotel,
    room_type,
    check_in_date,
    check_out_date,
    guests_count,
    total_price,
    notes,
    status,
  } = booking

  const handleCancelBooking = () => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      alert('Қолданушы авторизациядан өтпеген.')
      return
    }

    axios
      .post(
        `http://127.0.0.1:8000/api/bookings/${bookingId}/cancel`,
        { status: 'cancelled' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert('Бронь сәтті жойылды')
        setBooking((prevBooking) => ({
          ...prevBooking,
          status: 'cancelled',
        }))

        // Қолданушыны /hotels/ бетіне қайта бағыттау
        navigate('/hotels/') // navigate хукын қолданамыз
      })
      .catch((error) => {
        console.error('Қате шықты:', error)
        alert('Бронь жою барысында қате шықты')
      })
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
        >
          Брондау мәліметтері
        </Typography>

        {/* Қонақүй ақпараты */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Қонақүй
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={`http://localhost:8000/storage/${hotel.image}`}
                alt={hotel.name}
                sx={{
                  width: '100%',
                  height: 250,
                  borderRadius: 2,
                  objectFit: 'cover',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{hotel.name}</Typography>
              <Typography variant="body1" gutterBottom>
                {hotel.description}
              </Typography>
              <Typography variant="body2">
                {hotel.address}, {hotel.country}
              </Typography>
              <Typography variant="body2">Жұлдыздар: {hotel.stars}</Typography>
              <Typography variant="body2">
                Баға/түн: {hotel.price_per_night} KZT
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Бөлме түрі */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Бөлме түрі
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={`http://localhost:8000/storage/${room_type.image}`}
                alt={room_type.name}
                sx={{
                  width: '100%',
                  height: 250,
                  borderRadius: 2,
                  objectFit: 'cover',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{room_type.name}</Typography>
              <Typography variant="body1" gutterBottom>
                {room_type.description}
              </Typography>
              <Typography variant="body2">
                Қонақтар саны: {room_type.max_guests}
              </Typography>
              <Typography variant="body2">
                Бөлмелер: {room_type.available_rooms}
              </Typography>
              <Typography variant="body2">
                Баға/түн: {room_type.price_per_night} KZT
              </Typography>
              <Typography variant="body2">
                Таңғы ас: {room_type.has_breakfast ? 'Иә' : 'Жоқ'}
              </Typography>
              <Typography variant="body2">
                Wi-Fi: {room_type.has_wifi ? 'Иә' : 'Жоқ'}
              </Typography>
              <Typography variant="body2">
                ТВ: {room_type.has_tv ? 'Иә' : 'Жоқ'}
              </Typography>
              <Typography variant="body2">
                Кондиционер: {room_type.has_air_conditioning ? 'Иә' : 'Жоқ'}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Брондау детализациясы */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Брондау
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                Тіркелу күні: {new Date(check_in_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                Шығу күні: {new Date(check_out_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                Қонақтар саны: {guests_count}
              </Typography>
              <Typography variant="body2">
                Ескертпелер: {notes || 'Жоқ'}
              </Typography>
              <Typography variant="body2">Статус: {status}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" color="primary">
                Жалпы баға: {total_price} KZT
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Төлеу батырмасы */}
        {status === 'pending' && (
          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              color="error"
              size="large"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 'bold' }}
              onClick={() => handleCancelBooking()}
            >
              Бронды өшіру
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 'bold' }}
              onClick={() => alert('Төлеу процесі басталды')}
            >
              Төлеу
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default BookingRoom
