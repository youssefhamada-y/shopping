import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import { cartContext } from "../../Context/Cart.context";

export default function ProductDetails() {
  const {addProductToCart}=useContext(cartContext)
  const [details, setdetails] = useState(null);
  const { id } = useParams();
  async function getProductDeatails() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    setdetails(data.data);
  }
  useEffect(() => {
    getProductDeatails();
  }, []);
const imageItems=details?.images.map((imageUrl)=>{
   return{
    original:imageUrl,
    thumbnail:imageUrl
   }
})
  return (
    <>
      {details === null ? (
        <Loading />
      ) : (
        <section className="grid grid-cols-12 gap-8 px-4 mt-16"  >
          <div className="md:col-span-4 lg:col-span-4 col-span-12">
            <ReactImageGallery items={imageItems} showNav={false} showPlayButton={false} swipingTransitionDuration={1000} />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-8">
            <h2 className="text-2xl font-bold">{details.title}</h2>
            <h4 className="text-green-600">{details.category.name}</h4>
            <p className="mt-4 text-gray-500">{details.description}</p>
            <p className="mt-4 "> <span className="font-bold">Quantity:</span> {details.quantity}</p>
            <div className="flex justify-between items-center mt-4">
                <span>{details.price} $</span>
                <span>
                <i className="fa-solid fa-star text-yellow-500 me-1"></i>
                    {details.ratingsAverage} 
                    
                </span>
            </div>
            <div onClick={()=>addProductToCart({id:details.id})}>
            <button className="btn btn-primary w-full mt-4 hover:bg-green-600">Add To Cart</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
