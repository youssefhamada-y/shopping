import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.context";
import Loading from "../Loading/Loading";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { cartinfo, deleteProductFromCart, updateProductQuantity, clearCart } =
    useContext(cartContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 15,
    total: 0
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set isLoaded to true after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Calculate cart summary whenever cartinfo changes
    if (cartinfo && cartinfo.data) {
      try {
        const subtotal = cartinfo.data.totalCartPrice || 0;
        const tax = subtotal * 0.14; // 14% tax
        const shipping = subtotal > 100 ? 0 : 15; // Free shipping for orders over $100
        
        setCartSummary({
          subtotal,
          tax,
          shipping,
          total: subtotal + tax + shipping
        });
      } catch (error) {
        console.error("Error calculating cart summary:", error);
      }
    }
  }, [cartinfo]);

  // Handle delete confirmation
  const confirmDelete = (id) => {
    setItemToDelete(id);
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      deleteProductFromCart({ id: itemToDelete });
      setShowConfirmation(false);
      setItemToDelete(null);
    }
  };

  // Handle clear cart confirmation
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.3 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  // Function to handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
  };

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      {cartinfo === null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Loading />
        </motion.div>
      ) : (
        <motion.div 
          className="container mx-auto py-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center gap-2 mb-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-bold text-2xl text-gray-800">Your Shopping Cart</h1>
            <motion.i 
              className="fa-solid fa-cart-shopping text-green-600"
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.5, delay: 0.8 }}
            ></motion.i>
          </motion.div>

          {/* Empty cart state */}
          {!cartinfo.data || cartinfo.data.products.length === 0 ? (
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8 text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-col justify-center items-center gap-4 py-12">
                <motion.i 
                  className="fa-solid fa-cart-shopping text-5xl text-gray-300 mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                ></motion.i>
                <motion.h2 
                  className="text-xl font-semibold text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Your cart is empty
                </motion.h2>
                <motion.p 
                  className="text-gray-500 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Looks like you haven&apos;t added anything to your cart yet.
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={"/products"} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                    <i className="fa-solid fa-store mr-2"></i>
                    Browse Products
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart items */}
              <motion.div 
                className="lg:col-span-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b">
                    <h2 className="font-semibold text-lg">Cart Items ({cartinfo.numOfCartItems})</h2>
                  </div>
                  <AnimatePresence>
                    <div className="divide-y">
                      {cartinfo.data.products.map((item) => (
                        <motion.div 
                          key={item._id} 
                          className="p-4 hover:bg-gray-50 transition-colors"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <motion.div 
                              className="col-span-2 sm:col-span-1"
                              whileHover={{ scale: 1.1 }}
                            >
                              <img
                                className="w-full rounded-md"
                                src={item.product.imageCover}
                                alt={item.product.title}
                                onError={handleImageError}
                              />
                            </motion.div>
                            <div className="col-span-10 sm:col-span-11 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                              <div className="mb-3 sm:mb-0">
                                <Link to={`/product/${item.product._id}`} className="text-lg font-bold hover:text-green-600 transition-colors line-clamp-1">
                                  {item.product.title}
                                </Link>
                                <div className="text-sm text-gray-500 mt-1">
                                  Category: {item.product.category?.name || "Unknown"}
                                </div>
                                <div className="flex items-center mt-2">
                                  <span className="text-green-600 font-bold">${item.price}</span>
                                  <span className="mx-2 text-gray-400">×</span>
                                  <span>{item.count}</span>
                                  <span className="ml-2 text-gray-400">=</span>
                                  <motion.span 
                                    className="ml-2 font-bold"
                                    key={item.count}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    ${(item.price * item.count).toFixed(2)}
                                  </motion.span>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => confirmDelete(item.product._id)}
                                  className="mt-3 text-red-500 hover:text-red-700 text-sm flex items-center transition-colors"
                                >
                                  <i className="fa-solid fa-trash mr-1"></i> Remove
                                </motion.button>
                              </div>
                              <div className="flex items-center border rounded-lg overflow-hidden">
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    updateProductQuantity({
                                      id: item.product._id,
                                      count: item.count - 1,
                                    })
                                  }
                                  disabled={item.count <= 1}
                                  className={`px-3 py-2 ${item.count <= 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                >
                                  <i className="fa-solid fa-minus"></i>
                                </motion.button>
                                <motion.span 
                                  className="px-4 py-2 font-medium border-x"
                                  key={item.count}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {item.count}
                                </motion.span>
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    updateProductQuantity({
                                      id: item.product._id,
                                      count: item.count + 1,
                                    })
                                  }
                                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                                >
                                  <i className="fa-solid fa-plus"></i>
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                  <div className="p-4 bg-gray-50 border-t">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowClearConfirmation(true)}
                      className="text-red-500 hover:text-red-700 font-medium flex items-center transition-colors"
                    >
                      <i className="fa-solid fa-trash-can mr-2"></i> Clear Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Order summary */}
              <motion.div 
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                  <div className="p-4 bg-gray-50 border-b">
                    <h2 className="font-semibold text-lg">Order Summary</h2>
                  </div>
                  <div className="p-4">
                    <motion.div 
                      className="space-y-3 mb-4"
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                    >
                      <motion.div 
                        className="flex justify-between"
                        variants={itemVariants}
                      >
                        <span className="text-gray-600">Subtotal</span>
                        <motion.span 
                          className="font-medium"
                          key={cartSummary.subtotal}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          ${cartSummary.subtotal.toFixed(2)}
                        </motion.span>
                      </motion.div>
                      <motion.div 
                        className="flex justify-between"
                        variants={itemVariants}
                      >
                        <span className="text-gray-600">Tax (14%)</span>
                        <span className="font-medium">${cartSummary.tax.toFixed(2)}</span>
                      </motion.div>
                      <motion.div 
                        className="flex justify-between"
                        variants={itemVariants}
                      >
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">
                          {cartSummary.shipping > 0 ? `$${cartSummary.shipping.toFixed(2)}` : 'Free'}
                        </span>
                      </motion.div>
                      {cartSummary.shipping > 0 && (
                        <motion.div 
                          className="text-xs text-gray-500"
                          variants={itemVariants}
                        >
                          Free shipping on orders over $100
                        </motion.div>
                      )}
                      <motion.div 
                        className="border-t pt-3 mt-3"
                        variants={itemVariants}
                      >
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <motion.span 
                            className="text-green-600"
                            key={cartSummary.total}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            ${cartSummary.total.toFixed(2)}
                          </motion.span>
                        </div>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link 
                        to={"/checkout"} 
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                      >
                        Proceed to Checkout
                        <motion.i 
                          className="fa-solid fa-arrow-right ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        ></motion.i>
                      </Link>
                    </motion.div>
                    <motion.div 
                      className="mt-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link to={"/products"} className="text-green-600 hover:text-green-700 text-sm">
                        <i className="fa-solid fa-arrow-left mr-1"></i> Continue Shopping
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <h3 className="text-lg font-bold mb-4">Remove Item</h3>
              <p className="mb-6">Are you sure you want to remove this item from your cart?</p>
              <div className="flex justify-end gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear cart confirmation modal */}
      <AnimatePresence>
        {showClearConfirmation && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <h3 className="text-lg font-bold mb-4">Clear Cart</h3>
              <p className="mb-6">Are you sure you want to remove all items from your cart?</p>
              <div className="flex justify-end gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowClearConfirmation(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    clearCart();
                    setShowClearConfirmation(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Clear Cart
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
