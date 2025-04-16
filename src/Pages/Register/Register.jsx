import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name is too short")
      .max(15, "Name is too long"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, including uppercase, lowercase, number and special character"
      ),
    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref('password')], "Passwords must match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
  });

  async function sendDataToRegister(values) {
    setIsLoading(true);
    setError(null);
    let id;
    
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values
      };
      
      id = toast.loading("Creating your account...");
      const { data } = await axios.request(options);
      
      toast.dismiss(id);
      if (data.message === "success") {
        toast.success("Welcome to YussCart! Your account has been created successfully.");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.dismiss(id);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendDataToRegister,
    validationSchema,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <section className="py-4">
        <div className="flex justify-center items-center gap-2 mb-6">
          <i className="fa fa-user-plus text-green-500 text-2xl"></i>
          <h2 className="text-2xl font-bold text-green-500 font-sans[motserrat]">
            Join YussCart Today
          </h2>
        </div>

        <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="fa fa-user text-gray-400"></i>
              </span>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5"
                placeholder="John Doe"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.name && formik.touched.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="fa fa-envelope text-gray-400"></i>
              </span>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5"
                placeholder="example@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
            {error && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="fa fa-lock text-gray-400"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-10 p-2.5"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button 
                type="button" 
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={togglePasswordVisibility}
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="fa fa-lock text-gray-400"></i>
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="rePassword"
                id="rePassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-10 p-2.5"
                placeholder="••••••••"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button 
                type="button" 
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={toggleConfirmPasswordVisibility}
              >
                <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
              </button>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.rePassword}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="fa fa-phone text-gray-400"></i>
              </span>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5"
                placeholder="01xxxxxxxxx"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300"
                required
              />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-700">
              I agree to the{" "}
              <Link to="#" className="text-green-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-green-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-300`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              <>
                <i className="fa fa-user-plus mr-2"></i>
                Create Account
              </>
            )}
          </button>
          
          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-green-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
          
          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center">
              <i className="fa fa-shield-alt mr-1"></i>
              Your data is securely encrypted and protected
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
