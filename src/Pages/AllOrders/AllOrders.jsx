import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { usercontext } from "../../Context/User.context";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

function AllOrders() {
  const { token } = useContext(usercontext);
  const { id } = jwtDecode(token);
  console.log(id);
  const [orders, setorders] = useState(null);

  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      console.log(data);
      setorders(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <section className="container mx-auto p-5 border border-gray-300 rounded-md ">
        {!orders ? (
          <Loading />
        ) : (
          orders.map((order, index) => {
            return (
              <div key={index} className="flex flex-col md:flex-row justify-between mt-6   ">
                <div>
                  <div>
                    <h3 className="text-gray-500">Order ID</h3>
                    <h2 className="font-bold"># {order.id}</h2>
                    <div className="grid gap-4 grid-cols-12">
                      {order.cartItems.map((item, index) => {
                        return <div key={index} className="border border-gray-300 p-4 rounded-md col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 mt-5">
                        <img
                          className="w-full  object-cover"
                          src={item.product.imageCover}
                          alt="order"
                        />
                        <p className="mt-2 font-semibold line-clamp-2">
                          {item.product.title}
                        </p>
                        <h2>{item.price} $</h2>
                      </div>
                      })}
                    </div>
                  </div>
                </div>
                <div className="  flex flex-shrink-0  ">
                  {order.isDelivered ? (
                    <span className="mr-5  btn-primary bg-green-600 inline-block self-start    ">
                      Delivered
                    </span>
                  ) : (
                    <span className="mr-5 btn-primary bg-blue-600 inline-block  self-start    ">
                      Under Delivery
                    </span>
                  )}
                  {order.isPaid ? (
                    <span className=" btn-primary bg-green-600 inline-block self-start ">
                      
                      Paid
                    </span>
                  ) : (
                    <span className=" btn-primary bg-red-600 inline-block self-start  ">
                      
                      Not Paid
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </section>
    </>
  );
}

export default AllOrders;
