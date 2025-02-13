import React, { useContext, useState } from 'react'
import logo from '../assets/finalProject assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../Context/AuthContext'
import useQueryCart from '../Hooks/useQueryCart'
import addToCartApi, { getCartApi } from './../APIS/cartApi';

export default function Navbar() {

  let { data: datanums, isLoading, isError, error } = useQueryCart("getCart", getCartApi);

  let { data } = useQueryCart('cart', addToCartApi)


  let navigate = useNavigate()


  let { isLogin, setLogin } = useContext(auth)


  let [open, setOpen] = useState(false)

  function toggle() {
    setOpen(!open)
  }

  function logout() {
    localStorage.removeItem("userToken")
    setLogin(null)
    navigate('/login')

  }


  return (

    <nav className=' py-4 bg-[#f0f3f2]  '>
      <div className="m-auto relative  justify-between items-center  px-[60px] md:flex">
        <div className=' gap-6 md:flex md:gap-3'>
          <Link to={'/'}><img src={logo} width={130} alt="" /></Link>


          {isLogin ? <ul className={`md:flex gap-8 ${open ? "block" : "hidden"} `}>
            <li>
              <NavLink className='text-black font-bold p-4' to={'/'}>Home</NavLink>
            </li>

            <li>
              <NavLink className='text-black font-bold p-4' to={'/brand'}>Brand</NavLink>
            </li>
            <li>
              <NavLink className='text-black font-bold p-4' to={'/products'}>Products</NavLink>
            </li>
          </ul> : ""}

        </div>

        <div>
          <ul className={`md:flex gap-6 justify-center items-center ${open ? "block" : "hidden"}`} >

            {isLogin ? <>
              <li className='relative  pt-3  md:pt0 '>
                <Link to={'/cart'}>
                  Cart <i className='  fas fa-cart-shopping text-black '></i>           
                </Link>
              </li>
              
              <li onClick={logout} className='cursor-pointer'>  

                <b>LogOut</b> </li> </> : <><li > <NavLink className='text-black' to={'/login'}>Login</NavLink> </li>
              <li> <NavLink className='text-black' to={'/register'}>Register</NavLink> </li>
              <li className='flex gap-3'>
                <a href=""><i className='    fab text-black fa-facebook-f'></i></a>
                <a href=""><i className='fab   text-black fa-twitter'></i></a>
                <a href=""><i className='fab  text-black fa-google'></i></a>
                <a href=""><i className='fab  text-black fa-instagram'></i></a>

              </li></>}


          </ul>
        </div>

        <i onClick={toggle} className={` md:hidden block fas ${!open ? "fa-bars" : "fa-close"} fa-2x absolute top-0 right-2 cursor-pointer`}></i>

      </div>
    </nav>

  )

}

