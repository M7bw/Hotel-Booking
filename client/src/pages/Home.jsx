import React from 'react'
import Hero from '../Components/Hero.jsx'
import FeaturedDestination from '../Components/FeaturedDestination.jsx'
import ExclusiveOffers from '../Components/ExclusiveOffers.jsx'
import Testimonial from '../Components/Testimonial.jsx'
import NewsLetter from '../Components/NewsLetter.jsx'
import RecommendedHotels from '../Components/RecommendedHotels.jsx'

const Home = () => {
    return (
        <> 
      <Hero />
      <RecommendedHotels />
      <FeaturedDestination />
      <ExclusiveOffers/>
      <Testimonial />
      <NewsLetter />
        </>
    )
}

export default Home