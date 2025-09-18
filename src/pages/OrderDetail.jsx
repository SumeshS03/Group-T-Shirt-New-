import React, { useState, useEffect } from "react";
import { getOrderProduct } from "../ApiFunctions/Continuepayment";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { handlePayment } from "../ApiFunctions/PaymentGateway";
import StockOrder from "./StockOrder";
import { useLocation } from "react-router-dom";
import CancelOrderModal from "./CancelOrderModel";

const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("product");
  const location = useLocation();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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
  }, []);

const openTab = location.state?.openTab;

  //for tab switching
useEffect(() => {
  if (openTab) {
    setActiveTab(openTab);
  }
}, [openTab]);


if (loading) return <p>Loading orders...</p>;

  //sent id for detailpage
  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`); // 👈 redirect with order._id
    window.scroll(0, 0);
  };


  //open cancel order
  const handleOpenCancel = (orderId) => {
    setSelectedOrderId(orderId); // ✅ store which order we are cancelling
    setShowCancelModal(true);    // ✅ open modal
  };


  return (
    <>
      <div className="container-fluid mb-5">
        <div
          className="container d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          {/* tabs buttons */}

          <div className="d-flex justify-content-center mb-4 mt-5">
            <button
              className={`btn me-3 ${
                activeTab === "product" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setActiveTab("product")}
            >
              Product Orders
            </button>
            <button
              className={`btn ${
                activeTab === "stock" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setActiveTab("stock")}
            >
              Stock Orders
            </button>
          </div>



          {activeTab === "product" && (
  orders.length > 0 ? (
    orders.map((order) => {
      const totalProducts = order.items.reduce(
        (acc, item) => acc + (item.totalCount || 0),
        0
      );

      return (
        <div
          key={order._id}
          className="row w-100 p-3 mb-3 rounded-3"
          style={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            backgroundColor: "#fff",
          }}
        >
          {/* Product Image */}
         {order.items.map((item, idx) => (
  <div className="row mb-3" key={idx}>
    {/* Image */}
    <div className="col-lg-3 p-3">
      <img
        src={`${process.env.REACT_APP_IMAGE_URL}/${item.productId?.images[0]}`}
        alt={`product-${idx}`}
        className="img-fluid rounded-3 product-imgorder"
        style={{ width: "100%", height: "200px", objectFit: "contain" }}
      />
    </div>

    {/* Details */}
    <div className="col-lg-9 d-flex flex-column justify-content-between p-3 text-start">
      <h5>{item.productId?.name}</h5>
      <p><strong>Cloth:</strong> {item.cloth}</p>
      <p><strong>Material:</strong> {item.clothMaterial}</p>
      <p>
        <strong>Color:</strong>{" "}
        <span
          style={{
            background: item.color,
            padding: "0 10px",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          {item.color}
        </span>
      </p>
      <p><strong>Quantity:</strong> {item.totalCount}</p>
      <p><strong>Total Amount:</strong> ₹{item.totalAmount.toFixed(2)}</p>
    </div>

    <hr />
  </div>
))}

<div className="row d-flex justify-content-between">
  {/* Order Summary */}
  <div className="col-lg-4 text-start p-3">
            <div className="d-flex flex-column justify-content-between h-100">
              <div>
                <p>Total Products: {totalProducts}</p>
                <hr />
                <p>Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
              </div>
              <div className="d-flex flex-lg-row flex-column justify-content-between">
                <button
                  className="btn btn-success rounded-5 px-4 py-2 mb-lg-0 mb-3"
                  onClick={() => handleViewDetails(order._id)}
                  disabled={order.cancelStatus === "cancelled"}
                >
                  View Details
                </button>
                <button
                  className="btn btn-danger rounded-5 px-4 py-2"
                  onClick={() => handleOpenCancel(order.orderId)}
                  disabled={order.cancelStatus === "cancelled"} 
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
          
          

          {/* Order Actions */}
          <div className="col-lg-5 p-3">
            <div className="d-flex flex-column justify-content-between h-100">
              <p className="text-end mb-3">
                <strong>Order Id:</strong> {order.orderId}
              </p>
              <div className="d-flex flex-lg-row flex-column justify-content-between">
                <button
                  className="btn btn-primary rounded-5 px-4 py-2 mb-lg-0 mb-3"
                  disabled={order.balancePayment === 0 || order.cancelStatus === "cancelled" }
                >
                  {order.balancePayment === 0
                    ? "Payment Done"
                    : "Pay Advance"}
                </button>
                <button
                  className="btn btn-primary rounded-5 px-4 py-2"
                  onClick={() => handlePayment(order.orderId)}
                  disabled={order.balancePayment === 0 || order.cancelStatus === "cancelled" }
                >
                  {order.balancePayment === 0
                    ? "Payment Done"
                    : "Pay Full Amount"}
                </button>
                
              </div>
              
            </div>
          </div>
</div>



          
        </div>
      );
    })
  ) : (
    <div className="text-center mt-5">
      <h5>Your order is empty 😕</h5>
      <button
        className="btn btn-primary mt-3 px-4 py-2 rounded-pill"
        onClick={() => navigate("/product")}
      >
        Continue Shopping
      </button>

    </div>
  )
)}
{activeTab === "stock" && (
            <StockOrder></StockOrder>
          )}
        </div>
        <CancelOrderModal
  show={showCancelModal}
  onHide={() => setShowCancelModal(false)}
  orderId={selectedOrderId}
  onCancelSuccess={(cancelledOrderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === cancelledOrderId
          ? { ...order, cancelStatus: "cancelled" }
          : order
      )
    );
  }}
/>

      </div>
      
    </>
  );
};

export default OrderDetail;
