import React from 'react'
import useQueryCart from '../Hooks/useQueryCart'
import { clearCartApi, deleteCartApi, getCartApi, updateCartApi } from '../APIS/cartApi'
import Loading from './Loading'
import useMuationCart from '../Hooks/useMuationCart'
import cartImage from '../assets/11329060.png'
import BasicModal from './BasicModal'

export default function Cart() {

  let { isError, isLoading, error, data } = useQueryCart("getcart", getCartApi)
  let { mutate: delMutate, isPending: delpending } = useMuationCart(deleteCartApi)
  let { mutate: updMutate, isPending: uppending } = useMuationCart(updateCartApi)
  let { mutate: clearMutate, status: y, isPending: clearpending } = useMuationCart(clearCartApi)

  if (isLoading || delpending || uppending || clearpending)
    return <Loading></Loading>

  if (y === "success")
    console.log("done")


  if (isError)
    return <img className='m-auto' src={cartImage} alt="" />



  return (
    <>

      {data?.numOfCartItems ? <div className="  shadow-md sm:rounded-lg my-4">
        <button className='bg-red-700 text-white my-3 p-4' onClick={() => { clearMutate() }}>Clear</button>
        <div className='md:flex md:justify-between'>
          <h1 className='md:text-2xl text-xl my-3 font-medium'>Cart Items: <span className='text-green-700'>{data?.numOfCartItems}</span> </h1>
          <h1 className='md:text-2xl text-xl my-3 font-medium'>Total Price: <span className='text-green-700'>{data?.data?.totalCartPrice}</span> </h1>
        </div>

        <div className=" relative overflow-x-auto shadow-md sm:rounded-lg my-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action <i className='fa-trash fas text-red-700'></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.products.map((ele) => <tr key={ele?.product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={ele?.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele?.product?.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button onClick={() => {
                    ele?.count == 1 ? delMutate(ele?.product?._id) : updMutate({ id: ele?.product?._id, count: ele?.count ? ele?.count - 1 : ele?.count })
                  }}
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <span>{ele?.count}</span>
                  <button onClick={() => { updMutate({ id: ele?.product?._id, count: ele?.count + 1 }) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele?.price} EGP
              </td>
              <td className="px-6 py-4">
                <button onClick={() => { delMutate(ele?.product?._id) }} href="#" className="font-medium text-red-600 bg-white hover:bg-red-700 hover:text-white transition-all">Remove</button>
              </td>
            </tr>)}
          </tbody>
        </table>
        </div>
      </div> : <img className='m-auto' src={cartImage} alt="" />}

<BasicModal cartId={data?.data?._id}/>

    </>
  )
}