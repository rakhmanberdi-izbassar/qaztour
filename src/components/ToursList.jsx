import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Slider,
  ImageListItem,
  Rating,
  Stack,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import itemData from './../data_example';
import tourImg from './../assets/photos/5ftsj0mn7lkw08ws40k4w4wss.jpg';

const minDistance = 10;

function ToursList() {
  const navigate = useNavigate();
  const [value2, setValue2] = useState([20, 37]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  return (
    <>
    <div style={{ paddingBottom: '30px' }}>
        <img style={{ width: '100%', borderRadius: '10px' }} src={tourImg} alt="For back" />
      </div>
    <Container>
      {/* Filters */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} sx={{ position: 'sticky', top: 80, height: '100vh', overflowY: 'auto' }}>
          <Card sx={{ boxShadow: '0 6px 10px rgba(0,0,0,0.2)', padding: 2, borderRadius: '15px' }}>
            <CardContent>
              <TextField
                fullWidth
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <MenuItem value="mountain">Mountain</MenuItem>
                  <MenuItem value="beach">Beach</MenuItem>
                  <MenuItem value="cultural">Cultural</MenuItem>
                  <MenuItem value="extreme">Extreme</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Duration</InputLabel>
                <Select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
                  <MenuItem value="1-3">1-3 days</MenuItem>
                  <MenuItem value="4-7">4-7 days</MenuItem>
                  <MenuItem value="7+">7+ days</MenuItem>
                </Select>
              </FormControl>
              <Typography gutterBottom>Price Filter</Typography>
              <Slider value={value2} onChange={handleChange2} valueLabelDisplay="auto" disableSwap />
              <Typography gutterBottom>Reviews</Typography>
              <Stack spacing={1}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <Rating key={star} name="rating" defaultValue={star} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Tours List */}
        <Grid item xs={12} md={9} container spacing={3}>
          {itemData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                  },
                }}
                onClick={() => navigate(`/tour/${item.id}`)}
              >
                <ImageListItem>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                </ImageListItem>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.Description}</Typography>
                  <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 'bold', mt: 1 }}>
                    ${item.price}
                  </Typography>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }}>Explore Now</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Interactive Map */}
      <Box sx={{ height: 400, width: '100%', mt: 5 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={{ lat: 43.238949, lng: 76.889709 }}
          defaultZoom={10}
        />
      </Box>
    </Container>
    </>
  );
}

export default ToursList;
