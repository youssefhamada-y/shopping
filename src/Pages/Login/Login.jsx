import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { usercontext } from "../../Context/User.context";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { settoken } = useContext(usercontext);
  
  // Check for saved email in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      formik.setFieldValue("email", savedEmail);
      setRememberMe(true);
    }
  }, []);

  const passwordregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordregex,
        "Password must contain at least 8 characters, including uppercase, lowercase, number and special character"
      ),
  });

  async function sendDataToLogin(values) {
    setIsLoading(true);
    setError(null);
    let id;
    
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values
      };
      
      id = toast.loading("Signing you in...");
      const { data } = await axios.request(options);
      
      toast.dismiss(id);
      if (data.message === "success") {
        toast.success("Welcome back to YussCart!");
        
        // Handle remember me functionality
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", values.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        // Set token and redirect
        localStorage.setItem("token", data.token);
        settoken(data.token);
        
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.dismiss(id);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendDataToLogin,
    validationSchema,
  });

  return (
    <>
      <section className="p-8 md:p-20">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg p-6">
          <div className="flex justify-center items-center gap-2 mb-8">
            <i className="fa-solid fa-user text-2xl text-green-500"></i>
            <h2 className="text-2xl font-bold text-green-500 font-sans[motserrat]">
              Welcome Back
            </h2>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full group">
              <input
                type="email"
                name="email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer mt-2"
                placeholder=" "
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-[0.1px] -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              ) : ''}
            </div>
            
            <div className="relative z-0 w-full group">
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button 
                  type="button" 
                  className="absolute right-2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-[0.1px] -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              ) : ''}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link to="/auth/register" className="font-medium text-green-600 hover:text-green-500">
                  Don't have an account?
                </Link>
              </div>
            </div>
            
            {error ? (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {error}
              </div>
            ) : ''}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-sign-in-alt mr-2"></i>
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
