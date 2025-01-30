import React from 'react'
import Header from '../components/Header'
import SlideShow from '../components/SlideShow'
import DestinationCard from '../components/DestinationCard'
import TourCard from '../components/TourCard'



function HomePage() {
  return (
    <>
      <Header />
      <SlideShow />
     <DestinationCard />
     <TourCard/>
    </>
  )
}

export default HomePage
