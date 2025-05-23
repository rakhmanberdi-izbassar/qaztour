import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  Container,
  TextField, // TextField импорттау
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete' // DeleteIcon импорттау
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import AddIcon from '@mui/icons-material/Add' // "Пост қосу" иконкасы
import { NavLink, Link } from 'react-router-dom'
import api from './../utils/axios' // Сіздің axios инстансыңыз

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userReviews, setUserReviews] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [editingPostId, setEditingPostId] = useState(null) 
  const [editedContent, setEditedContent] = useState('') 

  const fetchUserReviews = async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        console.error('Authentication token not found.')
        return
      }
      const response = await api.get('/user/reviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserReviews(response.data)
    } catch (error) {
      console.error('Error fetching user reviews:', error)
      setError('Failed to load user reviews.')
    }
  }

  useEffect(() => {
    const fetchUserProfileAndReviews = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          setError('Authentication token not found. Please log in.')
          setLoading(false)
          return
        }
        const userResponse = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('User Data:', userResponse.data)
        setUser(userResponse.data)
        const bookingsResponse = await api.get('/bookings/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('Bookings Data:', bookingsResponse.data)
        setBookings(bookingsResponse.data.bookings)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching user profile data:', err)
        setError('Failed to load user profile information.')
        setLoading(false)
      }
      await fetchUserReviews()
    }

    fetchUserProfileAndReviews()
  }, [])

  const handleDeleteReview = async (reviewId) => {
    setDeleteLoading(reviewId)
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        console.error('Authentication token not found.')
        return
      }
      await api.delete(`/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserReviews(userReviews.filter((review) => review.id !== reviewId))
      // Қажет болса, хабарлама көрсету
    } catch (error) {
      console.error('Error deleting review:', error)
      // Қате туралы хабарлама көрсету
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleDeletePost = async (postId) => {
    setDeleteLoading(postId)
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        console.error('Authentication token not found.')
        return
      }
      await api.delete(`/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Пост сәтті жойылса, UI-ден де алып тастау
      setUser((prevUser) => ({
        ...prevUser,
        posts: prevUser.posts.filter((post) => post.id !== postId),
      }))
      // Хабарлама көрсету (қажет болса)
    } catch (error) {
      console.error('Error deleting post:', error)
      // Қате туралы хабарлама көрсету (қажет болса)
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleEditPost = (post) => {
    setEditingPostId(post.id)
    setEditedContent(post.content)
  }

  const handleCancelEdit = () => {
    setEditingPostId(null)
    setEditedContent('')
  }

  const handleSaveEdit = async (postId) => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        console.error('Authentication token not found.')
        return
      }
      const response = await api.put(
        `/post/${postId}`,
        { content: editedContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // UI-дегі постты жаңарту
      setUser((prevUser) => ({
        ...prevUser,
        posts: prevUser.posts.map((post) =>
          post.id === postId
            ? { ...post, content: response.data.post.content }
            : post
        ),
      }))
      setEditingPostId(null)
      setEditedContent('')
      // Хабарлама көрсету (қажет болса)
    } catch (error) {
      console.error('Error updating post:', error)
      // Қате туралы хабарлама көрсету (қажет болса)
    }
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
    return (
      <Typography color="error" textAlign="center" mt={5}>
        {error}
      </Typography>
    )
  }

  if (!user) {
    return (
      <Typography textAlign="center" mt={5}>
        No user data available.
      </Typography>
    )
  }

  console.log('Bookings state before render:', bookings)
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, mt: 14 }}>
      {/* Профиль картасы */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          padding: 3,
          textAlign: 'center',
          mb: 3,
        }}
      >
        <Avatar
          src={`http://localhost:8000${user.avatar}`}
          sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
        />
        <Typography variant="h5" fontWeight={600}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Role: {user.role}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Button
            component={NavLink}
            to="/bookmarked-hotels"
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            Брондалған қонақүйлер
          </Button>
          <Button
            component={NavLink}
            to="/edit-profile"
            startIcon={<EditIcon />}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Профильді өңдеу
          </Button>
          <Button
            component={NavLink}
            to="/blog-create" // Жаңа пост құру бетінің маршруты
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            Жаңа пост
          </Button>
        </Box>
        {/* Әлеуметтік желі иконкалары */}
        <Box sx={{ mt: 2 }}>
          {user.facebook_url && (
            <IconButton
              href={user.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon color="primary" />
            </IconButton>
          )}
          {user.instagram_url && (
            <IconButton
              href={user.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon color="secondary" />
            </IconButton>
          )}
          {user.twitter_url && (
            <IconButton
              href={user.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon color="primary" />
            </IconButton>
          )}
        </Box>
      </Card>
      {/* Жазбалар */}
      {user.posts && user.posts.length > 0 && (
        <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Сіздің жазбаларыңыз
            </Typography>
            {user.posts.map((post) => (
              <Box
                key={post.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  borderBottom: '1px solid #eee',
                  pb: 1,
                }}
              >
                {editingPostId === post.id ? (
                  <TextField
                    fullWidth
                    multiline
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ flexGrow: 1, mr: 1 }}
                  />
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    {post.content || 'No Content'}
                  </Typography>
                )}
                {editingPostId === post.id ? (
                  <Box>
                    <Button
                      onClick={() => handleSaveEdit(post.id)}
                      color="primary"
                      size="small"
                    >
                      Сақтау
                    </Button>
                    <Button onClick={handleCancelEdit} size="small">
                      Болдырмау
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <IconButton
                      onClick={() => handleEditPost(post)}
                      aria-label="edit"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeletePost(post.id)}
                      disabled={deleteLoading === post.id}
                      aria-label="delete"
                      color="error"
                      size="small"
                    >
                      {deleteLoading === post.id ? (
                        <Typography variant="caption">Өшіп жатыр...</Typography>
                      ) : (
                        <DeleteIcon />
                      )}
                    </IconButton>
                  </Box>
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
      {/* Пікірлер */}
      {userReviews.length > 0 && (
        <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Сіздің пікірлеріңіз
            </Typography>
            {userReviews.map((review) => (
              <Box
                key={review.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  borderBottom: '1px solid #eee',
                  pb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flexGrow: 1 }}
                >
                  {review.content} (Рейтинг: {review.rating})
                </Typography>
                <IconButton
                  onClick={() => handleDeleteReview(review.id)}
                  disabled={deleteLoading === review.id}
                  aria-label="delete"
                  color="error"
                >
                  {deleteLoading === review.id ? (
                    <Typography variant="caption">Өшіп жатыр...</Typography>
                  ) : (
                    'Delete'
                  )}
                </IconButton>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
      {/* Турлар */}
      {user.tours && user.tours.length > 0 && (
        <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Сіздің турларыңыз
            </Typography>
            {user.tours.map((tour) => (
              <Box
                key={tour.id}
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
              >
                <Link
                  to={`/tour/${tour.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography>{tour.name}</Typography>
                </Link>
                <Typography sx={{ ml: 2 }}>(Price: {tour.price})</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Броньдар */}
      {bookings && bookings.length > 0 && (
        <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Сіздің броньдарыңыз
            </Typography>
            {bookings.map((booking) => (
              <Typography key={booking.id} sx={{ mt: 1 }}>
                {booking.tour?.name} -{' '}
                {new Date(booking.expires_at).toLocaleDateString()}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Сақталған турлар */}
      {user.favorite_tours && user.favorite_tours.length > 0 && (
        <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Сіздің сақталған турларыңыз
            </Typography>
            {user.favorite_tours.map((favorite) => (
              <Typography
                key={favorite.id}
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {favorite.name || 'No Name'}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}
      {/* Қауіпсіздік параметрлері
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            Security Settings
          </Typography>
          <Button
            component={NavLink}
            to="/change-password"
            startIcon={<LockIcon />}
            variant="outlined"
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Change Password
          </Button>
          <Button
            component={NavLink}
            to="/enable-2fa"
            startIcon={<LockIcon />}
            variant="outlined"
            sx={{ mt: 2, borderRadius: 2, ml: 2 }}
          >
            Enable 2FA
          </Button>
        </CardContent>
      </Card> */}
    </Box>
  )
}

export default UserProfile
