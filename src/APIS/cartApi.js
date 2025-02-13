import axios from 'axios'

let token = localStorage.getItem("userToken")

export default function addToCartApi(productId) {
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId } , {headers:{token}})

}

export function getCartApi() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers:{token}})

}


export function deleteCartApi(id) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {headers:{token}})

}


export function updateCartApi({id,count}) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count}, {headers:{token}})

}



export function clearCartApi() {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {headers:{token}})

}
