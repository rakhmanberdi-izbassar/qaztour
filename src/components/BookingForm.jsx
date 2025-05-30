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
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const BookingForm = ({ tourId, tourVolume }) => {
  // tourId және tourVolume пропстарын қабылдауды жалғастырамыз
  const navigate = useNavigate()
  const [numberOfPeople, setNumberOfPeople] = useState(1) // Әлі де орын санын таңдаймыз

  const handlePeopleChange = (event) => {
    const newSeats = parseInt(event.target.value, 10)
    setNumberOfPeople(newSeats)
  }

  const handleProceedToBooking = () => {
    if (!tourId) {
      // ✅ Тек tourId-ді тексереміз
      alert('Тур ID-і жоқ.')
      return
    }
    // ✅ numberOfPeople параметрін URL-ден алып тастаймыз
    navigate(`/tour-booking-details/${tourId}`)
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Турға бронь жасау
      </Typography>
      <Box sx={{ mt: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="number-of-people-label">Адам саны</InputLabel>
          <Select
            labelId="number-of-people-label"
            id="number-of-people"
            value={numberOfPeople}
            label="Адам саны"
            onChange={handlePeopleChange}
          >
            {/* tour.volume (турдағы қалған орындарды) API-дан алып, осы жерге қолданыңыз */}
            {Array.from({ length: tourVolume || 1 }, (_, i) => i + 1).map(
              (num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleProceedToBooking}
          sx={{ mt: 3 }}
        >
          Брондауды жалғастыру
        </Button>
      </Box>
    </Container>
  )
}

export default BookingForm
