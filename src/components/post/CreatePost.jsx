import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress, // Жүктеу индикаторы үшін
  Alert, // Қате/сәттілік хабарламасы үшін
  Paper, // Формаға фон беру үшін
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import api from '../../utils/axios' // Axios инстансы
import { useTheme } from '@mui/material/styles' // Теманы пайдалану үшін
import { useNavigate } from 'react-router-dom' // Бағыттау үшін

// --- Styled Components ---

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}))

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[8], // Көбірек көлеңке
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Элементтерді ортаға теңшеу
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}))

const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: '2.5rem',
  color: theme.palette.primary.dark,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1.5, 0), // Арақашықтық
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1), // Кішірек радиус
  },
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontSize: '1.1rem',
  fontWeight: theme.typography.fontWeightBold,
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const ImageUploadBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start', // Сол жаққа теңшеу
  width: '100%',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const UploadIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.primary.main,
}))

const StyledPreviewImage = styled('img')(({ theme }) => ({
  height: 100,
  width: 'auto',
  borderRadius: theme.spacing(1),
  marginLeft: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  objectFit: 'cover',
}))

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [savedImage, setSavedImage] = useState(null)
  const [locationId, setLocationId] = useState('')
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [locationsLoading, setLocationsLoading] = useState(true)
  const [locationsError, setLocationsError] = useState(null)

  const theme = useTheme() // Теманы пайдалану үшін
  const navigate = useNavigate() // Бағыттау үшін

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/locations')
        setLocations(response.data)
        setLocationsLoading(false)
      } catch (error) {
        console.error('Локацияларды жүктеу кезінде қате кетті:', error)
        setLocationsError('Локацияларды жүктеу кезінде қате кетті.')
        setLocationsLoading(false)
      }
    }

    fetchLocations()
  }, [])

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    setSavedImage(file)
  }

  const handleLocationIdChange = (event) => {
    setLocationId(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // Форманың әдепкі жіберуін болдырмау
    setLoading(true)
    setError(null)

    // Валидацияны фронтендте қосымша тексеру
    if (!content.trim() || !locationId) {
      setError('Барлық міндетті өрістерді толтырыңыз.')
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('content', content.trim())
      if (savedImage) {
        formData.append('image', savedImage)
      }
      formData.append('location_id', locationId)

      // Axios-та `Content-Type` FormData үшін автоматты түрде орнатылады, қолмен беру қажет емес.
      const response = await api.post('/posts', formData)

      console.log('Пост жарияланды:', response.data)
      setContent('')
      setSavedImage(null)
      setLocationId('')
      setLoading(false)
      alert('Пост сәтті жарияланды!')
      navigate('/profile') // Профиль бетіне бағыттау
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Постты жариялау кезінде қате кетті'
      )
      setLoading(false)
      console.error('Постты жариялау қатесі:', err.response?.data || err)
    }
  }

  return (
    <FormContainer maxWidth="md">
      <FormPaper elevation={3}>
        <FormTitle variant="h4">Жаңа пост жазу</FormTitle>

        <StyledTextField
          label="Немен бөліскіңіз келеді?"
          multiline
          rows={4}
          fullWidth
          value={content}
          onChange={handleContentChange}
          required // Міндетті өріс
        />

        <FormControl fullWidth margin="normal" disabled={locationsLoading}>
          <InputLabel id="location-id-label" required>
            Локацияны таңдаңыз
          </InputLabel>
          <Select
            labelId="location-id-label"
            id="location-id"
            value={locationId}
            label="Локацияны таңдаңыз"
            onChange={handleLocationIdChange}
            required // Міндетті өріс
          >
            <MenuItem value="">
              <em>Жоқ</em>
            </MenuItem>
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
          {locationsError && (
            <Typography color="error" sx={{ mt: 1, fontSize: '0.85rem' }}>
              Қате: {locationsError}
            </Typography>
          )}
          {locationsLoading && (
            <Typography
              color="textSecondary"
              sx={{ mt: 1, fontSize: '0.85rem' }}
            >
              Локациялар жүктелуде...
            </Typography>
          )}
        </FormControl>

        <ImageUploadBox>
          <UploadIconButton color="primary" component="label">
            <PhotoCamera />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
            />
          </UploadIconButton>
          <Typography sx={{ ml: 1, color: theme.palette.text.secondary }}>
            Сурет қосу
          </Typography>
          {savedImage && (
            <StyledPreviewImage
              src={URL.createObjectURL(savedImage)}
              alt="Жүктелген сурет"
            />
          )}
        </ImageUploadBox>

        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}

        <SubmitButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={
            loading ||
            locationsLoading ||
            locationsError ||
            (locations.length === 0 && !locationId)
          }
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Жариялау'
          )}
        </SubmitButton>
      </FormPaper>
    </FormContainer>
  )
}

export default CreatePost
