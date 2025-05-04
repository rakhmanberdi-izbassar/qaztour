import React, { useState } from 'react'
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import VideoCamera from '@mui/icons-material/Videocam'

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    setImages([...images, ...files])
  }

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files)
    setVideos([...videos, ...files])
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('content', content)
      images.forEach((image) => formData.append('images', image))
      videos.forEach((video) => formData.append('videos', video))

      // API-ге постты жіберу логикасы осында болады
      console.log('Post data:', formData.get('content'), images, videos)
      setContent('')
      setImages([])
      setVideos([])
      setLoading(false)
      alert('Пост жарияланды!') // Уақытша хабарлама
    } catch (err) {
      setError(err.message || 'Постты жариялау кезінде қате кетті')
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Жаңа пост жазу
      </Typography>
      <TextField
        label="Немен бөліскіңіз келеді?"
        multiline
        rows={4}
        fullWidth
        value={content}
        onChange={handleContentChange}
        margin="normal"
      />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton color="primary" component="label">
          <PhotoCamera />
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleImageUpload}
          />
        </IconButton>
        <Typography sx={{ ml: 1 }}>Суреттер қосу</Typography>
        <IconButton color="primary" component="label" sx={{ ml: 2 }}>
          <VideoCamera />
          <input
            hidden
            accept="video/*"
            multiple
            type="file"
            onChange={handleVideoUpload}
          />
        </IconButton>
        <Typography sx={{ ml: 1 }}>Бейнелер қосу</Typography>
      </Box>
      {images.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Жүктелген суреттер:</Typography>
          <Box sx={{ display: 'flex', overflowX: 'auto', mt: 1 }}>
            {images.map((image, index) => (
              <Box key={index} sx={{ mr: 1 }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  style={{ height: 100, width: 'auto' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
      {videos.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Жүктелген бейнелер:</Typography>
          <Box sx={{ display: 'flex', overflowX: 'auto', mt: 1 }}>
            {videos.map((video, index) => (
              <Box key={index} sx={{ mr: 1 }}>
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  style={{ height: 100, width: 'auto' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Жариялануда...' : 'Жариялау'}
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
