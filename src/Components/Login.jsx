import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Register from './Register';
import { jwtDecode } from 'jwt-decode';
import { auth } from '../Context/AuthContext';


export default function Login() {

  let navigate = useNavigate()
  let {setLogin} = useContext(auth)
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  function handleLogin(values) {
    setLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then(({ data }) => {
        if (data.message === "success") {
          setMsg("")
          setLoading(false)
          localStorage.setItem("userToken", data.token)
          setLogin(jwtDecode(data.token))
          navigate('/')
        }

      })
      .catch((err) => { setMsg(err?.response?.data?.message); setLoading(false) })

  }

  let validationSchema = Yup.object({
    email: Yup.string().email().required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must contain capital & small letters & numbers").required("password is required"),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  })



  return (
    <div>
      <h2 className='my-5 text-3xl'>Login Now:</h2>

      {msg ? <div className="w-1/2 mx-auto p-3 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{msg}</span>
      </div> : ""}

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>

        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>

        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div> : ""}

        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>

        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.password}</span>
        </div> : ""}


        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {loading ? <i className='fas fa-spin fa-spinner text-white'></i> : 'Login'}
        </button>

       <p className='mt-6'>dont have an account ? <Link to={"/register"}>Register</Link></p>

       <p className='mt-2'>do you <Link to={"/forget"}>Forget Password</Link> ?</p>

      </form>


    </div>
  )
}
