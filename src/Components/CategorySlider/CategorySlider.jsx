import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  const [categories, setcategories] = useState(null);

  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setcategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories ? (
        <section className="pb-8">
          <h2 className="text-lg mb-3 semi-bold">Shop Popular Categories</h2>
          <swiper-container
            slides-per-view="5"
            loop="true"
            autoplay="true"
            speed="500"
          >
            {categories.map((category) => ( 
              <swiper-slide key={category.id}>
              <Link to={`/category/${category._id}`}>
              <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover "
                />
                <h3>{category.name}</h3>
              </Link>
              </swiper-slide>
            ))}
          </swiper-container>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
