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
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LockIcon from '@mui/icons-material/Lock'
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

  {
    user && user.tours && user.tours.length > 0 && (
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Your Tours
          </Typography>
          {user.tours.map((tour) => (
            <Box
              key={tour.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                borderBottom: '1px solid #eee',
                pb: 1,
              }}
            >
              <Link
                to={`/tour/${tour.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  sx={{ cursor: 'pointer' }}
                >
                  {tour.name}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                (Price: {tour.price})
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    )
  }

  {
    bookings && bookings.length > 0 && (
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Your Bookings
          </Typography>
          {bookings.map((booking) => (
            <Typography
              key={booking.id}
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {booking.tour?.name || 'Tour Name Not Available'} -{' '}
              {new Date(booking.booking_date).toLocaleDateString()}
            </Typography>
          ))}
        </CardContent>
      </Card>
    )
  }

  const fetchUserReviews = async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        console.error('Authentication token not found.')
        return
      }
      const response = await api.get('/user/reviews', {
        // Бекендтегі эндпоинтке сұрау
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
        console.log('User Data:', userResponse.data) // Қосылған консольге шығару
        setUser(userResponse.data)
        const bookingsResponse = await api.get('/bookings/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setBookings(bookingsResponse.data)
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
        // Бекендтегі жою эндпоинтіне сұрау
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
            to="/edit-profile"
            startIcon={<EditIcon />}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Edit Profile
          </Button>
          <Button
            component={NavLink}
            to="/blog-create" // Жаңа пост құру бетінің маршруты
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            Create Post
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
              Your Posts
            </Typography>
            {user.posts.map((post) => (
              <Typography
                key={post.id}
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {post.title || 'No Title'}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}
      {/* Пікірлер */}
      {userReviews.length > 0 && (
        <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Your Reviews
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
                  {review.content} (Rating: {review.rating})
                </Typography>
                <IconButton
                  onClick={() => handleDeleteReview(review.id)}
                  disabled={deleteLoading === review.id}
                  aria-label="delete"
                  color="error"
                >
                  {deleteLoading === review.id ? (
                    <Typography variant="caption">Deleting...</Typography>
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
      {user.tours &&
        user.tours.map((tour) => (
          <Box
            key={tour.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              borderBottom: '1px solid #eee',
              pb: 1,
            }}
          >
            <Link
              to={`/tour/${tour.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={500}
                sx={{ cursor: 'pointer' }}
              >
                {tour.name}
              </Typography>
            </Link>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              (Price: {tour.price})
            </Typography>
            {/* Қосымша элементтер */}
          </Box>
        ))}
      {/* Броньдар */}
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Your Bookings
          </Typography>
          {bookings.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No bookings available.
            </Typography>
          ) : (
            bookings.map((booking) => (
              <Box
                key={booking.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  borderBottom: '1px solid #eee',
                  pb: 1,
                }}
              >
                {/* Тур аты */}
                <Link
                  to={`/tour/${booking.tour.id}`} // Тур бетіне өту
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    sx={{ cursor: 'pointer' }}
                  >
                    {booking.tour.name || 'No Name'}
                  </Typography>
                </Link>
                {/* Тур бағасы */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  Price: {booking.tour.price || 'N/A'}
                </Typography>
                {/* Бронь күні */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  Booking Date:{' '}
                  {new Date(booking.booking_date).toLocaleDateString()}
                </Typography>
              </Box>
            ))
          )}
        </CardContent>
      </Card>

      {/* Сақталған турлар */}
      {user.favorite_tours && user.favorite_tours.length > 0 && (
        <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Favorite Tours
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
      {/* Қауіпсіздік параметрлері */}
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
      </Card>
    </Box>
  )
}

export default UserProfile
