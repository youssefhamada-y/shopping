import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Components/Card/ProductCard";
import Loading from "../../Components/Loading/Loading";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  async function getProducts() {
    setIsLoading(true);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/products",
        method: "GET",
      };
      const { data } = await axios.request(options);
      setProducts(data.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.data.map(product => product.category.name))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, []);

  // Filter products based on search term, category, and price range
  const filteredProducts = products ? products.filter(product => 
    (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "" || product.category.name === selectedCategory) &&
    (product.price >= priceRange.min && product.price <= priceRange.max)
  ) : [];

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts];
  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    sortedProducts.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
  } else if (sortBy === "name-asc") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "name-desc") {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, selectedCategory, priceRange]);

  // Handle price range change
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">All Products</h1>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          
          {/* Category Filter */}
          <div>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Sort */}
          <div>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort by: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
        
        {/* Price Range */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Price Range</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="mr-2">$</span>
              <input
                type="number"
                min="0"
                max={priceRange.max}
                value={priceRange.min}
                onChange={(e) => handlePriceChange(e, 'min')}
                className="w-24 p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <span>to</span>
            <div className="flex items-center">
              <span className="mr-2">$</span>
              <input
                type="number"
                min={priceRange.min}
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e, 'max')}
                className="w-24 p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {sortedProducts.length > 0 ? indexOfFirstProduct + 1 : 0} - {Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} products
        </p>
      </div>
      
      {/* Products Grid */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.title}
                  price={product.price}
                  image={product.imageCover}
                  category={product.category.name}
                  rate={product.ratingsAverage}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fa-solid fa-search text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-2xl font-semibold text-gray-700">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav>
                <ul className="flex space-x-2">
                  <li>
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                  </li>
                  
                  {[...Array(totalPages).keys()].map(number => (
                    <li key={number + 1}>
                      <button
                        onClick={() => paginate(number + 1)}
                        className={`px-3 py-1 rounded-md ${currentPage === number + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li>
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
