import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { usercontext } from "../../Context/User.context";
function Login() {
  const navigate=useNavigate()
const [error,setError]=useState(null) 
const {token , settoken} = useContext(usercontext)
const passwordregex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
const validationSchema=Yup.object({
    email:Yup.string().email("Invalid email").required("Email is required"),
    password:Yup.string().required("Password is required").matches(passwordregex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
  
   
})

  async function sendDataToLogin(values){
    let id
try {
  const options={
    url:"https://ecommerce.routemisr.com/api/v1/auth/signin",
    method:"POST",
    data:values
  }
  id = toast.loading("Loading...")
      const {data}=await axios.request(options)
      console.log(data)
      toast.dismiss(id)
      if(data.message=="success"){
        toast.success("Login Success")
      }
     setTimeout(() => {
      if(data.message=="success"){
        localStorage.setItem("token",data.token)
        settoken(data.token)
        navigate("/")
      }
     }, 2000);
  
} catch (error) {
console.log(error) 
toast.dismiss(id)
toast.error(error.response.data.message)
setError(error.response.data.message)
}
    }

const formik=useFormik({
    initialValues:{
        
        email:"",
        password:"",
        
        
        
    },
onSubmit:sendDataToLogin,
validationSchema,
})



  return (
    <>
      <section className="p-20">
        <div className="flex justify-center items-center gap-2 mt-5">
          <i className="fa-solid fa-user text-xl text-green-500"></i>
          <h2 className="text-xl font-bold text-green-500 font-sans[motserrat]">
            Login Now
          </h2>
        </div>

        <form className=" mx-auto " onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-8 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-2"
              placeholder=" "
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-[0.1px] -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {formik.errors.email && formik.touched.email ?  (
              <div className="text-red-500">{formik.errors.email}</div>
            ):''}
           
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-[0.1px]  -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          {formik.errors.password && formik.touched.password ?  (
              <div className="text-red-500">{formik.errors.password}</div>
            ):''}
          </div>
         {error ?(
           <div className="text-red-500 mb-3">{error}</div>
         ):('')}
         
         
         
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
