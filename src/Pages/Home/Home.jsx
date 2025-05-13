import React from 'react'
import Slider from '../../Components/Slider/Slider'
import TopCamps from '../../Components/TopCamps/TopCamps'
import Reviews from '../../Components/Reviews/Reviews'

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <div className='max-w-[1240px] mx-auto'>
        <TopCamps></TopCamps>
        <Reviews></Reviews>
      </div>
    </div>
  )
}

export default Home