import React, { useState, useEffect } from 'react'
import { Container, Typography, Grid } from '@mui/material'
import PostCard from './PostCard'

const BlogPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock деректер (API-ден алынғандай етіп)
  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          author: 'Айбек',
          date: '2025-05-04',
          title: 'Алматының керемет табиғаты',
          content: 'Бүгін мен Іле Алатауының баурайында серуендедім...',
          image: 'https://source.unsplash.com/random/800x400?nature',
        },
        {
          id: 2,
          author: 'Салтанат',
          date: '2025-05-03',
          title: 'Бурабайға саяхат',
          content: 'Бурабай - Қазақстанның інжу-маржаны...',
          image: 'https://source.unsplash.com/random/800x400?lake',
        },
        {
          id: 3,
          author: 'Ерлан',
          date: '2025-05-02',
          title: 'Маңғыстаудың ғажайыптары',
          content: 'Маңғыстаудың ландшафты ерекше әсер қалдырды...',
          image: 'https://source.unsplash.com/random/800x400?desert',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <Typography variant="h6">Блог жазбалары жүктелуде...</Typography>
  }

  if (error) {
    return <Typography color="error">Қате: {error}</Typography>
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
