import React, { useState, useEffect } from "react";
import { getOrderProduct } from "../ApiFunctions/Continuepayment";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { handlePayment } from "../ApiFunctions/PaymentGateway";
import StockOrder from "./StockOrder";
import { useLocation } from "react-router-dom";
import CancelOrderModal from "./CancelOrderModel";
import CountdownTimer from "./Countdown";
import { cancelProduct } from "../ApiFunctions/CancelOrders";
import { Select } from 'antd';

const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("product");
  const location = useLocation();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(orders.designApprovalStatus || "pending");


  const deliveryTimeRanges = [
    { min: 1, max: 10, days: 10 },
    { min: 11, max: 20, days: 10 },
    { min: 21, max: 30, days: 10 },
    { min: 31, max: 40, days: 10 },
    { min: 41, max: 50, days: 10 },
    { min: 51, max: 60, days: 10 },
    { min: 61, max: 70, days: 10 },
    { min: 71, max: 80, days: 10 },
    { min: 81, max: 90, days: 10 },
    { min: 91, max: 100, days: 12 },
    { min: 101, max: 200, days: 12 },
    { min: 201, max: 300, days: 12 },
    { min: 301, max: 400, days: 13 },
    { min: 401, max: 500, days: 13 },
    { min: 501, max: 600, days: 13 },
    { min: 601, max: 700, days: 14 },
    { min: 701, max: 800, days: 14 },
    { min: 801, max: 900, days: 14 },
    { min: 901, max: 1000, days: 14 },
    { min: 1001, max: 2000, days: 16 },
    { min: 2001, max: 3000, days: 16 },
    { min: 3001, max: 4000, days: 17 },
    { min: 4001, max: 5000, days: 17 },
    { min: 5001, max: 6000, days: 18 },
    { min: 6001, max: 7000, days: 18 },
    { min: 7001, max: 8000, days: 19 },
    { min: 8001, max: 9000, days: 19 },
    { min: 9001, max: 10000, days: 20 },
    { min: 10001, max: 20000, days: 22 },
    { min: 20001, max: 30000, days: 22 },
    { min: 30001, max: 40000, days: 24 },
    { min: 40001, max: 50000, days: 24 },
    { min: 50001, max: 60000, days: 26 },
    { min: 60001, max: 70000, days: 26 },
    { min: 70001, max: 80000, days: 28 },
    { min: 80001, max: 90000, days: 28 },
    { min: 90001, max: 100000, days: 30 }
  ];

  //calculate delivery date
  const getDeliveryDays = (quantity) => {
  const range = deliveryTimeRanges.find(
    (r) => quantity >= r.min && quantity <= r.max
  );
  return range ? range.days : 10; // fallback to 10 days if not found
};

//scroll
useEffect(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}, []);


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
          className="container d-flex flex-column justify-content-center "
          // style={{ minHeight: "100vh" }}
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
      if (order.cancelStatus === "cancelled") return null;
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
      width: "20px",
      height: "20px",
      backgroundColor: item.color,
      borderRadius: "50%",
      display: "inline-block",
      border: "1px solid #ccc",
      marginLeft: "8px",
      verticalAlign: "middle",
    }}
  ></span>
  {/* <span style={{ marginLeft: "8px" }}>{item.color}</span> */}
</p>
      <p><strong>Quantity:</strong> {item.totalCount}</p>
      <p><strong>Total Amount:</strong> ₹{item.totalAmount.toFixed(2)}</p>
      <p>
        Delivery in {getDeliveryDays(item.totalCount)} days after payment is done
      </p>
      {/* ✅ Logos Section */}
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
    <span className="text-dark">{order.deliveryDetails}</span>
  </div>
</div>
{(order.balancePayment === 0 || order.advancePaid > 0) && (
  <div className="col-lg-12 mt-1 d-flex flex-column justify-content-center align-items-center">
  <div className="h6 mb-2">Your Design</div>

  <div
  className="d-flex justify-content-center align-items-center rounded-3"
  style={{
    width: "100px",
    height: "100px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
  }}
>
  {order.productId?.images?.[0] ? (
    <img
      src={`${process.env.REACT_APP_IMAGE_URL}/${order.productId.images[0]}`}
      alt={`product-${order.productId?._id}`}
      className="img-fluid rounded-3"
      style={{
        width: "100px",
        height: "100px",
        objectFit: "contain",
      }}
      onError={(e) => {
        e.target.style.display = "none";
        e.target.parentNode.innerHTML =
          '<span class="text-muted small fw-semibold">Upload Soon</span>';
      }}
    />
  ) : (
    <span className="text-muted small fw-semibold">Upload Soon</span>
  )}
</div>
{/* {order.productId?.images?.length > 1 && ( */}
  <div className="text-center w-100">
      <label className="mt-2 fw-bold mb-2">Approval</label>
      <div className="w-100 d-flex justify-content-center align-items-center">
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="changes requested">Changes Requested</option>
        </select>
      </div>

      <button
        className="btn btn-primary mt-2"
        disabled={selectedStatus === "pending"} // 👈 disabled until user selects other value
        onClick={() => {
          console.log("Status updated to:", selectedStatus);
          // call API to update status here
        }}
      >
        Status Update
      </button>
    </div>
{/* )} */}
</div>

)}


<div className="row mt-4 mb-4 d-flex justify-content-between">
  <div className="col-lg-4 text-lg-start text-start mb-lg-0 mb-2"><strong>Design Approval Status : {order.designApprovalStatus}</strong></div>
  <div className="col-lg-4 text-lg-center text-start mb-lg-0 mb-2"><strong>Production Status : {order.productionStatus}</strong></div>
  <div className="col-lg-4 text-lg-end text-start"><strong>Delivery Status : {order.deliveryStatus}</strong></div>
</div>

<div className="row d-flex justify-content-between">
  {/* Order Summary */}
  <div className="col-lg-4 text-start p-3">
            <div className="d-flex flex-column justify-content-between h-100">
              <div>
                <p>Total Products: {totalProducts}</p>
                <p>Advance Amount: ₹ {order.advancePaid}</p>
                <hr />
                <p>Total Amount: ₹ {order.totalAmount}</p>
              </div>
              <div className="d-flex flex-lg-row flex-column justify-content-between">
                {/* <button
                  className="btn btn-success rounded-5 px-4 py-2 mb-lg-0 mb-3"
                  onClick={() => handleViewDetails(order._id)}
                  disabled={order.cancelStatus === "cancelled"}
                >
                  View Details
                </button> */}
                <button
                  className="btn btn-danger rounded-5 px-4 py-2"
                  onClick={() => handleOpenCancel(order.orderId)}
                  disabled={order.cancelStatus === "cancelled" || order.advancePaid > 0 || order.balancePayment === 0 || order.amountPaid > 0} 
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
          <div className="row">
  <div className="col-lg-12 text-end">
    {order.amountPaid === 0 && (
  <CountdownTimer 
  createdAt={order.createdAt} 
  orderId={order.orderId} 
  advancePaid={order.advancePaid} 
  onExpire={async (expiredOrderId) => {
    try {
      await cancelProduct(expiredOrderId); // ✅ Call API directly
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.orderId === expiredOrderId
            ? { ...o, cancelStatus: "cancelled" }
            : o
        )
      );
    } catch (err) {
      console.error("Auto cancel failed:", err);
    }
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
