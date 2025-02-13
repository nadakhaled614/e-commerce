import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import React from 'react'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import Products from './Components/Products'
import Cart from './Components/Cart'
import Categories from './Components/Categories'
import Layout from './Components/Layout'
import Brand from './Components/Brand'
import Notfound from './Components/Notfound'
import ProtectedRoute from './Components/ProtectedRoute'
import Forget from './Components/Forget'
import ResetCode from './Components/ResetCode'
import NewPassword from './Components/NewPassword'
import ProductsDetails from './Components/ProductsDetails'

export default function App() {

  let routes = createBrowserRouter([
    {
      path:'/',element:<Layout></Layout>, children:[
        {index:true,element:<ProtectedRoute> <Home></Home> </ProtectedRoute>},
        {path:'/login',element:<Login></Login>},
        {path:'/allorders',element:<Home></Home>},
        {path:'/register',element:<Register></Register>},
        {path:'/forget',element:<Forget></Forget>},
        {path:'/reset',element:<ResetCode></ResetCode>},
        {path:'/newpassword',element:<NewPassword></NewPassword>},
        {path:'/products',element:<ProtectedRoute><Products></Products></ProtectedRoute>},
        {path:'/cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
        {path:'/brand',element:<ProtectedRoute><Brand></Brand></ProtectedRoute>},
        {path:'/productdetails/:id/:categoryId',element:<ProtectedRoute><ProductsDetails></ProductsDetails></ProtectedRoute>},
        {path:'*',element:<Notfound></Notfound>}, 


      ]
    }
   ])



  return (
    <RouterProvider router = {routes}></RouterProvider>
  )
}

