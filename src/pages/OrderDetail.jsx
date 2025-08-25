import React, { useState, useEffect } from "react";
import {getOrderProduct} from '../ApiFunctions/Continuepayment'
import './Orders.css'
import { useNavigate } from "react-router-dom";

const OrderDetail = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //get orderproduct detail

  // get order product detail
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderProduct(); // ✅ call the function
        console.log("Orders:", data.data);
        setOrders(data.data); // store orders in state
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // ✅ run once on mount

  if (loading) return <p>Loading orders...</p>;

  //sent id for detailpage
  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`); // 👈 redirect with order._id
    window.scroll(0,0);
  };

  return (
    <>
    <div className="container-fluid">
  <div
    className="container p-5 d-flex flex-column justify-content-center align-items-center"
    style={{ minHeight: "100vh" }}
  >
   {orders.map((order) => {
          // ✅ calculate total products
          const totalProducts = order.items.reduce(
            (acc, item) => acc + (item.totalCount || 0),
            0
          );

          return (
            <div
              key={order._id}
              className="row w-75 p-3 mb-3 rounded-3"
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backgroundColor: "#fff",
              }}
            >
              {/* Profile/Image Placeholder */}
              <div className="col-3 p-3">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/${order.items[0]?.productId?.images[0]}`}
                  alt="profile"
                  className="img-fluid rounded-3"
                />
              </div>

              {/* Order Summary */}
              <div className="col-4 text-start p-3">
  <div className="d-flex flex-column justify-content-between h-100">
    <div>
      {/* ✅ Total quantity across all products */}
      <p>Total Products: {order.items.reduce((acc, item) => acc + (item.totalCount || 0), 0)}</p>
      <hr />
      <p>Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
    </div>
    <div>
      <button
        className="btn btn-primary p-2 rounded-5 advancebutton"
        onClick={() => handleViewDetails(order._id)}
      >
        View Details
      </button>
    </div>
  </div>
</div>


              {/* Order Actions */}
             <div className="col-5 p-3">
  <div className="d-flex flex-column justify-content-between h-100">
    {/* Order Id */}
    <p className="text-end mb-3">
      <strong>Order Id:</strong> {order.orderId}
    </p>

    {/* Payment Buttons */}
    <div className="d-flex justify-content-between">
      <button 
        className="btn btn-primary rounded-5 p-2 advancebutton"
        // onClick={() => handlePayAdvance(order.orderId)}
      >
        Pay Advance
      </button>
      <button 
        className="btn btn-primary rounded-5 p-2 advancebutton"
        // onClick={() => handlePayFull(order.orderId)}
      >
        Pay Full Amount
      </button>
    </div>
  </div>
</div>

            </div>
          );
        })}

    
  </div>
</div>



    
    </>
  )
}

export default OrderDetail