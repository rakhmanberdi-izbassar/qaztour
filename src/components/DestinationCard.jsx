import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const destinations = [
  { title: 'Rome, Italy', image: '/photos/Без названия.jpg' },
  { title: 'Singapore', image: '/photos/Без названия (1).jpg' },
  { title: 'Paris, France', image: '/photos/Без названия (2).jpg' },
  { title: 'Goa, India', image: '/photos/Без названия (3).jpg' },
  { title: 'Whistler, Canada', image: '/photos/Без названия (4).jpg' },
  { title: 'Lumpur, Malaysia', image: '/photos/how_to_take_great_travel_photos.jpg' },
];

const DestinationCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: isMobile ? '10px' : isTablet ? '20px' : '70px',
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
          centerPadding: '70px',
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px',
        },
      },
    ],
  };

  return (
    <Container sx={{ paddingBottom: 5, paddingTop: 5, textAlign: 'center' }}>
      <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 2 }}>
        🌍 Үздік бағыттар
      </Typography>
      <Typography variant="body1" sx={{ color: 'gray', mb: 4, fontSize: isMobile ? '0.9rem' : '1rem' }}>
        Planning for a trip? We will organize your trip with the best places and within best budget!
      </Typography>
      <Slider {...settings}>
        {destinations.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{ padding: '15px', textAlign: 'center' }} // Слайдтар арасына кеңістік
          >
            <Box
              sx={{
                overflow: 'hidden',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transition: '0.3s',
                '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.3)' },
                margin: '0 10px', // Қосымша шеткі бос орын
              }}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: isMobile ? '180px' : '220px', objectFit: 'cover' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Box>
            <Typography variant={isMobile ? 'h6' : 'h6'} sx={{ mt: 2, fontWeight: 'bold', fontSize: isMobile ? '1rem' : '1.1rem' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', marginTop: '5px', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
              3 Hotels
            </Typography>
          </motion.div>
        ))}
      </Slider>
    </Container>
  );
};

export default DestinationCard;