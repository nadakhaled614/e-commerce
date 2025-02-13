import React from 'react'

import img3 from "../assets/finalProject assets/images/slider-image-1.jpeg"
import img1 from "../assets/finalProject assets/images/slider-image-2.jpeg"
import img2 from "../assets/finalProject assets/images/slider-image-3.jpeg"
import img4 from "../assets/finalProject assets/images/grocery-banner-2.jpeg"
import Slider from 'react-slick'


export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1500,
        arrows:false,
      };

  return (
    <div className='row my-5'>
        <div className='w-2/3 '>
           <Slider {...settings}>
           <img src={img1} alt="" className='w-full h-[400px]'/>
            <img src={img2} alt="" className='w-full h-[400px]'/>
           </Slider>
        </div>
        <div className='w-1/3'>
            <img src={img4} alt="" className='w-full h-[200px]'/>
            <img src={img3} alt="" className='w-full h-[200px]'/>
        </div>
    </div>
  )
}
