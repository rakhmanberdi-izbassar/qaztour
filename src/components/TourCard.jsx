import React, { useState, useEffect } from 'react' // useState, useEffect қостық API үшін
import {
  Container,
  Box,
  Typography,
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent,
  styled,
  useTheme,
  CircularProgress,
} from '@mui/material'
import Grid from '@mui/joy/Grid' // Joy UI Grid
import AspectRatio from '@mui/joy/AspectRatio' // Joy UI AspectRatio
import Button from '@mui/joy/Button' // Joy UI Button
import Card from '@mui/joy/Card' // Joy UI Card
import IconButton from '@mui/joy/IconButton' // Joy UI IconButton
import TypographyJoy from '@mui/joy/Typography' // Joy UI Typography, атын ауыстырдық
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// --- Styled Components ---

const SectionWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: 'linear-gradient(135deg, #f0f8ff 0%, #e0ffff 100%)', // Ашық градиентті фон
  paddingBottom: theme.spacing(8),
  paddingTop: theme.spacing(10),
  overflow: 'hidden', // Фон элементтері шеттен шықпау үшін
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(14),
  },
}))

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4),
  },
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: '3.5rem', // Өте үлкен тақырып
  color: theme.palette.primary.dark,
  marginBottom: theme.spacing(1),
  textShadow: '2px 2px 4px rgba(0,0,0,0.2)', // Қалың көлеңке
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}))

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem', // Орташа өлшемді субтитр
  color: theme.palette.text.secondary,
  maxWidth: 700,
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}))

const StyledTourCard = styled(Card)(({ theme }) => ({
  // Joy UI Card үшін styled
  border: 'none',
  boxShadow: theme.shadows[15], // Өте үлкен, терең көлеңке
  borderRadius: theme.spacing(3), // Көбірек дөңгелектелген шеттер
  maxWidth: 400, // Картаның максималды ені
  mx: 'auto', // Ортаға теңшеу
  p: theme.spacing(2.5), // Ішкі бос орын
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out', // Анимация баяуырақ
  '&:hover': {
    transform: 'scale(1.08) rotate(1deg)', // Аздап айналдыру
    boxShadow: theme.shadows[20], // Одан да терең көлеңке
  },
  position: 'relative', // Жүрекше иконкасы үшін
}))

const TourImageWrapper = styled(AspectRatio)(({ theme }) => ({
  borderRadius: theme.spacing(1.5), // Суреттің дөңгелектелген шеттері
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
}))

const TourTitle = styled(TypographyJoy)(({ theme }) => ({
  // Joy UI Typography үшін
  fontWeight: theme.typography.fontWeightBold,
  fontSize: '1.3rem',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}))

const TourDateLocation = styled(TypographyJoy)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
}))

const TourPrice = styled(TypographyJoy)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.warning.main, // Сары-қызғылт сары түс
}))

const ViewButton = styled(Button)(({ theme }) => ({
  // Joy UI Button үшін
  ml: 'auto',
  alignSelf: 'center',
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main, // Негізгі түс
  borderRadius: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const FavoriteToggleButton = styled(IconButton)(({ theme }) => ({
  // Joy UI IconButton
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: theme.palette.error.main, // Қызыл жүрекше
  borderRadius: '50%',
  zIndex: 1, // Басқа элементтердің үстінде
  boxShadow: theme.shadows[3],
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: 'scale(1.1)',
  },
}))

const WaveSeparator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '120px', // Толқынның биіктігі
  marginTop: '-1px', // Алдыңғы секциямен байланыстыру
  zIndex: 1, // Толқынның басқа элементтердің үстінде болуы үшін
  '& svg path': {
    stroke: 'none',
    fill: 'url(#waveGradient)', // Градиентті қолдану
  },
}))

// --- Main Component ---
export default function ToursCollection() {
  const [featuredTours, setFeaturedTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/tours_featured'
        )
        // API жауабының құрылымын тексеріңіз
        // Мысалы, егер response.data.data ішінде турлар массиві болса
        setFeaturedTours(response.data.data || [])
      } catch (err) {
        console.error('Error fetching featured tours:', err)
        setError(err.message || 'Турлар топтамасын жүктеу мүмкін болмады.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedTours()
  }, [])

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x250?text=Tour+Image' // Әдепкі сурет
    if (imagePath.startsWith('http')) return imagePath
    return `http://127.0.0.1:8000/storage/${encodeURIComponent(imagePath)}`
  }

  const handleCardClick = (tourId) => {
    navigate(`/tour/${tourId}`)
  }

  if (loading) {
    return (
      <SectionWrapper>
        <SectionHeader>
          <StyledTitle component="h2">✨ {t('tour_card.title')}</StyledTitle>
          <StyledSubtitle>{t('tour_card.description')}</StyledSubtitle>
        </SectionHeader>
        <Container sx={{ textAlign: 'center', py: 5 }}>
          <CircularProgress color="primary" />
          <Typography variant="body1" mt={2}>
            Турлар жүктелуде...
          </Typography>
        </Container>
      </SectionWrapper>
    )
  }

  if (error) {
    return (
      <SectionWrapper>
        <SectionHeader>
          <StyledTitle component="h2">✨ {t('tour_card.title')}</StyledTitle>
          <StyledSubtitle>{t('tour_card.description')}</StyledSubtitle>
        </SectionHeader>
        <Container sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="error">
            Қате: {error}
          </Typography>
        </Container>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <StyledTitle component="h2">✨ {t('tour_card.title')}</StyledTitle>
          <StyledSubtitle>{t('tour_card.description')}</StyledSubtitle>
        </SectionHeader>

        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
          {featuredTours.length > 0 ? (
            featuredTours.map((tour) => (
              <Grid key={tour.id} xs={12} sm={6} md={4}>
                <StyledTourCard onClick={() => handleCardClick(tour.id)}>
                  <FavoriteToggleButton
                    aria-label="Таңдаулыға қосу"
                    variant="plain"
                    color="neutral"
                    size="sm"
                  >
                    {/* Логикасын қосу қажет: тур таңдаулы болса FavoriteIcon, болмаса FavoriteBorderIcon */}
                    <FavoriteBorderIcon />
                  </FavoriteToggleButton>
                  <TourImageWrapper
                    minHeight="150px"
                    maxHeight="250px"
                    ratio="16/9"
                  >
                    <img src={getImageUrl(tour.image)} alt={tour.name} />
                  </TourImageWrapper>
                  <MuiCardContent
                    orientation="horizontal"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      p: 0,
                    }}
                  >
                    <Box sx={{ mr: 1 }}>
                      <TourTitle>{tour.name_kz}</TourTitle>
                      <TourDateLocation>
                        {new Date(tour.date).toLocaleDateString()} •{' '}
                        {tour.location?.name || 'Белгісіз локация'}
                      </TourDateLocation>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <TypographyJoy variant="body2" color="text.secondary">
                        Жалпы баға:
                      </TypographyJoy>
                      <TourPrice>
                        ₸{parseFloat(tour.price).toLocaleString('kk-KZ')}
                      </TourPrice>
                    </Box>
                  </MuiCardContent>
                </StyledTourCard>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
              >
                Турлар топтамасы әлі қосылмаған немесе табылмады.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Толқынды бөлгіш */}
      <WaveSeparator>
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: '#0093E9', stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#80D0C7', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M-2.54,95.23 C222.63,199.84 369.35,37.02 501.97,99.19 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: 'none', fill: 'url(#waveGradient)' }}
          />
        </svg>
      </WaveSeparator>
    </SectionWrapper>
  )
}
