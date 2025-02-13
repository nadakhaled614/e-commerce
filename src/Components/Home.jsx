import React, { useContext } from 'react'
import { counter } from '../Context/CounterContext'
import FeaturedProducts from './FeaturedProducts'
import Categories from './Categories'
import MainSlider from './MainSlider'

export default function Home() {

 

  return (
    <div>
      <MainSlider></MainSlider>
      <Categories></Categories>
      <FeaturedProducts></FeaturedProducts>
      </div>
  )
}
