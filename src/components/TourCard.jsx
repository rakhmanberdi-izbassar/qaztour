import * as React from 'react'
import { Container, Box } from '@mui/material'
import Grid from '@mui/joy/Grid'
import AspectRatio from '@mui/joy/AspectRatio'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function TourCard() {
  return (
    <Box sx={{ position: 'relative', background: 'aliceblue' }}>
      <Container sx={{ pb: 8, pt: 10 }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#002569' }}>
            Турлар топтамасы
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Саяхаттауды жоспарлап жатырсыз ба? Біз сіздің сапарыңызды ең үздік
            бағыттармен және тиімді бюджетпен ұйымдастырамыз!
          </Typography>
        </div>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  border: 'none',
                  boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
                  borderRadius: 15,
                  maxWidth: 350,
                  mx: 'auto',
                  p: 2,
                  backgroundColor: 'white',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <div>
                  <Typography variant="h6" fontWeight="bold" color="#002569">
                    Йосемити ұлттық паркі
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    24 сәуір - 2 мамыр, 2021 ж.
                  </Typography>
                  <IconButton
                    aria-label="Йосемити паркін таңдаулыға қосу"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{
                      position: 'absolute',
                      top: '0.875rem',
                      right: '0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '50%',
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </div>
                <AspectRatio minHeight="150px" maxHeight="250px" ratio="16/9">
                  <img
                    src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=400"
                    alt="Йосемити ұлттық паркі"
                    style={{ borderRadius: '10px' }}
                  />
                </AspectRatio>
                <CardContent orientation="horizontal">
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      Жалпы баға:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 'lg',
                        fontWeight: 'lg',
                        color: '#ff9800',
                      }}
                    >
                      $2,900
                    </Typography>
                  </div>
                  <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Йосемити паркіне бару"
                    sx={{
                      ml: 'auto',
                      alignSelf: 'center',
                      fontWeight: 600,
                      backgroundColor: '#002569',
                      '&:hover': {
                        backgroundColor: '#001e50',
                      },
                    }}
                  >
                    Қарау
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          position: 'absolute',
          top: 860,
          left: 0,
          width: '100%',
          height: '120px',
          marginTop: '-1px',
        }}
      >
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: '#0093E9', stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#80D0C7', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M-2.54,95.23 C222.63,199.84 369.35,37.02 501.97,99.19 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: 'none', fill: 'url(#waveGradient)' }}
          />
        </svg>
      </Box>
    </Box>
  )
}
