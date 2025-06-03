import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Grid,
} from '@mui/material'

const TourBookingPageContent = () => {
  const { tourId } = useParams()
  const navigate = useNavigate()

  const [tour, setTour] = useState(null)
  const [seats, setSeats] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    axios
        .get(`http://127.0.0.1:8000/api/tours/${tourId}`)
        .then((res) => {
          setTour(res.data.tour)
          setLoading(false)
        })
        .catch(() => {
          setError('Турды жүктеу сәтсіз болды')
          setLoading(false)
        })
  }, [tourId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!tour) return
    setSubmitting(true)
    try {
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
      const token = localStorage.getItem('authToken')
      await axios.post(
          'http://127.0.0.1:8000/api/bookings_tours',
          {
            tour_id: tour.id,
            seats,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      )
      navigate('/tour_bookings')
    } catch (err) {
      setError('Брондау сәтсіз аяқталды')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading)
    return (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
    )
  if (error)
    return (
        <Box mt={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
    )

  return (
      <Box maxWidth="md" mx="auto" mt={14} component={Paper} p={4}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Турды брондау: {tour.name}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                  label={`Орын саны (қалдығы: ${tour.volume})`}
                  type="number"
                  fullWidth
                  value={seats}
                  inputProps={{ min: 1, max: tour.volume }}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  required
              />
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                  fullWidth
              >
                {submitting ? 'Брондалып жатыр...' : 'Брондау'}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box mt={5}>
          <Typography variant="h6" gutterBottom>
            Тур туралы ақпарат
          </Typography>
          <Typography>
            <strong>Аты:</strong> {tour.name}
          </Typography>
          <Typography>
            <strong>Бағасы:</strong> {tour.price} ₸
          </Typography>
          <Typography>
            <strong>Күні:</strong>{' '}
            {new Date(tour.date).toLocaleDateString('kk-KZ')}
          </Typography>
          <Typography>
            <strong>Сипаттама:</strong> {tour.description}
          </Typography>
        </Box>
      </Box>
  )
}

export default TourBookingPageContent
