import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={footerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-6">
              <i className="fas fa-shopping-cart text-3xl text-emerald-400 mr-2"></i>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                YussCart
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              Your ultimate shopping destination for quality products, 
              exceptional service, and unbeatable prices. Shop smarter, live better.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="bg-gray-700 hover:bg-emerald-500 p-2 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-facebook-f text-white"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="bg-gray-700 hover:bg-emerald-500 p-2 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-twitter text-white"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="bg-gray-700 hover:bg-emerald-500 p-2 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-instagram text-white"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="bg-gray-700 hover:bg-emerald-500 p-2 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-linkedin-in text-white"></i>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-emerald-400"></span>
            </h3>
            <ul className="space-y-3">
              {['Home', 'Shop', 'Categories', 'New Arrivals', 'Featured', 'Sale'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center"
                  >
                    <i className="fas fa-chevron-right mr-2 text-xs"></i> {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Customer Service
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-emerald-400"></span>
            </h3>
            <ul className="space-y-3">
              {['My Account', 'Track Order', 'Returns & Exchanges', 'Shipping Policy', 'FAQ', 'Contact Us'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center"
                  >
                    <i className="fas fa-chevron-right mr-2 text-xs"></i> {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Newsletter
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-emerald-400"></span>
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter and get 10% off your first purchase.
            </p>
            <form className="mb-6">
              <div className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-gray-700 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <motion.button 
                  type="submit" 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-paper-plane mr-2"></i> Subscribe
                </motion.button>
              </div>
            </form>
            <div>
              <h4 className="font-medium mb-2">We Accept</h4>
              <div className="flex space-x-2">
                <div className="bg-gray-700 rounded p-1 w-10 h-8 flex items-center justify-center">
                  <i className="fab fa-cc-visa text-gray-300"></i>
                </div>
                <div className="bg-gray-700 rounded p-1 w-10 h-8 flex items-center justify-center">
                  <i className="fab fa-cc-mastercard text-gray-300"></i>
                </div>
                <div className="bg-gray-700 rounded p-1 w-10 h-8 flex items-center justify-center">
                  <i className="fab fa-cc-paypal text-gray-300"></i>
                </div>
                <div className="bg-gray-700 rounded p-1 w-10 h-8 flex items-center justify-center">
                  <i className="fab fa-cc-apple-pay text-gray-300"></i>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} YussCart. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
