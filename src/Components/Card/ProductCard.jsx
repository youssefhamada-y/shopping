import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.context";

export default function ProductCard({ image, category, name, price,rate,id }) {
  const {addProductToCart}=useContext(cartContext) 
  return (
    <>
      <div  className="col-span-2 shadow-lg rounded-md overflow-hidden  hover:scale-110 transition-all duration-300 ">
        <div
          className="relative"
        >
          <img className="w-full" src={image} alt="" />
        <div className="layer opacity-0  hover:opacity-100 transition-opacity duration-300 absolute top-0 left-0 w-full h-full bg-black bg-opacity-15 flex justify-center items-center   ">
          <div className="icon flex gap-3">
            <i className=" cursor-pointer fa-regular fa-heart text-xl text-white hover:rotate-6 hover:scale-110 transition-all duration-300  border-2 border-green-600 rounded-full p-1 bg-green-600"></i>
            <Link to={`/product/${id}`}>
            <i className=" cursor-pointer fa-regular fa-eye text-xl text-white hover:rotate-6 hover:scale-110 transition-all duration-300 border-2 border-green-600 rounded-full p-1 bg-green-600"></i>
            </Link>
            <div onClick={()=>addProductToCart({id})}>
            <i className=" cursor-pointer fa-solid fa-cart-shopping text-xl text-white hover:rotate-6 hover:scale-110 transition-all duration-300 border-2 border-green-600 rounded-full p-1 bg-green-600"></i>
            </div>
          </div>
        </div>

        </div>
        <div className="p-3">
          <h3 className="text-green-600">{category}</h3>
          <h2 className="text-lg line-clamp-2">{name}</h2>
          <div className="flex justify-between items-center mt-2">
            <span>{price} $</span>
            <div>
              <i className="fa-solid fa-star text-yellow-500 me-1"></i>
              <span>{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
