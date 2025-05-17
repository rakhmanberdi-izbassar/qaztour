import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Select,
  Button,
} from '@mui/material'

const events = [
  {
    id: 1,
    title: 'Алматы марафоны 2025',
    date: '2025-04-20',
    location: 'Алматы',
    type: 'Спорт',
    image:
      'https://ertenmedia.kz/wp-content/uploads/2025/03/6bb92a6c-b1d5-41ff-877c-114965ad3a5b-1024x682.jpeg',
    description: 'Алматыдағы ең ірі марафонға қатысып, өзіңді сынап көр!',
  },
  {
    id: 2,
    title: 'Технологиялық Саммит',
    date: '2025-06-15',
    location: 'Астана',
    type: 'IT',
    image:
      'https://sputnik.kz/img/07e8/09/0f/47108883_0:0:1280:853_1440x900_80_0_1_09848a65bcd78be62b340a01f40da271.jpg.webp?source-sid=',
    description: 'Қазақстандағы ең ірі IT мамандар саммиті.',
  },
  {
    id: 3,
    title: 'Музыкалық фестиваль',
    date: '2025-07-10',
    location: 'Шымкент',
    type: 'Музыка',
    image: 'https://massaget.kz/userdata/news/news_17681/photo.jpg',
    description: 'Ең үздік әншілердің өнерін тамашалаңыз!',
  },
]

function EventsPage() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const filteredEvents = events.filter((event) => {
    return (
      (!selectedDate || event.date === selectedDate) &&
      (!selectedLocation || event.location === selectedLocation) &&
      (!selectedType || event.type === selectedType)
    )
  })

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 14 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Жақын арадағы іс-шаралар
        </Typography>
        <Typography variant="subtitle1" color="gray">
          Өзіңізге ыңғайлы іс-шараларды таңдап, тіркеліңіз!
        </Typography>
      </Box>

      {/* Фильтрлер */}
      <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            type="date"
            fullWidth
            label="Күні"
            InputLabelProps={{ shrink: true }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Select
            fullWidth
            displayEmpty
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <MenuItem value="">Барлық қалалар</MenuItem>
            <MenuItem value="Алматы">Алматы</MenuItem>
            <MenuItem value="Астана">Астана</MenuItem>
            <MenuItem value="Шымкент">Шымкент</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Select
            fullWidth
            displayEmpty
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem value="">Барлық түрлері</MenuItem>
            <MenuItem value="Спорт">Спорт</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Музыка">Музыка</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Іс-шаралар карточкалары */}
      <Grid container spacing={3}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {event.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {event.date} • {event.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {event.description}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, borderRadius: 3 }}
                  >
                    Толығырақ
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
            Кешіріңіз, сіздің фильтрлеріңізге сәйкес іс-шаралар табылмады 😔
          </Typography>
        )}
      </Grid>
    </Container>
  )
}

export default EventsPage
