import React, { useEffect, useState } from 'react'
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
  CircularProgress,
  Container,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const HotelBooking = () => {
  const { hotelId, roomId } = useParams()
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [notes, setNotes] = useState('')
  const [hotelData, setHotelData] = useState(null)
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('authToken')
  const userId = localStorage.getItem('userId') || 1 // уақытша 1

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/hotels/${hotelId}/book/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHotelData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(
          'Қате шықты:',
          error.response ? error.response.data : error.message
        )
        setLoading(false)
      })
  }, [hotelId, roomId, token])

  const handleSubmit = async () => {
    if (!checkIn || !checkOut) {
      alert('Күндерді толтырыңыз')
      return
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    const nights =
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)

    if (nights <= 0) {
      alert('Күні дұрыс таңдалмаған')
      return
    }

    const priceTotal = nights * hotelData.room_type.price_per_night

    const payload = {
      user_id: userId,
      hotel_id: hotelData.hotel.id,
      room_type_id: hotelData.room_type.id,
      check_in_date: checkIn,
      check_out_date: checkOut,
      guests_count: guests,
      notes,
      price_total: priceTotal,
      status: 'pending',
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/bookings/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const bookingId = response.data?.booking?.id

      alert('Бронь сәтті жасалды!')
      if (bookingId) {
        navigate(`/booking-room/${bookingId}`)
      } else {
        console.error('Қате: bookingId жоқ')
      }
    } catch (error) {
      console.error('Қате:', error.response?.data || error.message)
      alert('Қате орын алды. Деректерді тексеріңіз.')
    }
  }

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

  if (!hotelData) {
    return (
      <Typography sx={{ mt: 12, textAlign: 'center' }}>
        Мәлімет табылмады
      </Typography>
    )
  }

  const { hotel, room_type } = hotelData

  const nights =
    checkIn && checkOut
      ? (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      : 0
  const totalPrice = nights * room_type.price_per_night

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: '0 auto', mt: 12 }}>
      <Typography variant="h6" gutterBottom>
        Новое бронирование
      </Typography>

      <Box mb={2}>
        <Typography>
          <strong>Отель:</strong> {hotel.name}
        </Typography>
        <Typography>
          <strong>Тип номера:</strong> {room_type.name}
        </Typography>
        <Typography>
          <strong>Цена за ночь:</strong> {room_type.price_per_night} ₸
        </Typography>
        <Typography>
          <strong>Максимум гостей:</strong> {room_type.max_guests}
        </Typography>
        <Typography>
          <strong>Доступно номеров:</strong> {room_type.available_rooms}
        </Typography>
        <Typography>
          <strong>Описание:</strong> {room_type.description}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Дата заезда"
            type="date"
            fullWidth
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Дата выезда"
            type="date"
            fullWidth
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Количество гостей"
            type="number"
            fullWidth
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Дополнительные пожелания"
            multiline
            rows={3}
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" gutterBottom>
        <strong>Стоимость бронирования</strong>
      </Typography>
      <Typography>Цена за ночь: {room_type.price_per_night} ₸</Typography>
      <Typography>Количество ночей: {nights || 0}</Typography>
      <Typography>
        <strong>Общая стоимость: {totalPrice || 0} ₸</strong>
      </Typography>

      <Box mt={3} display="flex" gap={2}>
        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#007bff' }}
          onClick={() => {
            console.log('Батырма ЖҰМЫС ІСТЕП ТҰР') // 👈 міндетті түрде көрінуі керек
            handleSubmit()
          }}
        >
          Забронировать
        </Button>

        <Button variant="outlined" fullWidth color="inherit">
          Отмена
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />
    </Paper>
  )
}

export default HotelBooking
