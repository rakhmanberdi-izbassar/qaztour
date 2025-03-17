import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LockIcon from '@mui/icons-material/Lock'
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, mt: 14 }}>
      {/* Профиль картасы */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 3, textAlign: 'center' }}>
        <Avatar src="https://via.placeholder.com/150" sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }} />
        <Typography variant="h5" fontWeight={600}>John Doe</Typography>
        <Typography variant="body2" color="text.secondary">Travel Enthusiast | Blogger</Typography>
        <Button component={NavLink} to="/edit-profile" startIcon={<EditIcon />} variant="outlined" sx={{ mt: 2, borderRadius: 2 }}>Edit Profile</Button>
        {/* Әлеуметтік желі иконкалары */}
        <Box sx={{ mt: 2 }}>
          <IconButton><FacebookIcon color="primary" /></IconButton>
          <IconButton><InstagramIcon color="secondary" /></IconButton>
          <IconButton><TwitterIcon color="primary" /></IconButton>
        </Box>
      </Card>

      {/* Статистика */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={4}>
          <Card sx={{ textAlign: 'center', padding: 2, boxShadow: 1 }}>
            <Typography variant="h6">25</Typography>
            <Typography variant="body2" color="text.secondary">Trips Taken</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ textAlign: 'center', padding: 2, boxShadow: 1 }}>
            <Typography variant="h6">12</Typography>
            <Typography variant="body2" color="text.secondary">Reviews Written</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ textAlign: 'center', padding: 2, boxShadow: 1 }}>
            <Typography variant="h6">5</Typography>
            <Typography variant="body2" color="text.secondary">Bookings Pending</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Броньдалған сапарлар */}
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>Your Bookings</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>1. Paris Getaway - 12th April 2025</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>2. Bali Adventure - 5th May 2025</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>3. Tokyo Culture Tour - 20th June 2025</Typography>
        </CardContent>
      </Card>

      {/* Қолданушының шолулары */}
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>Your Reviews</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>"Amazing trip to Paris! Highly recommend." ⭐⭐⭐⭐⭐</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>"Bali was breathtaking. Will visit again!" ⭐⭐⭐⭐</Typography>
        </CardContent>
      </Card>

      {/* Қауіпсіздік параметрлері */}
      <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>Security Settings</Typography>
          <Button startIcon={<LockIcon />} variant="outlined" sx={{ mt: 2, borderRadius: 2 }}>Change Password</Button>
          <Button startIcon={<LockIcon />} variant="outlined" sx={{ mt: 2, borderRadius: 2, ml: 2 }}>Enable 2FA</Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default UserProfile