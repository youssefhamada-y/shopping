import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.context";
import Loading from "../Loading/Loading";

export default function Cart() {
  const { cartinfo, deleteProductFromCart, updateProductQuantity, clearCart } =
    useContext(cartContext);

  // useEffect(() => {
  //     getCartInfo()
  // }, [])
  return (
    <>
      {cartinfo === null ? (
        <Loading />
      ) : (
        <section className=" container mx-auto bg-gray-200 py-2 px-4">
          <div className="flex items-center gap-1">
            <h1 className="font-bold text-lg">Shop Cart</h1>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          {cartinfo.length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-2 p-24">
              <p>Cart is empty</p>
              <Link to={"/"} className="btn btn-primary ">
                ADD YOUR FIRST PRODUCT TO YOUR CART
              </Link>
            </div>
          ) : (
            cartinfo.data.products.map((item) => (
              <div key={item._id} className="grid grid-cols-12 gap-5 mt-4">
                <div className="col-span-1">
                  <img
                    className="w-full"
                    src={item.product.imageCover}
                    alt="item"
                  />
                </div>
                <div className=" col-span-11 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{item.product.title}</h3>
                    <h4 className="text-sm text-gray-700 ">
                      {" "}
                      Price : {item.price} $
                    </h4>
                    <button
                      onClick={() =>
                        deleteProductFromCart({ id: item.product._id })
                      }
                      className="btn-primary bg-red-500 mt-3"
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                  <div className="flex gap-5 ">
                    <button
                      onClick={() =>
                        updateProductQuantity({
                          id: item.product._id,
                          count: item.count - 1,
                        })
                      }
                      className="btn-primary"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="text-lg font-bold">{item.count}</span>
                    <button
                      onClick={() =>
                        updateProductQuantity({
                          id: item.product._id,
                          count: item.count + 1,
                        })
                      }
                      className="btn-primary"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

         
          <button
            onClick={() => clearCart()}
            className=" btn-primary bg-red-500 mt-7 "
          >
            Clear Cart
          </button>
        </section>
      )}
       <div className="flex justify-end mt-2">
            <Link to={"/checkout"} className="btn btn-primary ">
              Next Step <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
    </>
  );
}
