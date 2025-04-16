import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  async function getCategories() {
    setIsLoading(true);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET",
      };
      const { data } = await axios.request(options);
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
    window.scrollTo(0, 0);
  }, []);

  // Filter categories based on search term
  const filteredCategories = categories ? categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Handle category click to show details
  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop by Category</h1>
        <p className="text-gray-600">Browse our wide range of product categories</p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div 
              key={category._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h2>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    {selectedCategory === category ? "Hide Details" : "View Details"}
                  </button>
                  <Link 
                    to={`/category/${category._id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                  >
                    Browse
                  </Link>
                </div>
                
                {selectedCategory === category && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-gray-700 mb-2">
                      <span className="font-medium">Name:</span> {category.name}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-medium">ID:</span> {category._id}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Slug:</span> {category.slug}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && filteredCategories.length === 0 && (
        <div className="text-center py-10">
          <i className="fa-solid fa-search text-4xl text-gray-400 mb-3"></i>
          <h3 className="text-xl font-semibold text-gray-700">No categories found</h3>
          <p className="text-gray-500 mt-2">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
