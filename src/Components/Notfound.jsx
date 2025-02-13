import React from 'react'
import error from '../assets/finalProject assets/error.svg'

export default function Notfound() {
  return (
    <div className='my-4 text-center'>
        <h2>Not Found</h2>
        <img src={error} alt="" className='m-auto' />
    </div>
  )
}
