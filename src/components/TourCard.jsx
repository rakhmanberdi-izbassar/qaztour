import * as React from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/joy/Grid';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function TourCard() {
  return (
    <Container sx={{ pb: 8, pt: 5, background: 'linear-gradient(to bottom, aliceblue, aliceblue)' }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#002569' }}>
          Tours Packages
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Planning for a trip? We will organize your trip with the best places and within the best budget!
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
                  Yosemite National Park
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  April 24 to May 02, 2021
                </Typography>
                <IconButton
                  aria-label="Bookmark Yosemite Park"
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
                  alt="Yosemite National Park"
                  style={{ borderRadius: '10px' }}
                />
              </AspectRatio>
              <CardContent orientation="horizontal">
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Total price:
                  </Typography>
                  <Typography sx={{ fontSize: 'lg', fontWeight: 'lg', color: '#ff9800' }}>
                    $2,900
                  </Typography>
                </div>
                <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Explore Yosemite Park"
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
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}