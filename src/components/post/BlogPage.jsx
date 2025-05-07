import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  IconButton,
} from '@mui/material'
import PostCard from './PostCard'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import api from './../../utils/axios'
import { useNavigate } from 'react-router-dom'

const BlogPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setError('Блог жазбаларын жүктеу кезінде қате кетті.')
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleGoBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <Container sx={{ paddingY: 14 }}>
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
    return <Typography color="error">{error}</Typography>
  }

  return (
    <>
      <IconButton onClick={handleGoBack}>
        <ArrowBackIosIcon />
      </IconButton>
      <Container maxWidth="md" sx={{ mt: 14 }}>
        <Typography variant="h4" gutterBottom>
          Соңғы блог жазбалары
        </Typography>
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default BlogPage
