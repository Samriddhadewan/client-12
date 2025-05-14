import React from 'react'
import Slider from '../../Components/Slider/Slider'
import TopCamps from '../../Components/TopCamps/TopCamps'
import Reviews from '../../Components/Reviews/Reviews'
import UpcomingCamps from '../UpcommingCamps/UpcommingCamps'

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <div className='max-w-[1240px] mx-auto'>
        <TopCamps></TopCamps>
        <Reviews></Reviews>
        <UpcomingCamps></UpcomingCamps>
      </div>
    </div>
  )
}

export default Home