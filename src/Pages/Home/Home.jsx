import { useEffect, useState } from "react";
import ProductCard from "../../Components/Card/ProductCard";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";

function Home() {
  const [products, setproducts] = useState(null);

  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);
    console.log(data);

    setproducts(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
    <HomeSlider/>
    <CategorySlider/>
      {products ? (
        <div className="grid lg:grid-cols-10   md:grid-cols-6 md:gap-5 grid-cols-1 gap-4">
          
          {products.map((product) => (
            <ProductCard
              image={product.imageCover}
              category={product.category.name}
              name={product.title}
              price={product.price}
              rate={product.ratingsAverage}
              id={product._id}
              key={product._id}
            />
          ))}
          
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Home;
