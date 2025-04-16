import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { usercontext } from "../../../Context/User.context";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../../Context/Cart.context";

export default function Navbar() {
  const { getCartInfo, cartinfo } = useContext(cartContext);
  const { token, LogOut } = useContext(usercontext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getCartInfo();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="">
        <nav className="bg-slate-100 p-2 shadow-lg max-w-screen-xl px-4 mx-auto">
          <div className="container flex flex-wrap justify-between items-center">
            <h1>
              <Link className="flex items-center" to={"/"}>
                <img className="w-[30px]" src={logo} alt="logo" />
                <h1 className="text-[20px] p-2 font-bold">YussCart</h1>
              </Link>
            </h1>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center p-2 ml-3 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            {/* Navigation links */}
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } w-full md:block md:w-auto`}
            >
              {token ? (
                <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0">
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block py-2 md:py-0 relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1 ${
                          isActive ? "before:w-full font-bold" : "before:w-0"
                        }`;
                      }}
                      to={"/"}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block py-2 md:py-0 relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1 ${
                          isActive ? "before:w-full font-bold" : "before:w-0"
                        }`;
                      }}
                      to={"/products"}
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block py-2 md:py-0 relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1 ${
                          isActive ? "before:w-full font-bold" : "before:w-0"
                        }`;
                      }}
                      to={"/categories"}
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block py-2 md:py-0 relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1 ${
                          isActive ? "before:w-full font-bold" : "before:w-0"
                        }`;
                      }}
                      to={"/brands"}
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block py-2 md:py-0 relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1 ${
                          isActive ? "before:w-full font-bold" : "before:w-0"
                        }`;
                      }}
                      to={"/allorders"}
                    >
                      Orders
                    </NavLink>
                  </li>
                  
                  {/* Logout button for mobile view */}
                  <li className="md:hidden">
                    <button
                      onClick={LogOut}
                      className="block py-2 md:py-0 relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1 w-full text-left"
                    >
                      <span className="flex items-center gap-1">
                        <span>Logout</span>
                        <i className="fa-solid fa-right-from-bracket"></i>
                      </span>
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="flex flex-col md:hidden mt-4">
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block py-2 relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1 ${
                          isActive ? "before:w-full font-bold" : "before:w-0"
                        }`;
                      }}
                      to="/auth/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `block py-2 relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1 ${
                          isActive ? "before:w-full font-bold" : "before:w-0"
                        }`;
                      }}
                      to="/auth/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>

            {/* Cart and user actions */}
            <div className="flex items-center space-x-4">
              <Link
                to={"/cart"}
                className="relative flex items-center justify-center"
              >
                <i className="fa-solid fa-cart-shopping text-2xl"></i>
                <span className="bg-green-600 text-white text-[13px] rounded-full p-2 w-[15px] h-[15px] absolute top-[-20%] right-[-20%] text-center flex justify-center items-center">
                  {cartinfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    cartinfo.numOfCartItems || 0
                  )}
                </span>
              </Link>

              {/* User authentication */}
              <div className="hidden md:flex">
                <ul className="flex gap-4">
                  {!token ? (
                    <>
                      <li>
                        <NavLink
                          className={({ isActive }) => {
                            return `relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1 ${
                              isActive
                                ? "before:w-full font-bold"
                                : "before:w-0"
                            }`;
                          }}
                          to="/auth/login"
                        >
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) => {
                            return `relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1 ${
                              isActive
                                ? "before:w-full font-bold"
                                : "before:w-0"
                            }`;
                          }}
                          to="/auth/register"
                        >
                          Register
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <li className="cursor-pointer relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 hover:font-bold before:bg-blue-400 before:absolute before:left-0 before:-bottom-1">
                      <span
                        onClick={LogOut}
                        className="flex items-center gap-1"
                      >
                        <span className="hidden sm:inline">Logout</span>
                        <i className="fa-solid fa-right-from-bracket"></i>
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Social media links */}
          <div className="hidden md:block mt-2 border-t pt-2">
            <ul className="flex justify-center gap-6">
              <li>
                <a
                  href="https://www.facebook.com"
                  className="hover:text-blue-600 transition-colors"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  className="hover:text-pink-600 transition-colors"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.whatsapp.com"
                  className="hover:text-green-500 transition-colors"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com"
                  className="hover:text-red-600 transition-colors"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com"
                  className="hover:text-gray-800 transition-colors"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
