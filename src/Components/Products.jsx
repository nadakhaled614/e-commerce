import React, { useEffect, useState } from 'react'
import FeaturedProducts from './FeaturedProducts';
import { getCategories } from '../APIS/getCategories';
import { getProductsWithCategories } from '../APIS/getProducts';

export default function Products() {

  let [arr,setArr] = useState([])
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

  async function getData(id) {
   let data =await getProductsWithCategories(id)
   setArr(data?.data);
  }
  return (
    <div className='flex flex-col items-center'>
    <div className='w-full flex justify-center'>
      <ul className='py-4 flex flex-wrap justify-center gap-2'>
        {categoriesArr?.map(ele => <li onClick={()=>getData(ele?._id)} className='cursor-pointer hover:text-green-700 py-4 px-2 text-center '>{ele?.name}</li>)}

      </ul></div>
      <div className="w-full flex justify-center mt-2">
      <FeaturedProducts arr={arr} ></FeaturedProducts></div>
    
    </div>
  )
}
