import React from 'react'
import Header from '../components/Header'
import SlideShow from '../components/SlideShow'
import DestinationCard from '../components/DestinationCard'
import TourCard from '../components/TourCard'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'



function HomePage() {
  return (
    <>
      <Header />
      <SlideShow />
     <DestinationCard />
     <TourCard/>
     <FAQ/>
     <Footer/>
    </>
  )
}

export default HomePage
