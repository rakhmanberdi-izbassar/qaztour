// src/pages/TourBookingPage.jsx (немесе src/components/TourBookingPageContent.jsx)

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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Grid,
  // styled импорты, егер осы файлда styled компоненттер анықталса
  styled,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../utils/axios'
import tourPlaceholderImg from './../assets/photos/5ftsj0mn7lkw08ws40k4w4wss.jpg'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Header from './Header' // Header-ді осы жерден емес, src/pages/TourBookingPage.jsx-тен рендерлеу

// --- Styled Components (Бұл styled компоненттер осы файлда анықталған болса) ---
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(14),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(8),
  },
}))

const StyledGoBackButton = styled(IconButton)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.action.active,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))

const TourInfoCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[6],
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
}))

const TourImageMedia = styled(CardMedia)(({ theme }) => ({
  height: 300,
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    height: 200,
  },
}))

const PriceDisplay = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: theme.palette.success.main,
}))

const BookingFormCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[6],
  padding: theme.spacing(3),
}))

// --- Helper function for image URL ---
const BASE_URL = 'http://127.0.0.1:8000/storage/'
const getImageUrl = (imagePath) => {
  if (!imagePath) return tourPlaceholderImg
  if (imagePath.startsWith('http')) return imagePath
  return `<span class="math-inline">\{BASE\_URL\}</span>{encodeURIComponent(imagePath)}`
}

// ✅ initialSeats пропын алып тастадық
const TourBookingPageContent = ({ id }) => {
  // ✅ id пропын қабылдау (бұрын tourId болды)
  // const { id, numberOfPeople: initialPeople } = useParams(); // ✅ Алып тасталды, енді props арқылы аламыз
  const navigate = useNavigate()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [seats, setSeats] = useState(1) // ✅ Орын санын компоненттің ішінде бастаймыз
  const [totalPrice, setTotalPrice] = useState(0)
  const [bookingStatus, setBookingStatus] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  // API-ден тур туралы мәліметтерді алу
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await api.get(`http://127.0.0.1:8000/api/tours/${id}`)
        setTour(response.data.tour)
        setLoading(false)
      } catch (err) {
        console.error('Турды жүктеу кезінде қате кетті:', err)
        setError(err.message || 'Тур туралы мәліметтерді алу мүмкін болмады.')
        setLoading(false)
      }
    }
    if (id) {
      fetchTour()
    } else {
      setError('Тур ID-і жоқ.')
      setLoading(false)
    }
  }, [id])

  // Орын саны немесе тур бағасы өзгергенде жалпы бағаны есептеу
  useEffect(() => {
    if (tour) {
      setTotalPrice(seats * parseFloat(tour.price))
    }
  }, [seats, tour])

  // Орын санын өзгерту
  const handleSeatsChange = (event) => {
    const newSeats = parseInt(event.target.value, 10)
    // ✅ Tour.volume-нан аспауын тексеру
    if (tour && newSeats > tour.volume) {
      setSeats(tour.volume)
      setSnackbarMessage(`Турда тек ${tour.volume} орын қалды.`)
      setSnackbarSeverity('warning')
      setSnackbarOpen(true)
    } else if (newSeats < 1) {
      setSeats(1)
      setSnackbarMessage('Орын саны 1-ден кем болмауы керек.')
      setSnackbarSeverity('warning')
      setSnackbarOpen(true)
    } else {
      setSeats(newSeats)
    }
  }

  // Броньдауды жіберу
  const handleBookSubmit = async (event) => {
    event.preventDefault()
    setBookingStatus(null)

    if (!tour) {
      setSnackbarMessage('Тур туралы ақпарат жүктелуде. Қайтадан тырысыңыз.')
      setSnackbarSeverity('warning')
      setSnackbarOpen(true)
      return
    }

    if (seats <= 0 || seats > tour.volume) {
      setSnackbarMessage(
        `Орын саны дұрыс емес. 1-ден ${tour.volume} аралығында енгізіңіз.`
      )
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
      return
    }

    const bookingData = {
      tour_id: id, // ✅ URL-ден келген id
      seats: seats,
    }

    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        setSnackbarMessage('Броньдау үшін кіру қажет.')
        setSnackbarSeverity('error')
        setSnackbarOpen(true)
        return
      }

      const response = await api.post('/bookings', bookingData)
      console.log('Броньдау сәтті:', response.data)
      setBookingStatus({
        type: 'success',
        message: response.data.message || 'Тур сәтті броньдалды!',
      })
      setSnackbarSeverity('success')
      setSnackbarMessage(response.data.message || 'Тур сәтті броньдалды!')
      setSnackbarOpen(true)

      navigate(`/profile/bookings`)
    } catch (err) {
      console.error('Броньдау қатесі:', err.response?.data || err)
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Броньдау кезінде белгісіз қате пайда болды.'
      setBookingStatus({ type: 'error', message: errorMessage })
      setSnackbarSeverity('error')
      setSnackbarMessage(errorMessage)
      setSnackbarOpen(true)
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <StyledContainer sx={{ textAlign: 'center', py: 10 }}>
        <CircularProgress />
        <Typography mt={2}>Тур жүктелуде...</Typography>
      </StyledContainer>
    )
  }

  if (error) {
    return (
      <StyledContainer sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h6" color="error">
          Қате: {error}
        </Typography>
      </StyledContainer>
    )
  }

  if (!tour) {
    return (
      <StyledContainer sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h6" color="warning">
          Тур табылмады.
        </Typography>
      </StyledContainer>
    )
  }

  // ✅ `tour.location` және `tour.user` деректерінің бар екенін тексеру
  const locationName = tour.location?.name || '—'
  const userName = tour.user?.name || '—'

  return (
    <StyledContainer maxWidth="md">
      <StyledGoBackButton onClick={handleGoBack} aria-label="go back">
        <ArrowBackIosIcon /> Тур бетіне қайту
      </StyledGoBackButton>

      {/* Тур ақпараты */}
      <TourInfoCard>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <TourImageMedia image={getImageUrl(tour.image)} title={tour.name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontWeight="bold"
              >
                {tour.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {tour.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <PriceCheckIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <strong>Бағасы:</strong> ₸
                  {parseFloat(tour.price).toLocaleString('kk-KZ')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <strong>Өтетін күні:</strong>{' '}
                  {new Date(tour.date).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <strong>Орналасуы:</strong> {locationName}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <strong>Гид:</strong> {userName}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <EventSeatIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <strong>Қалған орын:</strong> {tour.volume}
                </Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </TourInfoCard>

      {/* Броньдау және төлем формасы */}
      <BookingFormCard>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ textAlign: 'center', mb: 3 }}
        >
          Брондау және төлем
        </Typography>
        <Box
          component="form"
          onSubmit={handleBookSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl fullWidth>
            <InputLabel id="seats-label">Орын саны</InputLabel>
            <Select
              labelId="seats-label"
              id="seats"
              value={seats}
              label="Орын саны"
              onChange={handleSeatsChange}
              inputProps={{ min: 1, max: tour.volume }}
            >
              {Array.from({ length: tour.volume || 1 }, (_, i) => i + 1).map(
                (num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <TextField
            label="Жалпы бағасы"
            fullWidth
            value={`₸${totalPrice.toLocaleString('kk-KZ', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <PriceCheckIcon sx={{ color: 'text.secondary' }} />
              ),
            }}
            variant="outlined"
            sx={{ mt: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
          >
            Брондау және төлеу
          </Button>

          {/* PayPal батырмасы (бронь id болғанда ғана көрсету) */}
          {/*
           {bookingStatus?.type === 'success' && bookingStatus.bookingId && (
             <Box sx={{ mt: 3, textAlign: 'center' }}>
               <Typography variant="body2" color="text.secondary" mb={1}>
                 Немесе PayPal арқылы төлеңіз:
               </Typography>
               <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID", currency: "KZT" }}>
                 <PayPalButtons
                   style={{ layout: "horizontal", tagline: false }}
                   createOrder={(data, actions) => {
                     return actions.order.create({
                       purchase_units: [
                         {
                           amount: {
                             currency_code: "KZT",
                             value: totalPrice.toFixed(2),
                           },
                         },
                       ],
                     });
                   }}
                   onApprove={(data, actions) => {
                     return actions.order.capture().then((details) => {
                       alert("Төлем сәтті аяқталды: " + details.payer.name.given_name);
                       // Төлем сәтті болғаннан кейін бэкэндке хабарлау
                     });
                   }}
                   onError={(err) => {
                     console.error("PayPal Error:", err);
                     alert("PayPal төлемі кезінде қате пайда болды.");
                   }}
                 />
               </PayPalScriptProvider>
             </Box>
           )}
           */}
        </Box>
      </BookingFormCard>
    </StyledContainer>
  )
}

export default TourBookingPageContent
