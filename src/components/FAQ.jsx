import React from 'react';
import { Container, Box, Paper, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import myImage from './../assets/photos/traveller-bag-mountains-isolation-1151553.jpg';

const Item = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(3),
  textAlign: 'left',
  backgroundColor: '#f9f9f9',
  boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
}));

const FAQ = () => {
  const questions = [
    { q: 'What is this service about?', a: 'We provide the best travel recommendations and booking services.' },
    { q: 'How can I get started?', a: 'Just sign up, choose your destination, and book your trip easily.' },
    { q: 'Is there a refund policy?', a: 'Yes, we offer refunds within 7 days of booking under certain conditions.' },
    { q: 'Can I use this internationally?', a: 'Absolutely! Our services are available worldwide.' },
    { q: 'What are the payment methods?', a: 'We accept credit/debit cards, PayPal, and Apple Pay.' },
  ];

  return (
    <>
    <Box
        sx={{
          position: 'absolute',
          top: 2900,
          left: 0,
          width: '100%',
          height: '100px',
          overflow: 'hidden',
        }}
      >
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 1440 390"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0,400 L 0,150 C 92.56666666666666,144.3846153846154 185.13333333333333,138.76923076923077 257,157 C 328.8666666666667,175.23076923076923 380.0333333333333,217.3076923076923 457,204 C 533.9666666666667,190.6923076923077 636.7333333333335,122.00000000000001 733,113 C 829.2666666666665,103.99999999999999 919.0333333333333,154.69230769230768 995,178 C 1070.9666666666667,201.30769230769232 1133.1333333333332,197.23076923076925 1205,188 C 1276.8666666666668,178.76923076923075 1358.4333333333334,164.38461538461536 1440,150 L 1440,400 L 0,400 Z"
            fill="aliceblue"
          />
        </svg>
      </Box>
    <Container sx={{ paddingY: 8 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Frequently Asked Questions
      </Typography>

      <Grid container spacing={4} alignItems="center">
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <img
            src={myImage}
            alt="FAQ"
            style={{
              width: '100%',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0px 6px 15px rgba(0,0,0,0.15)',
            }}
          />
        </Grid>

        {/* Accordion Section */}
        <Grid item xs={12} md={6}>
          <Item>
            <AccordionGroup variant="outlined" sx={{ borderRadius: '10px' }}>
              {questions.map((item, index) => (
                <Accordion key={index} variant="soft" sx={{ marginBottom: 1, borderRadius: '8px' }}>
                  <AccordionSummary>{item.q}</AccordionSummary>
                  <AccordionDetails>{item.a}</AccordionDetails>
                </Accordion>
              ))}
            </AccordionGroup>
          </Item>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default FAQ;