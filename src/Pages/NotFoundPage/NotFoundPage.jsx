import { Link } from "react-router-dom";
import notfoundpage from "../../assets/images/notfoundpage.png";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <div className="max-w-md w-full text-center">
        <img 
          src={notfoundpage} 
          alt="Page Not Found" 
          className="w-full mb-6 animate-pulse" 
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link 
          to="/" 
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <i className="fa-solid fa-home mr-2"></i>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
