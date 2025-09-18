import React, { useState, useEffect } from "react";
import { stockdetailcustomer } from "../ApiFunctions/StockPayment"; 
import { useNavigate } from "react-router-dom";
import CancelStockModel from "./CancelStockModel";

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
          const totalProducts = order.items?.reduce(
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
          <div className="col-lg-3 p-3">
            <div>
            <img
             src={`${process.env.REACT_APP_IMAGE_URL}${order.items[0]?.stockId?.images[0]}`}
              alt="product"
              className="img-fluid rounded-3 product-imgorder"
            />
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4 text-start p-3">
            <div className="d-flex flex-column justify-content-between h-100">
              <div>
                <p>Total Products: {totalProducts}</p>
                <hr />
                <p>Total Amount: ₹{order.grandTotal?.toFixed(2) || 0}</p>
              </div>
              <div className="d-flex flex-lg-row flex-column justify-content-between">
                <button
                  className="btn btn-success rounded-5 px-4 py-2 mb-lg-0 mb-3"
                  onClick={() => navigate(`/stockorderdetail/${order._id}`)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-danger rounded-5 px-4 py-2"
                  onClick={() => handleOpenCancel(order.orderId)}
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
                            disabled={order.balancePayment === 0}
                          >
                            {order.balancePayment === 0
                              ? "Payment Done"
                              : "Pay Advance"}
                          </button>
                          <button
                            className="btn btn-primary rounded-5 px-4 py-2"
                            // onClick={() => handlePayment(order.orderId)}
                            disabled={order.balancePayment === 0}
                          >
                            {order.balancePayment === 0
                              ? "Payment Done"
                              : "Pay Full Amount"}
                          </button>
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
    ></CancelStockModel>
    
    </>
  )
}

export default StockOrder