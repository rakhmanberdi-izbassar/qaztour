import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import PublicIcon from '@mui/icons-material/Public'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

// ✅ react-leaflet компоненттерін импорттау
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Бейнелерді көрсету үшін YouTube/Vimeo сілтемелерін өңдейтін көмекші функция
const getYouTubeEmbedUrl = (url) => {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/g
  const match = regExp.exec(url)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

const getVimeoEmbedUrl = (url) => {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:channels\/|groups\/[^\/]*\/videos\/|video\/|)([\d]+)(?:\S+)?/g
  const match = regExp.exec(url)
  return match ? `https://player.vimeo.com/video/${match[1]}` : null
}

// getImageUrl функциясы (бұрынғыдай, сурет жолдарын BASE_URL-мен біріктіреді)
const BASE_URL = 'http://127.0.0.1:8000/storage/'
const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/600x400?text=Event+Image'
  if (imagePath.startsWith('http')) return imagePath
  return `${BASE_URL}${encodeURIComponent(imagePath)}`
}

const SingleEventPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/events/${id}`
        )
        setEvent(response.data.data) // API жауабының құрылымын тексеріңіз
      } catch (err) {
        console.error('Оқиғаны жүктеу кезінде қате кетті:', err)
        setError(err.message || 'Оқиға туралы мәліметтерді алу мүмкін болмады.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  const handleGoBack = () => {
    navigate(-1)
  }

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
        <Typography ml={2}>Оқиға жүктелуде...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 14, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Қате: {error}
        </Typography>
      </Container>
    )
  }

  if (!event) {
    return (
      <Container sx={{ mt: 14, textAlign: 'center' }}>
        <Typography variant="h6" color="warning">
          Оқиға табылмады.
        </Typography>
      </Container>
    )
  }

  const youtubeEmbedUrl = event.video_url
    ? getYouTubeEmbedUrl(event.video_url)
    : null
  const vimeoEmbedUrl = event.video_url
    ? getVimeoEmbedUrl(event.video_url)
    : null

  return (
    <Container sx={{ py: 14 }}>
      <IconButton onClick={handleGoBack} sx={{ mb: 2 }}>
        <ArrowBackIosIcon />
      </IconButton>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardMedia
          component="img"
          alt={event.title_kz}
          height="400"
          image={getImageUrl(event.image)} // Негізгі сурет
          sx={{ objectFit: 'cover', borderRadius: 'inherit' }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            component="h1"
            fontWeight="bold"
          >
            {event.title_kz}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {event.eventType?.name} | {event.organizer}
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Сипаттама
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {event.description_kz}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Мәліметтер
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <CalendarTodayIcon color="action" />
              </ListItemIcon>
              <ListItemText
                primary="Күні мен уақыты"
                secondary={`${new Date(event.start_date).toLocaleString()} - ${
                  event.end_date
                    ? new Date(event.end_date).toLocaleString()
                    : 'жалғасуда'
                }`}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <LocationOnIcon color="action" />
              </ListItemIcon>
              <ListItemText
                primary="Орналасқан жері"
                secondary={`${event.location_name || 'Белгісіз орын'} (${
                  event.address || 'Мекенжай жоқ'
                })`}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AttachMoneyIcon color="action" />
              </ListItemIcon>
              <ListItemText
                primary="Бағасы"
                secondary={event.price_info || 'Тегін'}
              />
            </ListItem>
            {event.phone && (
              <ListItem disablePadding>
                <ListItemIcon>
                  <PhoneIcon color="action" />
                </ListItemIcon>
                <ListItemText primary="Телефон" secondary={event.phone} />
              </ListItem>
            )}
            {event.email && (
              <ListItem disablePadding>
                <ListItemIcon>
                  <EmailIcon color="action" />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={event.email} />
              </ListItem>
            )}
            {event.website && (
              <ListItem disablePadding>
                <ListItemIcon>
                  <PublicIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary="Веб-сайт"
                  secondary={
                    <Link href={event.website} target="_blank">
                      {event.website}
                    </Link>
                  }
                />
              </ListItem>
            )}
          </List>

          {/* Бейнелер (егер бар болса) */}
          {(youtubeEmbedUrl || vimeoEmbedUrl) && (
            <Box sx={{ my: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Бейне
              </Typography>
              <Box sx={{ position: 'relative', pt: '56.25%', mb: 2 }}>
                {' '}
                {/* 16:9 қатынасы үшін */}
                {youtubeEmbedUrl && (
                  <iframe
                    src={youtubeEmbedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: 8,
                    }}
                    title={event.title}
                  ></iframe>
                )}
                {vimeoEmbedUrl && (
                  <iframe
                    src={vimeoEmbedUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: 8,
                    }}
                    title={event.title}
                  ></iframe>
                )}
              </Box>
            </Box>
          )}

          {/* Галерея (қосымша суреттер) */}
          {event.gallery_images &&
            event.gallery_images.length > 0 && ( // Егер API-де images массиві бөлек атымен келсе
              <Box sx={{ my: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Галерея
                </Typography>
                <Grid container spacing={2}>
                  {event.gallery_images.map((imgSrc, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <CardMedia
                        component="img"
                        image={getImageUrl(imgSrc)}
                        alt={`Галерея суреті ${index + 1}`}
                        sx={{
                          borderRadius: 2,
                          height: 180,
                          objectFit: 'cover',
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

          {/* Карта (егер координаттар болса) */}
          {event.latitude && event.longitude && (
            <Box sx={{ my: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Картадағы орналасуы
              </Typography>
              <Box sx={{ height: 350, borderRadius: 2, overflow: 'hidden' }}>
                <MapContainer
                  center={[
                    parseFloat(event.latitude),
                    parseFloat(event.longitude),
                  ]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  key={event.id} // Картаны оқиға ID-іне байланысты қайта инициализациялау
                >
                  <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      parseFloat(event.latitude),
                      parseFloat(event.longitude),
                    ]}
                  >
                    <Popup>{event.title}</Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default SingleEventPage
