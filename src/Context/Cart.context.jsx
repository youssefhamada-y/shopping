import { createContext, useContext, useState } from "react";
import { usercontext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

 export const cartContext=createContext(null)
 export default function Cartprovider({children}) {
    const {token}=useContext(usercontext) 
    const [cartinfo,setcartinfo]=useState(null)
    async function getCartInfo(){
   try {
    const options={
      url:`https://ecommerce.routemisr.com/api/v1/cart`,
      method:"GET",
      headers:{
         token,
      }
    }
    const {data}=await axios.request(options)
    setcartinfo(data)
    
   } catch (error) {
    console.log(error)
if (error.response.data.message.includes("No cart")) {
  setcartinfo([])
} 
   }

    }
  async function addProductToCart({id}) {
      try {
        const options={
            url:`https://ecommerce.routemisr.com/api/v1/cart`,
            method:"POST",
            headers:{
               token,
            },
            data:{
             productId:id
            }
           } 
           const {data}=await axios.request(options)
           
           toast.success("Product added to cart")
           setcartinfo(data)
           console.log(data)
        
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
      }
    }
async function deleteProductFromCart({id}){
  try {
    const options={
      url:`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      method:"DELETE",
      headers:{
         token,
      }
    }
    const {data}=await axios.request(options)
   if(data.numOfCartItems==0){
    setcartinfo([])
   }else{
    setcartinfo(data)
   }
    toast.success("Product deleted from cart")
    console.log(data)
    
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error)
  }
}
async function updateProductQuantity({id ,count}){
  try {
    const options={
      url:`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      method:"Put",
      headers:{
         token,
      },
      data:{
        count,
      }
    }
    const {data}=await axios.request(options)
    setcartinfo(data)
    
  } catch (error) {
    console.log(error)
    
  }
}
    async function clearCart(){
      try {
        const options={
          url:`https://ecommerce.routemisr.com/api/v1/cart`,
          method:"DELETE",
          headers:{
             token,
          }
        }
        const {data}=await axios.request(options)
        console.log(data)
        if(data.message=="success"){
          setcartinfo([])
        }
        
      } catch (error) {
        console.log(error)
      }
    }
   return (
     <cartContext.Provider value={{addProductToCart,getCartInfo,cartinfo,setcartinfo,deleteProductFromCart ,updateProductQuantity,clearCart}}>
        {children}
        </cartContext.Provider>
   )
 }
