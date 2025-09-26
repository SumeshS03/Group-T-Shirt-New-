import React,{useState,useEffect} from 'react'
import HomeHeader from "../Layout/HomeHeader";
import { useNavigate } from "react-router-dom";
import {
  addproducttopayment,
  getproductdetail,
} from "../ApiFunctions/Continuepayment";
import Footer from "../Layout/Footer";
import CustomerDetailAddModal from "./CustomerDetailAddModal";
import CartContext from './CartContext';
import { IoCartOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const CartTab = () => {
    const [activeTab, setActiveTab] = useState("product");
    const [show, setShow] = useState(false);
    const [hasGst, setHasGst] = useState(false);
    const [gstNumber, setGstNumber] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const customerdetail = JSON.parse(localStorage.getItem("customer"));
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

      //get the product detail and store
      useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
          try {
            const data = await getproductdetail(); // ✅ call function
            if (data) {
              setCartItems(data); // ✅ set state
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
          finally {
        setLoading(false);
      }
        };
    
        fetchProduct();
      }, []);
    
      //scroll to the top
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);



    //continue payment function
    
      const continuepayment = async () => {
        try {
          // example payload, replace with your real cart details
          const customerId = localStorage.getItem("customerId");
          const customer = JSON.parse(localStorage.getItem("customer"));
    
          // Transform cartItems into the format backend needs
          const transformedCartItems = cartItems.map((item) => ({
            productId: {
              _id: item.productId._id,
              name: item.productId.name,
              description: item.productId.description,
            },
            quantityCount: item.quantityCount,
            logoCount: item.logoCount,
            deliveryDate: item.deliveryDate,
            color: item.color,
            collarColor: item.collarColor,
            cloth: item.cloth,
            clothMaterial: item.clothMaterial,
            logos: item.logos || [],
            quantitySizeWise: item.quantitySizeWise,
            quantitySleeveWise: item.quantitySleeveWise,
            totalCount: item.totalCount,
            remark: item.remark,
            amount: item.amount,
            totalAmount: item.grandTotal,
          }));
    
          const cartdetail = {
            customerId: customerId,
            customerName: customer.name,
            customerMobile: customer.mobile,
            customerEmail: customer.email,
            deliveryAddress: customer.address,
            gstNumber: gstNumber,
            cartItems: transformedCartItems,
          };
          // console.log("Payload sending to backend:", cartdetail);
          const res = await addproducttopayment(cartdetail);
          // console.log("Payment created:", res);
          if (res.message === "Order created successfully") {
            navigate("/orders");
          }
        } catch (err) {
          console.error("Payment error:", err);
        }
      };

  return (
    <>
    <div>
        <HomeHeader />
      </div>

    <div className="container mt-5 d-flex align-items-center justify-content-center">
        <div className="row w-75">
          <div className="fw-bold shopping-cart-text">Shopping cart</div>
        </div>
      </div>

        <div className='container text-start mt-5 mb-5'>
            <div className='row'>
            <div className="col-lg-7 p-1">
  <div className="d-flex justify-content-center gap-4">
    <button
      className={`btn ${activeTab === "product" ? "btn-primary" : "btn-outline-primary"}`}
      onClick={() => setActiveTab("product")}
    >
      Product Cart
    </button>
    <button
      className={`btn ${activeTab === "ready" ? "btn-primary" : "btn-outline-primary"}`}
      onClick={() => setActiveTab("ready")}
    >
      Ready Stock
    </button>
  </div>
            </div>
            <div className="col-lg-5 p-3">
            {customerdetail ? (
              <>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="productnametext m-0">Customer Details</h4>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setShow(true)}
                  >
                    Edit
                  </button>
                </div>

                <p>
                  <strong>Name:</strong> {customerdetail.name}
                </p>
                <hr />
                <p>
                  <strong>Email:</strong> {customerdetail.email}
                </p>
                <hr />
                <p>
                  <strong>Mobile No:</strong> {customerdetail.mobile}
                </p>
                <hr />
                <p>
                  <strong>Address:</strong> {customerdetail.address}
                </p>
                <hr />

                {/* GST Details */}
                <h4 className="productnametext">GST Details</h4>
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="gstCheck"
                    checked={hasGst}
                    onChange={(e) => setHasGst(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="gstCheck">
                    Do you have GST No?
                  </label>
                </div>

                {hasGst && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter GST Number"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      className="form-control"
                    />
                  </div>
                )}
                <hr />

                {/* Price Details */}
                <h4 className="productnametext">Price Details</h4>
                <p>Total Amount ({cartItems.length} Products)</p>
                <hr />
                <p>
                  <strong>Total Amount: ₹</strong>
                  <strong>
                    {cartItems.reduce(
                      (acc, item) => acc + (item.grandTotal || 0),
                      0
                    )}
                  </strong>
                </p>
                <hr />

                <div className="text-center mt-3">
                  <button
                    className="btn btn-primary rounded"
                    type="button"
                    onClick={continuepayment}
                  >
                    Place Order
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center p-4">
                <h5>No Customer Details Found</h5>
                <p className="text-muted">
                  Please log in to continue with your order.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/profile")} // ✅ redirect user
                >
                  Login Now
                </button>
              </div>
            )}
          </div>
          <div className='col-lg-7 p-1'>
            {loading ? (
            <div>Loading…</div>
          ) : activeTab === "product" ? (
            <CartContext></CartContext>
          ) : (
           <>Cart</>
          )}
          </div>
        </div>
        </div>




        <div className="social container-fluid  ">
                <div class="row justify-content-center">
                  <div className="sociladivider   d-flex justify-content-around text-white">
                    <div className="d-flex align-items-center justify-content-center socialone col-2 ">
                      <text className="socialtexts" style={{ color: "white" }}>
                        Facebook
                      </text>
                    </div>
                    <div className="d-flex align-items-center justify-content-center socialone col-2">
                      <text className="socialtexts" style={{ color: "white" }}>
                        Twitter
                      </text>
                    </div>
                    <div className="d-flex align-items-center justify-content-center socialone col-2">
                      <text className="socialtexts" style={{ color: "white" }}>
                        Instagram
                      </text>
                    </div>
                    <div className="d-flex align-items-center justify-content-center socialone col-2">
                      <text className="socialtexts" style={{ color: "white" }}>
                        Youtube
                      </text>
                    </div>
                    <div className="d-flex align-items-center justify-content-center socialone col-2">
                      <text className="socialtexts" style={{ color: "white" }}>
                        Pinterest
                      </text>
                    </div>
                  </div>
                </div>
              </div>
              <Footer></Footer>
              <CustomerDetailAddModal
                show={show}
                onClose={() => setShow(false)}
              ></CustomerDetailAddModal>
    </>
  )
}

export default CartTab