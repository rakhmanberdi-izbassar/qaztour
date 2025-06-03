import React, { useState, useEffect } from 'react'
import axios from 'axios' // axios импорттау
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
  CircularProgress, // Жүктеу индикаторы үшін
  InputLabel, // Select үшін
  FormControl, // Select үшін
} from '@mui/material'
import { Link } from 'react-router-dom' // Толығырақ үшін
import { styled } from '@mui/material/styles' // styled импорттау
import { useTranslation } from 'react-i18next'
// Styled Card (TourList-тен алынғандай)
const StyledEventCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2), // Дөңгелектелген шеттер
  boxShadow: theme.shadows[3], // Жеңіл көлеңке
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)', // Үстіне апарғанда көтерілу
    boxShadow: theme.shadows[6], // Тереңірек көлеңке
  },
}))

// Styled CardMedia (сурет үшін)
const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    height: 160,
  },
  borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`, // Жоғарғы бұрыштары дөңгелек
}))

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const BASE_URL = 'http://127.0.0.1:8000/storage/' // Суреттер үшін BASE_URL

  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return 'https://via.placeholder.com/300x200?text=Event+Image'
    if (imagePath.startsWith('http')) return imagePath
    return `${BASE_URL}${encodeURIComponent(imagePath)}`
  }

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = {}
        if (selectedDate) params.date = selectedDate
        if (selectedLocation) params.location_name = selectedLocation
        if (selectedType) params.event_type = selectedType

        const response = await axios.get('http://127.0.0.1:8000/api/events', {
          params,
        })
        console.log('API Response:', response.data) // Бұл жолы толық жауапты қараңыз

        // Деректерді дұрыс жолмен алу
        setEvents(response.data.data.data || []) // <<< Мәселе осында! Қазір API жауабындағы "data" ішінде тағы "data" массиві бар.
      } catch (err) {
        console.error('Оқиғаларды жүктеу кезінде қате кетті:', err)
        setError(err.message || 'Оқиғаларды жүктеу мүмкін болмады.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [selectedDate, selectedLocation, selectedType])
  // Mock қалалар мен типтер (API-ден City және EventType тізімдерін алу керек)
  const mockLocations = ['Алматы', 'Астана', 'Шымкент', 'Атырау']
  const mockTypes = [
    'Концерт',
    'Спорттық іс-шара',
    'Фестиваль',
    'Көрме',
    'Білім беру',
    'Балаларға арналған',
  ]

  if (loading) {
    return (
      <Container
        sx={{
          mt: 14,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
        <Typography ml={2}>{t('events.loading')}...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 14, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {t('events.error')}: {error}
        </Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ mt: 14 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>

          {t('events.events')}
        </Typography>
        <Typography variant="subtitle1" color="gray">
          {t('events.description')}
        </Typography>
      </Box>

      {/* Фильтрлер */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            type="date"
            fullWidth
            label={t('events.day')}
            InputLabelProps={{ shrink: true }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>{t('events.city')}</InputLabel>
            <Select
              value={selectedLocation}
              label={t('events.city')}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <MenuItem value="">{t('events.all_cities')}</MenuItem>
              {mockLocations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>{t('events.type')}</InputLabel>
            <Select
              value={selectedType}
              label="Түрі"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="">{t('events.all_types')}</MenuItem>
              {mockTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Іс-шаралар карточкалары */}
      <Grid container spacing={3}>
        {events.length > 0 ? (
          events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <StyledEventCard>
                <StyledCardMedia
                  image={getImageUrl(event.image)}
                  title={event.title_kz}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {event.title_kz}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {new Date(event.start_date).toLocaleDateString()} •{' '}
                    {event.location_kz_name || event.city_kz?.name || 'Белгісіз орын'}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {event.description_kz?.substring(0, 100)}...
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, borderRadius: 3 }}
                    component={Link}
                    to={`/events/${event.id}`} // Жеке бетке сілтеме
                  >
                    {t('events.more')}
                  </Button>
                </CardContent>
              </StyledEventCard>
            </Grid>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
            {t('events.notfound')}
          </Typography>
        )}
      </Grid>
    </Container>
  )
}

export default EventsPage
