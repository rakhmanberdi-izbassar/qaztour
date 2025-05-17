import React, { useState } from 'react'
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  Rating,
  IconButton,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import SectionTitle from './SectionTitle'
import SectionSubtitle from './SectionSubtitle'
import { useEffect } from 'react'

const StyledCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: theme.shadows[10],
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    '& .overlay': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}))

const CardImage = styled('div')({
  width: '100%',
  height: 280,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
})

const CardOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(3),
  background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))',
  color: '#fff',
  transition: '0.3s ease',
  transform: 'translateY(100%)',
  opacity: 0,
}))

const PlacesList = () => {
  const [places, setPlaces] = useState([]) // Деректерді API-дан жүктейміз
  // const [places, setPlaces] = useState(placesData) // Уақытша статикалық деректер
  const [loading, setLoading] = useState(false) // Статикалық болғандықтан false
  const [error, setError] = useState(null) // Қате жоқ

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Сурет URL-ін алу үшін көмекші функция
  const getImageUrl = (images) => {
    // Егер images массиві бос немесе жоқ болса, әдепкі суретті қайтарамыз
    if (!images || images.length === 0) {
      return 'https://via.placeholder.com/300x200?text=No+Image' // Әдепкі сурет
    }

    const firstImage = images[0] // Массивтің бірінші элементін аламыз (ол жол болады)

    // Егер жол тікелей HTTP URL болса
    if (firstImage.startsWith('http')) {
      return firstImage
    }

    // Егер салыстырмалы жол болса, толық URL-ді құрастырамыз
    // BASE_URL-ді тура осы жерде қолдану керек
    // Егер сіздің API storage жолы "http://127.0.0.1:8000/storage/" болса
    return `http://127.0.0.1:8000/storage/${encodeURIComponent(firstImage)}`
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://127.0.0.1:8000/api/places/')
        if (!response.ok) {
          throw new Error(`Қате коды: ${response.status}`)
        }
        const data = await response.json()
        console.log('API response:', data) // Мына жерден құрылымды қараңыз
        // Егер data объект болса және places массиві ішінде болса:
        // setPlaces(data.places || data.data || data);
        setPlaces(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPlaces()
  }, [])

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
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

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h6" color="error">
          Қате: {error}
        </Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ pt: 14 }}>
      <SectionTitle>🇰🇿 Қазақстанның інжу-маржандары</SectionTitle>
      <SectionSubtitle>
        Біздің еліміздің ең әсем және ерекше көрікті жерлерімен танысыңыз.
        Саяхаттарыңызға шабыт алыңыз!
      </SectionSubtitle>

      <Grid container spacing={isMobile ? 2 : 4}>
        {places.map((place) => (
          <Grid item xs={12} sm={6} md={4} key={place.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height={250} // StyledCardMedia-дағы сияқты биіктік
                image={getImageUrl(place.images)}
                alt={place.name}
                sx={{ objectFit: 'cover' }}
              />

              <CardOverlay className="overlay">
                <Typography variant="h6" fontWeight="bold">
                  {place.name}
                </Typography>
                <Typography variant="body2" mb={1}>
                  {place.city}, {place.country}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Rating
                    value={parseFloat(place.rating) || 0}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="caption" ml={1}>
                    {parseFloat(place.rating) || 0} / 5
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  component={Link}
                  to={`/place/${place.id}`}
                >
                  Толығырақ
                </Button>
              </CardOverlay>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      {places.length === 0 && !loading && !error && (
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          mt={4}
        >
          Көрікті орындар әлі қосылмаған.
        </Typography>
      )}
      <br />
      <br />
    </Container>
  )
}

export default PlacesList
