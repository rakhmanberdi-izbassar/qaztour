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
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import api from '../../utils/axios'

const StyledPreviewImage = styled('img')({
  height: 100,
  width: 'auto',
  borderRadius: 4,
  marginTop: 8,
})

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [savedImage, setSavedImage] = useState(null)
  const [locationId, setLocationId] = useState('')
  const [locations, setLocations] = useState([]) // Локациялар тізімі үшін жаңа күй
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [locationsLoading, setLocationsLoading] = useState(true) // Локациялар жүктелу күйі
  const [locationsError, setLocationsError] = useState(null) // Локациялар қатесі

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get('/locations')
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

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (savedImage) {
        // `savedImage` күйі суретті сақтайды деп болжаймыз
        formData.append('image', savedImage) // Кілтті `saved`-тен `image`-ге ауыстырыңыз
      }
      formData.append('location_id', locationId)
      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Пост жарияланды:', response.data)
      setTitle('')
      setContent('')
      setSavedImage(null)
      setLocationId('')
      setLoading(false)
      alert('Пост сәтті жарияланды!')
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
           {' '}
      <Typography variant="h4" gutterBottom>
                Жаңа пост жазу      {' '}
      </Typography>
           {' '}
      <TextField
        label="Немен бөліскіңіз келеді?"
        multiline
        rows={4}
        fullWidth
        value={content}
        onChange={handleContentChange}
        margin="normal"
      />
           {' '}
      <FormControl fullWidth margin="normal" disabled={locationsLoading}>
               {' '}
        <InputLabel id="location-id-label">Локацияны таңдаңыз</InputLabel>     
         {' '}
        <Select
          labelId="location-id-label"
          id="location-id"
          value={locationId}
          label="Локацияны таңдаңыз"
          onChange={handleLocationIdChange}
        >
                   {' '}
          <MenuItem value="">
                        <em>Жоқ</em>         {' '}
          </MenuItem>
                   {' '}
          {locations.map((location) => (
            <MenuItem key={location.id} value={location.id}>
                            {location.name}           {' '}
            </MenuItem>
          ))}
                 {' '}
        </Select>
               {' '}
        {locationsError && (
          <Typography color="error" sx={{ mt: 1 }}>
                        Қате: {locationsError}         {' '}
          </Typography>
        )}
               {' '}
        {locationsLoading && (
          <Typography color="textSecondary" sx={{ mt: 1 }}>
                        Локациялар жүктелуде...          {' '}
          </Typography>
        )}
             {' '}
      </FormControl>
           {' '}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
               {' '}
        <IconButton color="primary" component="label">
                    <PhotoCamera />         {' '}
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
          />
                 {' '}
        </IconButton>
                <Typography sx={{ ml: 1 }}>Сурет қосу</Typography>       {' '}
        {savedImage && (
          <StyledPreviewImage
            src={URL.createObjectURL(savedImage)}
            alt="Жүктелген сурет"
          />
        )}
             {' '}
      </Box>
           {' '}
      <Button
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
                {loading ? 'Жариялануда...' : 'Жариялау'}     {' '}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
                    Қате: {error}   
        </Typography>
      )}
    </Container>
  )
}

export default CreatePost
