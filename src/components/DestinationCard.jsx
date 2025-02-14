import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Container } from '@mui/material'

const destinations = [
  { title: 'Rome, Italy', image: '/photos/Без названия.jpg' },
  { title: 'Singapore', image: '/photos/Без названия (1).jpg' },
  { title: 'Paris, France', image: '/photos/Без названия (2).jpg' },
  { title: 'Goa, India', image: '/photos/Без названия (3).jpg' },
  { title: 'Whistler, Canada', image: '/photos/Без названия (4).jpg' },
  {
    title: 'Lumpur, Malaysia',
    image: '/photos/how_to_take_great_travel_photos.jpg',
  },
]

const DestinationCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <Container sx={{ paddingBottom: 5 }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Top Destinations</h2>
        <p>
          Planning for a trip? We will organize your trip with the best places
          and within best budget!
        </p>
        <Slider {...settings}>
          {destinations.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '0 15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div style={{ borderRadius: '15px', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '80%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '20px',
                  }}
                />
              </div>
              <h3>{item.title}</h3>
              <p>3 Hotels</p>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  )
}

export default DestinationCard
