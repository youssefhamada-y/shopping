import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { usercontext } from "../../../Context/User.context";
import { useContext, useEffect } from "react";
import { cartContext } from "../../../Context/Cart.context";
export default function Navbar() {
  const {getCartInfo,cartinfo}=useContext(cartContext) 
  const {token,LogOut}=useContext(usercontext)
  useEffect(()=>{
    getCartInfo()
  },[])

  return (
    <>
     <div className="">
     <nav className=" bg-slate-100 p-2 shadow-lg max-w-screen-xl px-4 mx-auto ">
        <div className="container flex justify-between items-center   ">
          <h1>
            <Link className="flex items-center" to={"/"}>
              <img className="w-[30px] " src={logo} alt="logo" />
              <h1 className="text-[20px] p-2 font-bold">YussCart</h1>
            </Link>
          </h1>
         {token ?
          <ul className="flex  gap-6">
          <li>
            <NavLink className={({isActive})=>{
              return `relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold  before:bg-blue-400 before:absolute before:left-0 before:-bottom-1   ${isActive ? "before:w-full font-bold" : "before:w-0"}`
            }} to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink className={({isActive})=>{
              return `relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold  before:bg-blue-400 before:absolute before:left-0 before:-bottom-1   ${isActive ? "before:w-full font-bold" : "before:w-0"}`
            }} to={"/products"}>Products</NavLink>
          </li>
          <li>
            <NavLink className={({isActive})=>{
              return `relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold  before:bg-blue-400 before:absolute before:left-0 before:-bottom-1   ${isActive ? "before:w-full font-bold" : "before:w-0"}`
            }} to={"/categories"}>Categories</NavLink>
          </li>
          <li>
            <NavLink className={({isActive})=>{
              return `relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold  before:bg-blue-400 before:absolute before:left-0 before:-bottom-1   ${isActive ? "before:w-full font-bold" : "before:w-0"}`
            }} to={"/brands"}>Brands</NavLink>
          
          </li>
          <li>
            <NavLink className={({isActive})=>{
              return `relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold  before:bg-blue-400 before:absolute before:left-0 before:-bottom-1   ${isActive ? "before:w-full font-bold" : "before:w-0"}`
            }} to={"/allorders"}>Orders</NavLink>
          
          </li>
          
        </ul>:""}
        <Link to={"/cart"} className="relative left-14   ">
          <i className="fa-solid fa-cart-shopping text-2xl  "></i>
          <span className="bg-green-600 text-white text-[13px] rounded-full p-2  w-[15px] h-[15px] absolute top-[-20%] right-[-20%] text-center flex justify-center items-center">
            {cartinfo === null ? <i className=" fa-solid fa-spinner fa-spin"></i> : cartinfo.numOfCartItems || 0}
            </span>
        </Link>
          <ul className="flex gap-6 ">
            <li>
              <a href="https://www.facebook.com">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.whatsapp.com">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
          </ul>
          <ul className="flex gap-4">
           {!token ?
           <>
            <li>
              <NavLink className={({isActive})=>{
                return `relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold  before:bg-blue-400 before:absolute before:left-0 before:-bottom-1  
                 ${isActive ? "before:w-full font-bold" : "before:w-0"}`
              }} to="/auth/login">Login</NavLink>
            </li>
            <li>
                <NavLink className={({isActive})=>{
                return `relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold  before:bg-blue-400 before:absolute before:left-0 before:-bottom-1  
                 ${isActive ? "before:w-full font-bold" : "before:w-0"}`
              }} to="/auth/register">
                    Register</NavLink>
            </li>
           </>: <li className=" cursor-pointer relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold  before:bg-blue-400 before:absolute before:left-0 before:-bottom-1   ">
                <span onClick={LogOut}>
                <i className="fa-solid fa-right-from-bracket"></i></span>
            </li>}
           
          </ul>
        </div>
      </nav>
     </div>
    </>
  );
}
