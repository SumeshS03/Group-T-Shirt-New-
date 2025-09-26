import React, { useState, useEffect } from "react";
import { stockdetailcustomer } from "../ApiFunctions/StockPayment"; 
import { useNavigate } from "react-router-dom";
import CancelStockModel from "./CancelStockModel";
import { handlePayment } from "../ApiFunctions/PaymentGateway";
import OrderCountdown from "./OrderCountdown";

const StockOrder = () => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
    const fetchStockOrders = async () => {
      try {
        const data = await stockdetailcustomer();
        if (data) {
          setOrderDetail(data.data || []); // ✅ store API response
          
        }
      } catch (error) {
        console.error("Error fetching stock orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockOrders();
  }, []);


  //scroll
  useEffect(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}, []);

  if (loading) return <p>Loading stock orders...</p>;


  //open cancel order
   const handleOpenCancel = (orderId) => {
    setSelectedOrderId(orderId); // ✅ store which order we are cancelling
    setShowCancelModal(true);    // ✅ open modal
  };

  return (
    <>
   
    

      {orderDetail.length > 0 ? (
        orderDetail.map((order) => {
          if (order.orderStatus === "Cancelled") return null;
          const totalProducts = order.items?.reduce(
            (acc, item) => acc + (item.quantity || 0),
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
              {order.items.map((item, idx) => (
  <div className="row mb-3" key={idx}>
    {/* Image */}
    <div className="col-lg-3 p-3">
      <img
        src={`${process.env.REACT_APP_IMAGE_URL}/${item.stockId?.images[0]}`}
        alt={`product-${idx}`}
        className="img-fluid rounded-3 product-imgorder"
        style={{ width: "100%", height: "200px", objectFit: "contain" }}
      />
    </div>

    {/* Details */}
    <div className="col-lg-9 d-flex flex-column justify-content-between p-3 text-start">
      <h5>{item.stockId?.productName}</h5>
      <p><strong>Cloth:</strong> {item.stockId.clothType}</p>
      <p><strong>SleeveType:</strong> {item.stockId.sleeveType}</p>
      {/* <p>
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
      </p> */}
      <p><strong>Quantity:</strong> {item.quantity}</p>
      <p><strong>Total Amount:</strong> ₹{item.totalAmount}</p>
       {item.logos && item.logos.length > 0 && (
        <div className="mt-3">
          <h6>Logos:</h6>
          <div className="d-flex flex-wrap gap-3">
            {item.logos.map((logo, logoIdx) => (
              <div
                key={logoIdx}
                className="border rounded p-2 text-center"
                style={{ width: "150px" }}
              >
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}${logo.photo}`}
                  alt={logo.logotype}
                  className="img-fluid rounded"
                  style={{ width: "100%", height: "80px", objectFit: "contain" }}
                />
                <p className="m-1"><strong>{logo.logotype}</strong></p>
                <p className="m-1 text-muted">
                  Position: {logo.position}
                </p>
                {/* <button
                  className="btn btn-sm btn-primary"
                  onClick={() => window.open(
                    `${process.env.REACT_APP_IMAGE_URL}${logo.photo}`,
                    "_blank"
                  )}
                >
                  View
                </button> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <hr />
    
  </div>
))}

<div className="col-lg-12 mt-3">
  <h6 className="fw-bold border-bottom pb-2">Delivery Address</h6>
  <div className="p-2 border rounded bg-light">
    <span className="text-dark">{`${order.deliveryDetails.name}, ${order.deliveryDetails.addressLine1}, ${order.deliveryDetails.city}, ${order.deliveryDetails.state} - ${order.deliveryDetails.
postalCode}`}</span>
<p><strong>Contact Number:</strong>{order.deliveryDetails.phone}</p>
  </div>
</div>

<div className="row">
  <div className="col-lg-12 d-lg-flex justify-content-between text-start mt-3">
    {/* <div><strong>Order Status : {order.orderStatus}</strong></div> */}
    <div><strong>Payment Status : {order.paymentStatus}</strong></div>
    </div>
</div>

<div className="row d-flex justify-content-between">
  {/* Order Summary */}
  <div className="col-lg-4 text-start p-3">
            <div className="d-flex flex-column justify-content-between h-100">
              <div>
                <p>Total Products: {totalProducts}</p>
                <hr />
                <p>Total Amount: ₹{order.grandTotal}</p>
              </div>
              <div className="d-flex flex-lg-row flex-column justify-content-between">
                {/* <button
                  className="btn btn-success rounded-5 px-4 py-2 mb-lg-0 mb-3"
                  onClick={() => navigate(`/stockorderdetail/${order._id}`)}
                  disabled={order.orderStatus === "Cancelled"} 
                >
                  View Details
                </button> */}
                <button
                  className="btn btn-danger rounded-5 px-4 py-2"
                  onClick={() => handleOpenCancel(order.orderId)}
                  disabled={order.orderStatus === "Cancelled"}  
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
                  disabled={order.balancePayment === 0 || order.orderStatus === "Cancelled" }
                >
                  {order.balancePayment === 0
                    ? "Payment Done"
                    : "Pay Advance"}
                </button>
                <button
                  className="btn btn-primary rounded-5 px-4 py-2"
                  onClick={() => handlePayment(order.orderId)}
                  disabled={order.balancePayment === 0 || order.orderStatus === "Cancelled" }
                >
                  {order.balancePayment === 0
                    ? "Payment Done"
                    : "Pay Full Amount"}
                </button>
                
              </div>
              
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-end" >
              {order.orderStatus === "Pending" && (
                <OrderCountdown
  createdAt={order.createdAt}
  orderStatus={order.orderStatus}
  orderId={order.orderId}
  onExpire={async (expiredOrderId) => {
    // Update locally
    setOrderDetail(prevOrders =>
      prevOrders.map(order =>
        order.orderId === expiredOrderId
          ? { ...order, orderStatus: "Cancelled" }
          : order
      )
    );
     // Auto-cancel API call
      await handleOpenCancel(expiredOrderId);

    
  }}
/>

              )}
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
      )}
    <CancelStockModel
    show={showCancelModal}
    onHide={() => setShowCancelModal(false)}
    orderId={selectedOrderId}
    onCancelSuccess={(cancelledOrderId) => {
    setOrderDetail((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === cancelledOrderId
          ? { ...order, orderStatus: "Cancelled" }
          : order
      )
    );
  }}
    ></CancelStockModel>
    
    </>
  )
}

export default StockOrder