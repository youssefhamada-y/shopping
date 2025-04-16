import { useEffect, useState, useContext } from "react";
import ProductCard from "../../Components/Card/ProductCard";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import { usercontext } from "../../Context/User.context";
import { Link } from "react-router-dom";

function Home() {
  const [products, setproducts] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const { token } = useContext(usercontext);

  async function getProducts() {
    setIsLoading(true);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/products",
        method: "GET",
      };
      const { data } = await axios.request(options);
      console.log(data);

      // Get all products
      setproducts(data.data);
      
      // Get featured products (products with highest ratings)
      const featured = [...data.data].sort((a, b) => b.ratingsAverage - a.ratingsAverage).slice(0, 5);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Filter products based on search term
  const filteredProducts = products ? products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts];
  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    sortedProducts.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
  }

  return (
    <>
      {!token && (
        <div className="bg-blue-100 p-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-800">Welcome to YussCart!</h2>
          <p className="text-blue-700 mt-2">
            Sign in to access exclusive deals and save your favorite items.
          </p>
          <div className="mt-3">
            <Link to="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded-md mr-3 hover:bg-blue-700 transition">
              Sign In
            </Link>
            <Link to="/auth/register" className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition">
              Register
            </Link>
          </div>
        </div>
      )}

      <HomeSlider />
      <CategorySlider />

      {featuredProducts && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-blue-400 pb-2">Featured Products</h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard
                image={product.imageCover}
                category={product.category.name}
                name={product.title}
                price={product.price}
                rate={product.ratingsAverage}
                id={product._id}
                key={`featured-${product._id}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">All Products</h2>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort by: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : sortedProducts.length > 0 ? (
        <div className="grid lg:grid-cols-10 md:grid-cols-6 md:gap-5 grid-cols-1 gap-4">
          {sortedProducts.map((product) => (
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
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold text-gray-700">No products found matching your search</h3>
          <button 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => setSearchTerm("")}
          >
            Clear Search
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
