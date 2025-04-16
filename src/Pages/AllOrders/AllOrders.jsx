import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { usercontext } from "../../Context/User.context";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

function AllOrders() {
  const { token } = useContext(usercontext);
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getUserOrders() {
    setIsLoading(true);
    try {
      const { id } = jwtDecode(token);
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load your orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserOrders();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Orders</h1>
        <p className="text-gray-600">Track and manage your purchase history</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loading />
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          <p>{error}</p>
          <button 
            onClick={getUserOrders}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      ) : orders && orders.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Link 
            to="/products" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-bold text-lg">#{order.id}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {order.isDelivered ? 'Delivered' : 'Under Delivery'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {order.isPaid ? 'Paid' : 'Not Paid'}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Items</p>
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {order.cartItems.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition">
                        <img
                          className="w-full h-32 object-cover"
                          src={item.product.imageCover}
                          alt={item.product.title}
                        />
                        <div className="p-2">
                          <p className="font-medium text-sm line-clamp-2">{item.product.title}</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-green-600 font-bold">${item.price}</p>
                            <p className="text-sm text-gray-500">Qty: {item.count}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-bold text-xl">${order.totalOrderPrice}</p>
                  </div>
                  <Link 
                    to="/products" 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                  >
                    Shop Again
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrders;
