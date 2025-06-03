import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  CardMedia,
  Chip,
  Divider,
  Rating,
  Paper,
  CircularProgress,
  Container,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' // Leaflet стилдерін импорттау
import { useTranslation } from 'react-i18next'
// --- Styled Components ---
const GalleryImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  borderRadius: theme.spacing(1),
  objectFit: 'cover',
}))

// --- Helper function for image URL ---
const BASE_URL = 'http://127.0.0.1:8000/storage/'

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/300x200?text=No+Image'
  if (imagePath.startsWith('http')) return imagePath
  return `${BASE_URL}${encodeURIComponent(imagePath)}`
}

const PlaceDetail = () => {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchPlaceData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/places/${id}`
        )
        console.log('API Response for PlaceDetail:', response.data)
        setPlace(response.data)
      } catch (err) {
        console.error('Көрікті орынды жүктеу кезінде қате кетті:', err)
        setError(
          err.message || 'Көрікті орын туралы мәліметтерді алу мүмкін болмады.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPlaceData()
  }, [id])

  useEffect(() => {
    // Leaflet icon bug fix for Webpack
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  const ResetMapView = ({ lat, lng }) => {
    const map = useMap()
    useEffect(() => {
      map.invalidateSize()
      map.setView([lat, lng], 13)
    }, [map, lat, lng])
    return null
  }

  // Жүктеу немесе қателік күйлері
  if (loading) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
        <Typography mt={2}>{t('places_detail.loading')}</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Қате: {error}
        </Typography>
      </Container>
    )
  }

  // Орын табылмады
  if (!place) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          {t('places_detail.notfound')}
        </Typography>
      </Container>
    )
  }

  // Картаға арналған координаттарды дайындау
  const lat = parseFloat(place.lat)
  const lng = parseFloat(place.lng)
  const hasCoordinates = !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0 // 0,0 болмауын да тексеру

  return (
    <Container sx={{ py: 14 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {place.name_kz}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {place.city}, {place.country}
      </Typography>

      {/* Галерея */}
      <Grid container spacing={2} mb={4}>
        {place.images && place.images.length > 0 ? (
          place.images.map((imgUrl, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <GalleryImage
                image={getImageUrl(imgUrl)}
                title={`Сурет ${index + 1}`}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {t('places_detail.notfound_img')}
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Негізгі сипаттама */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('places_detail.overview')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {place.description_kz}
        </Typography>
      </Paper>

      {/* Рейтинг */}
      <Box display="flex" alignItems="center" mb={2}>
        <Rating
          value={parseFloat(place.rating) || 0}
          precision={0.1}
          readOnly
        />
        <Typography variant="body2" ml={1}>
          {parseFloat(place.rating) || 0} / 5
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Қызметтер немесе қосымша мәліметтер */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          {t('places_detail.information')}
        </Typography>
        {place.things_to_do &&
        typeof place.things_to_do === 'string' &&
        place.things_to_do.length > 0 ? (
          <Grid container spacing={1}>
            {place.things_to_do.split(',').map((item, index) => (
              <Grid item key={index}>
                <Chip label={item.trim()} sx={{ mr: 1, mb: 1 }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {t('places_detail.notfound_information')}
          </Typography>
        )}
      </Box>

      {/* Карта */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          {t('places_detail.location')}
        </Typography>

        {hasCoordinates ? ( // Жаңа hasCoordinates айнымалысын қолданамыз
          <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden' }}>
            <MapContainer
              center={[place.lat, place.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[place.lat, place.lng]}>
                <Popup>{place.name_kz}</Popup>
              </Marker>
              <ResetMapView lat={place.lat} lng={place.lng} />
            </MapContainer>
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: 300,
              backgroundColor: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >
            <Typography color="text.secondary">
              {t('places_detail.notfound_coordinate')}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default PlaceDetail
