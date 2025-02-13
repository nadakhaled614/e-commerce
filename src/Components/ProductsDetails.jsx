import React, { useEffect, useState } from 'react'
import { getSpecificProduct } from '../APIS/getspecificproducts'
import { useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { getProductsWithCategories } from '../APIS/getProducts';
import Item from './Item';
import Loading from './Loading';
import useMuationCart from '../Hooks/useMuationCart';
import { toast } from 'react-toastify';
import addToCartApi from '../APIS/cartApi';

export default function ProductsDetails() {

    let [imgSrc, setImgSrc] = useState('')
    let { id, categoryId } = useParams()
    let [relatedProducts, setRelatedProducts] = useState([])
    let [product, setProduct] = useState([])
    let [loading, setLoading] = useState(false)
    let [msg, setMsg] = useState("")

    async function getSpecificProductApi() {
        setLoading(true)
        let data = await getSpecificProduct(id)
        if (data?.data) {
            setProduct(data?.data)
            setMsg("")
            setLoading(false)
        }
        else {
            setMsg(data)
            setLoading(false)
        }

    }

    let { mutate:addMutate, status ,data} = useMuationCart(addToCartApi)
    if (status === 'success')
        console.log("addedddd")
         toast.success(data?.data?.message)


    async function getProductsWithCategoriesApi() {
        setLoading(true)
        let data = await getProductsWithCategories(categoryId)
        if (data?.data) {
            setRelatedProducts(data?.data)
            setMsg("")
            setLoading(false)
        }
        else {
            setMsg(data)
            setLoading(false)
        }

    }

    

    function changeSrc(e) {
        setImgSrc(e.target.src)
    }

    useEffect(() => {
        getProductsWithCategoriesApi()
    }, [])

    useEffect(() => {
        getSpecificProductApi()
        setImgSrc("")
    }, [id])


    if (loading) {
        return <Loading></Loading>
    }

    if (msg) {
        return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>
    }


    return (
        <>
            <div className='row items-center flex-wrap'>
                <div className='sm:w-1/3'>
                    <img src={imgSrc ? imgSrc : product?.imageCover} className='w-full' alt="" />
                    <ul className='flex justify-center gap-2 overflow-hidden'>
                        {product?.images?.map(img => <li><motion.img whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} key={img} onClick={changeSrc} src={img} className='cursor-pointer w-[100px] mt-2' alt="" /> </li>)}
                    </ul>
                </div>
                <div className='sm:w-2/3 text-xl'>
                    <p className='text-green-700 my-1'>{product?.category?.name}</p>
                    <p className='line-clamp-1 my-1'>{product?.title}</p>
                    <p className='my-1 font-thin'>{product?.description}</p>
                    <div className='flex justify-between my-1'>
                        <p>{product?.price} EGP</p>
                        <p><i className='fas fa-star text-yellow-500'></i> {product?.ratingsAverage}</p>

                    </div>
                    <button onClick={()=>{addMutate(product?._id)}} className='bg-green-700 p-2 rounded text-white w-full my-3 btn'> Add to cart</button>
                </div>

            </div>
            <h2 className='text-green-700 text-3xl my-4'>Related Products:</h2>
            <div className='row'>
                {relatedProducts?.map(prod=> <Item ele={prod} key={prod._id}></Item>)}

            </div>
        </>
    )
}
