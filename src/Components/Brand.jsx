import React, { useContext } from 'react'
import { counter } from '../Context/CounterContext'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loading from './Loading'

export default function Brand() {

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let {isError,error,isLoading,data } = useQuery({queryKey:["Brands"],queryFn:getBrands})

  if(isLoading)
    return <Loading></Loading>

  if(isError)
    return <h2 className='text-red-700 my-2 fa-2xl'>{error.message}</h2>

  return (
    <div className='row'>
      {data?.data?.data?.map(ele => <div key={ele?._id} className='w-1/4'> 
      <div className='p-4'>
        <img src={ele?.image} alt="" />
        <p className='text-center'>{ele?.name}</p>
      </div>
      </div>)}
      

      

    </div>
  )
}
