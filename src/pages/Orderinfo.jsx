import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeHeader from "../Layout/HomeHeader";
import Footer from "../Layout/Footer";
import {viewdetails} from '../ApiFunctions/Continuepayment'

const Orderinfo = () => {
  const { id } = useParams();

  const [order,setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const customer = JSON.parse(localStorage.getItem("customer"));
  



   // fetch order product detail
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await viewdetails(id); // 👈 call API
        console.log("all product detail",res.order);
        setOrder(res.order); // 👈 adjust based on your API response
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);




  return (
    <>
    <HomeHeader></HomeHeader>
      
      <div className="container-fluid">
  <div className="container py-5" style={{ minHeight: "100vh" }}>
    <h2 className="mb-4">Order Info Page</h2>

    {/* Order Summary Section */}
    <div className="card shadow-sm p-4 mb-4 mx-auto">
  <div className="row text-center">
    <div className="col-md-4 col-12 mb-2 fw-bold ">
      <strong className="productnametext">Production Status:</strong>{" "}
      {order?.productionStatus || "NO Order Place"}
    </div>
    <div className="col-md-4 col-12 mb-2 fw-bold">
      <strong className="productnametext">Design Approval:</strong>{" "}
      {order?.designApprovalStatus || "NO Order Place" }
    </div>
    <div className="col-md-4 col-12 mb-2 fw-bold">
      <strong className="productnametext">Advance Payment:</strong>{" "}
      {order?.amountPaid !== undefined ? `₹${order.amountPaid}` : "NO Order Place"}
    </div>
  </div>
</div>


    {/* Products Section */}
    <div className="row">
  {/* Left Side - Products */}
  <div className="col-7 p-2">
    {order?.items?.map((item, index) => (
      <div className="card shadow-sm p-2 mb-4" key={index}>
        <div className="row">
          {/* Product Image */}
          <div className="col-2">
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/${item?.productId?.images?.[0]}`} // 👈 Adjust based on API response
              alt={item.productName}
              className="img-fluid rounded"
            />
          </div>

          {/* Product Info */}
          <div className="col-10">
            <div className="text-start">
              <p><strong className="productnametext">{item.productId.name}</strong></p>
              <p>
                Quantity: {item.quantityCount} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cloth:{" "}
                {item.clothMaterial}
              </p>
              <p>Amount: ₹{item.amount}</p>
              <p>Total Amount: ₹{item.totalAmount}</p>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="row text-start">
          <p><strong className="productnametext">Delivery Detail:</strong></p>
          <p>
            Your order will be delivered to your address on{" "}
            <strong>{item.deliveryDate
  ? new Date(item.deliveryDate).toLocaleDateString("en-GB").replace(/\//g, "-")
  : "Pending"}</strong>
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Right Side - Payment Summary */}
  <div className="col-5 text-start p-2">
    <h4 className="productnametext">Order Payment Details</h4>
    {order?.items?.map((item, i) => (
      <p key={i}>{item.productId.name} - ₹{item.totalAmount}</p>
    ))}
    {/* <p>Convenience Fee: ₹{order?.order?.convenienceFee || 0}</p>
    <p>Discount: {order?.order?.discount || 0}%</p> */}
    <hr />
    <p>Total: ₹{order?.totalAmount || 0}</p>
    <p>Pay Advance: ₹{order?.amountPaid || 0}</p>
    <hr></hr>
    <p><strong>Balance Payment:  ₹{order?.balancePayment || 0}</strong></p>
    <hr></hr>
    <h4 className="productnametext">Delivery Adress</h4>
    {customer && (
      <div>
        <p>{customer.name}</p>
        <p>{customer.address}</p>
        <p>Ph. No: {customer.mobile}</p>
        <p>Email: {customer.email}</p>
      </div>
    )}


  </div>
</div>

   
  </div>
</div>

    <Footer></Footer>  
    </>
  );
};

export default Orderinfo;
