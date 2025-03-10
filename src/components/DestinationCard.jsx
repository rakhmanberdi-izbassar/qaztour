import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container, Typography, Box } from '@mui/material';
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '70px', 
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: '40px' } },
      { breakpoint: 768, settings: { slidesToShow: 2, centerPadding: '20px' } },
      { breakpoint: 480, settings: { slidesToShow: 1, centerPadding: '10px' } },
    ],
  };

  return (
    <Container sx={{ paddingBottom: 5, paddingTop: 5, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        🌍 Top Destinations
      </Typography>
      <Typography variant="body1" sx={{ color: 'gray', mb: 4 }}>
        Planning for a trip? We will organize your trip with the best places and within best budget!
      </Typography>
      <Slider {...settings}>
        {destinations.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{ padding: '15px', textAlign: 'center' }} // Слайдтар арасына кеңістік қосылды
          >
            <Box
              sx={{
                overflow: 'hidden',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transition: '0.3s',
                '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.3)' },
                margin: '0 10px', // Қосымша шеттерге бос орын қосылды
              }}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '220px', objectFit: 'cover' }} // Биіктігі ұлғайтылды
                whileHover={{ scale: 1.1 }} // Сурет шекарасынан аспай үлкейеді
                transition={{ duration: 0.3 }}
              />
            </Box>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', marginTop: '5px' }}>
              3 Hotels
            </Typography>
          </motion.div>
        ))}
      </Slider>
    </Container>
  );
};

export default DestinationCard;
