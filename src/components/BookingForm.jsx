import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom' // useParams және useNavigate импорттау

const BookingForm = () => {
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [bookingStatus, setBookingStatus] = useState(null)
  const { id } = useParams() // URL параметрінен тур идентификаторын алу
  const navigate = useNavigate() // Бағыттау үшін useNavigate хукі

  const handlePeopleChange = (event) => {
    setNumberOfPeople(parseInt(event.target.value, 10))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBookingStatus(null)

    const bookingData = {
      tour_id: id, // Динамикалық түрде алынған тур идентификаторы
      seats: numberOfPeople,
    }

    try {
      const token = localStorage.getItem('authToken') // Авторизация токенін алу (егер қолданылса)

      const response = await fetch('http://127.0.0.1:8000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      })

      const data = await response.json()

      if (response.ok) {
        setBookingStatus({ type: 'success', message: 'Тур сәтті броньдалды!' })
        console.log('Броньдау сәтті:', data)
        // Сәтті броньдалғаннан кейін пайдаланушыны басқа бетке бағыттау
        // Мысалы, пайдаланушының броньдары бетіне
        navigate('/profile') // Профиль бетіне бағыттау
      } else {
        setBookingStatus({
          type: 'error',
          message: `Броньдау кезінде қате пайда болды: ${
            data.message || response.statusText
          }`,
        })
        console.error('Броньдау қатесі:', data)
      }
    } catch (error) {
      setBookingStatus({
        type: 'error',
        message: `Желілік қате: ${error.message}`,
      })
      console.error('Желілік қате:', error)
    }
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Турға бронь жасау
      </Typography>
      {bookingStatus && (
        <Alert severity={bookingStatus.type} sx={{ mb: 2 }}>
          {bookingStatus.message}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="number-of-people-label">Адам саны</InputLabel>
          <Select
            labelId="number-of-people-label"
            id="number-of-people"
            value={numberOfPeople}
            onChange={handlePeopleChange}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
              <MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Броньдау
        </Button>
      </Box>
    </Container>
  )
}

export default BookingForm
