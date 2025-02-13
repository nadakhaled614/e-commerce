import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function ResetCode() {

    let navigate = useNavigate()
    let [loading, setLoading] = useState(false);
    let [msg, setMsg] = useState("");

    async function handleResetCode(values) {
        try {
            setLoading(true)     
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
          
           if (data.status==="Success") {
            setLoading(false)
            setMsg("")
            navigate("/newpassword")
           }
        } catch (error) {
            setMsg(error?.response?.data?.message)
            setLoading(false)
        }
    

    }

    let formik = useFormik({
        initialValues: {
            resetCode: ''
           
        },
        
        onSubmit: handleResetCode
    })



    return (
        <div>
            <h2 className='my-5 text-3xl'>Forget Password:</h2>

            {msg ? <div className="w-1/2 mx-auto p-3 mb-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{msg}</span>
            </div> : ""}

            <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>

                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">resetCode</label>
                </div>

               <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {loading ? <i className='fas fa-spin fa-spinner text-white'></i> : 'Submit'}
                </button>

            </form>


        </div>
    )
}
