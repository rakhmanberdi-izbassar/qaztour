import React, { useState, useEffect } from 'react'
import { Container, Typography, Box, IconButton, styled } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { useParams } from 'react-router-dom'
import api from './../../utils/axios'
import LikeButton from './LikeButton'
import ShareButton from './ShareButton'
import CommentSection from './CommentSection'

const StyledImage = styled('img')({
  width: '100%',
  display: 'block',
  borderRadius: 8,
  marginBottom: 24,
  maxHeight: 600,
  objectFit: 'cover',
})

const ActionBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}))

const SinglePostPage = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${postId}`)
        setPost(response.data[0]) // Посттың мәліметтерін '0' кілтінен алыңыз
        setLoading(false)
      } catch (error) {
        console.error('Error fetching post:', error)
        setError('Жазбаны жүктеу кезінде қате кетті.')
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  if (loading) {
    return <Typography variant="h6">Жазба жүктелуде...</Typography>
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  if (!post) {
    return <Typography variant="h6">Жазба табылмады.</Typography>
  }

  return (
    <Container maxWidth="md" sx={{ mt: 14, mb: 14 }}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Автор: {post.user?.name || 'Белгісіз'} | Жарияланған күні:{' '}
        {new Date(post.created_at).toLocaleDateString()}
      </Typography>
      {post.images && post.images.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <StyledImage
            src={`http://localhost:8000/storage/${post.images[0].path}`}
            alt={post.title}
          />
        </Box>
      )}
      <Typography variant="body1" paragraph sx={{ lineHeight: 2 }}>
        {post.content}
      </Typography>
      <ActionBox>
        <LikeButton postId={post.id} initialLiked={post.liked_by_user} />
        <StyledIconButton aria-label="bookmark">
          <BookmarkBorderIcon />
        </StyledIconButton>
        <ShareButton shareUrl={`/blog/${post.id}`} shareTitle={post.title} />
      </ActionBox>
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Пікірлер
        </Typography>
        <CommentSection postId={post?.id} currentUserId={user?.id} />
      </Box>
    </Container>
  )
}

export default SinglePostPage
