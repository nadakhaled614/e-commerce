import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMuationCart from '../Hooks/useMuationCart';
import addToCartApi from '../APIS/cartApi';
import { toast } from 'react-toastify';

export default function Item({ ele }) {
    const [isClicked, setIsClicked] = useState(false);
    let { mutate: addMutate, status, data } = useMuationCart(addToCartApi);

    if (status === 'success') {
        toast.success(data?.data?.message);
    }

    const handleHeartClick = () => {
        addMutate(ele._id);
        setIsClicked(!isClicked);
    };

    return (
        <div className='md:w-1/6 sm:w-1/2'>
            <div className='product p-5 cursor-pointer'>
                <Link to={`/productdetails/${ele?._id}/${ele?.category?._id}`}>
                    <img src={ele?.imageCover} alt={ele?.title || "Product Image"} className='w-full' />
                    <p className='text-green-700'>{ele?.category?.name}</p> 
                    <p className='line-clamp-1'>{ele?.title}</p>
                    <div className='flex justify-between'>
                        <p>{ele?.price} EGP</p>
                        <p><i className='fas fa-star text-yellow-500'></i> {ele?.ratingsAverage}</p>
                    </div>
                </Link>
                <button onClick={() => addMutate(ele._id)} className='bg-green-700 p-2 rounded text-white btn'>
                    Add to cart
                </button>
                <div className="flex justify-end">
                    <i
                        onClick={handleHeartClick}
                        className={`fas fa-heart text-2xl cursor-pointer transition-colors duration-200 ${
                            isClicked ? 'text-red-500' : 'text-gray-500'
                        }`}
                    ></i>
                </div>
            </div>
        </div>
    );
}