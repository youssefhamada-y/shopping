import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Userprovider from "./Context/User.context";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import Cartprovider from "./Context/Cart.context";
import Checkout from "./Pages/Checkout/Checkout";
import AllOrders from "./Pages/AllOrders/AllOrders";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "*", element: <NotFoundPage /> },
        { index: true, element: <Home /> },
        { path: "/category/:id", element: <h2>category</h2> },
        { path: "/product/:id", element: <ProductDetails /> },
        {path:"allorders",element:<AllOrders/>},
        { path: "/cart", element: <Cart /> },
        {path:"checkout",element:<Checkout/>}
      ],
    },
    {
      path: "auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);
  return (
    <>
      <Userprovider>
        <Cartprovider>
          <RouterProvider router={routes}></RouterProvider>
          <Toaster />
        </Cartprovider>
      </Userprovider>
    </>
  );
}
