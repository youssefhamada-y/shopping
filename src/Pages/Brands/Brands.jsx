import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function getBrands() {
    setIsLoading(true);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/brands",
        method: "GET",
      };
      const { data } = await axios.request(options);
      setBrands(data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
    window.scrollTo(0, 0);
  }, []);

  // Filter brands based on search term
  const filteredBrands = brands ? brands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop by Brand</h1>
        <p className="text-gray-600">Discover products from your favorite brands</p>
      </div>

      {/* Search and filter */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search brands..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : selectedBrand ? (
        <div>
          <button 
            onClick={() => setSelectedBrand(null)}
            className="mb-4 flex items-center text-green-600 hover:text-green-800"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> Back to all brands
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src={selectedBrand.image} 
                alt={selectedBrand.name} 
                className="w-40 h-40 object-contain"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedBrand.name}</h2>
                <p className="text-gray-600 mb-4">
                  {selectedBrand.slug}
                </p>
                <Link 
                  to={`/products?brand=${selectedBrand.name}`}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <div 
              key={brand._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedBrand(brand)}
            >
              <div className="p-4 flex flex-col items-center">
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="w-32 h-32 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-center">{brand.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && filteredBrands.length === 0 && (
        <div className="text-center py-8">
          <i className="fa-solid fa-search text-4xl text-gray-400 mb-3"></i>
          <h3 className="text-xl font-semibold text-gray-700">No brands found</h3>
          <p className="text-gray-500 mt-2">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
