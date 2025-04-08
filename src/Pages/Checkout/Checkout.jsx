import { useFormik } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import { usercontext } from "../../Context/User.context";
import { cartContext } from "../../Context/Cart.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { token } = useContext(usercontext);
  const { cartinfo ,setcartinfo } = useContext(cartContext);
  const [ordertype,setordertype]=useState(null) 
  const navigate=useNavigate()

  async function createCashOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartinfo.data._id}`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          values,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      console.log("cash");
      toast.success("Order created successfully");
      setcartinfo([]);
      setTimeout(() => {
        navigate("/allorders");
      },2000)
    } catch (error) {
      console.log(error);
    }
  }
  async function createOnlineOrder(values){
try {
  const options={
    url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartinfo.data._id}?url=http://localhost:5173`,
    method:"POST",
    headers:{
      token,
    },
    data:{
      values
    }
  }
  const {data}=await axios.request(options)
  console.log(data)
  console.log("online")
  toast.loading("Redirecting...")
 setTimeout(()=>{
  if(data.status==="success"){
    window.location.href=data.session.url
  }
 },2000)
} catch (error) {
  console.log(error)
  
}

    }
  

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
     if(ordertype==="cash"){
      createCashOrder(values)
     }else{
      createOnlineOrder(values)
     }
    },
  });
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="City"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            name="shippingAddress.city"
            className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone"
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.phone}
            name="shippingAddress.phone"
            className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          />
        </div>
        <div>
          <textarea
            placeholder="Address..."
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            name="shippingAddress.details"
            className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          ></textarea>
        </div>
        <button
        onClick={()=>setordertype("cash")}
          type="submit"
          className=" btn-primary bg-blue-800 hover:bg-blue-900 mt-5"
        >
          Cash Order
        </button>
        <button
        onClick={()=>setordertype("online")}
          type="submit"
          className=" btn-primary bg-green-800 hover:bg-green-900 mt-5 ms-4"
        >
          Credit Order
        </button>
      </form>
    </>
  );
}

export default Checkout;
