import React, { useState } from 'react'
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
  Typography
} from '@mui/material'
import FormLabel from '@mui/joy/FormLabel'
import tourImg from './../assets/photos/5ftsj0mn7lkw08ws40k4w4wss.jpg'
import { useNavigate } from 'react-router-dom'
import itemData from './../data_example'

const minDistance = 10

function ToursList() {
  const navigate = useNavigate()
  const [value2, setValue2] = useState([20, 37])

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance)
        setValue2([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setValue2([clamped - minDistance, clamped])
      }
    } else {
      setValue2(newValue)
    }
  }

  return (
    <>
      <div style={{ paddingBottom: '30px' }}>
        <img style={{ width: '100%', borderRadius: '10px' }} src={tourImg} alt="For back" />
      </div>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ position: 'sticky', top: 80, height: '100vh', overflowY: 'auto' }}>
              <Card sx={{ boxShadow: '0 6px 10px rgba(0,0,0,0.2)', padding: 2, borderRadius: '15px' }}>
                <CardContent>
                  <FormLabel>Price Filter</FormLabel>
                  <Box sx={{ width: '100%' }}>
                    <Slider
                      value={value2}
                      onChange={handleChange2}
                      valueLabelDisplay="auto"
                      disableSwap
                    />
                  </Box>
                  <FormLabel>Reviews</FormLabel>
                  <Stack spacing={1}>
                    {[5, 4, 3, 2, 1].map((star) => (
                      <Rating key={star} name="rating" defaultValue={star} />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
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
                      <img
                        src={item.img}
                        alt={item.title}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </ImageListItem>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#002569' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.Description}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 'bold', mt: 1 }}>
                          ${item.price}
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            background: 'linear-gradient(135deg, #002569, #0051a3)',
                            color: 'white',
                            fontWeight: 'bold',
                            mt: 2,
                            padding: '10px 15px',
                            borderRadius: '8px',
                            '&:hover': { background: '#001e50' },
                          }}
                        >
                          Explore Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default ToursList