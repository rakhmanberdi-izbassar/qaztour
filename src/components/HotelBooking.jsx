import React, { useState } from 'react'
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
} from '@mui/material'

const HotelBookingTemplate = () => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [notes, setNotes] = useState('')

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
          <strong>Отель:</strong> Kazakhstan Express
        </Typography>
        <Typography>
          <strong>Тип номера:</strong> Комфорт
        </Typography>
        <Typography>
          <strong>Цена за ночь:</strong> 500.00 ₸
        </Typography>
        <Typography>
          <strong>Максимум гостей:</strong> 5
        </Typography>
        <Typography>
          <strong>Доступно номеров:</strong> 5
        </Typography>
        <Typography>
          <strong>Описание:</strong> saasas
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
      <Typography>Цена за ночь: 500.00 ₸</Typography>
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
