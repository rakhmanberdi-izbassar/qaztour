import React, { useEffect, useState } from 'react'
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const HotelBookingTemplate = () => {
  const { hotelId, roomId } = useParams()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [notes, setNotes] = useState('')

  const [hotelData, setHotelData] = useState(null)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('authToken')

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/hotels/${hotelId}/book/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('API жауап:', response.data)
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

  if (loading) {
    return (
      <Typography sx={{ mt: 12, textAlign: 'center' }}>Жүктелуде...</Typography>
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

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: '0 auto', mt: 12 }}>
      <Typography variant="h6" gutterBottom>
        Новое бронирование
      </Typography>

      <Box mb={2}>
        <Typography>
          <strong>Информация о бронировании:</strong>
        </Typography>
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
      <Typography>Количество ночей: 0</Typography>
      <Typography>
        <strong>Общая стоимость: 0.00 ₸</strong>
      </Typography>

      <Box mt={3} display="flex" gap={2}>
        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#007bff' }}
        >
          Забронировать
        </Button>
        <Button variant="outlined" fullWidth color="inherit">
          Отмена
        </Button>
      </Box>
    </Paper>
  )
}

export default HotelBookingTemplate
