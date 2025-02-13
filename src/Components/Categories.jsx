import React, { useEffect, useState } from 'react'
import { getCategories } from '../APIS/getCategories'
import Slider from 'react-slick';

export default function Categories() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    autoplay:true,
    autoplaySpeed:1500,
  };
  
  let [categoriesArr, setcategoriesArr] = useState([])
  let [loading, setLoading] = useState(false)
  let [msg, setMsg] = useState("")

  async function getCategoriesApi() {
      setLoading(true)
      let data = await getCategories()
      if (data?.data) {
          setcategoriesArr(data?.data)
          setMsg("")
          setLoading(false)
      }
      else {
          setMsg(data)
          setLoading(false)
      }

  }

  useEffect(()=>{
    getCategoriesApi()
  },[])

  useEffect(()=>{
    console.log(categoriesArr);
    
  },[categoriesArr])


  return (
    <div>
      <Slider {...settings} className='my-8 hidden md:block'>
        {categoriesArr.map(ele=> <img className='h-[150px] ' style={{objectFit:"cover"}} key={ele?._id} src={ele?.image}></img>)}
      </Slider>
    </div>
  )
}
