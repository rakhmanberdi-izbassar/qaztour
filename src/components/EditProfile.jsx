import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const EditProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('+123456789');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150');

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Profile Updated:', { name, email, phone, password, avatar });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, mt: 14 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
            Edit Profile
          </Typography>
          <Box textAlign="center" position="relative">
            <Avatar src={avatar} sx={{ width: 100, height: 100, margin: 'auto' }} />
            <input
              accept="image/*"
              type="file"
              id="avatar-upload"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton component="span" sx={{ position: 'absolute', bottom: 0, right: '40%', bgcolor: 'white' }}>
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, borderRadius: 2 }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;