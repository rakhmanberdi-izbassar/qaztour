import React, { useState, useEffect } from 'react'
import { Container, Typography, Grid } from '@mui/material'
import PostCard from './PostCard' // PostCard компонентінің жолын дұрыстаңыз
import api from './../../utils/axios' // Axios инстансын импорттаңыз

const BlogPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) {
    return <Typography variant="h6">Блог жазбалары жүктелуде...</Typography>
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
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
  )
}

export default BlogPage
