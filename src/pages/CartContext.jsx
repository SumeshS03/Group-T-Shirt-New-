import React, { useState, useEffect } from "react";
import HomeHeader from "../Layout/HomeHeader";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import "./CartContext.css";
import "./Shopcontentproduct.css";
import Footer from "../Layout/Footer";
import {
  addproducttopayment,
  getproductdetail,
  addstocktopayment,
} from "../ApiFunctions/Continuepayment";
import { useNavigate,useLocation } from "react-router-dom";
import CustomerDetailEditModal from "./CustomerDetailEditModal";
import { IoCartOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { getstockdetail,handleDeleteStock } from "../ApiFunctions/Stockdetail";

const CartContext = () => {
  const [show, setShow] = useState(false);
  const [hasGst, setHasGst] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState("product");
  const [stockDetail,setStockDetail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const customerdetail = JSON.parse(localStorage.getItem("customer"));
  const BASE_URL_IMAGE = process.env.REACT_APP_IMAGE_URL;

  //get the product detail and store
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getproductdetail(); // ✅ call function
        if (data) {
          setCartItems(data); // ✅ set state
        }
        
      } catch (error) {
       if (error.response && error.response.data?.message === "Invalid token") {
        localStorage.removeItem("authToken");
        navigate("/profile"); // optional redirect
      }
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  //get stock product detail ans store

  useEffect(() =>{
    const fetchProduct = async () =>{
      try{
        const data = await getstockdetail();
        if(data){
          setStockDetail(data);
        }

      }catch(error){
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [])


  //scroll to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //delete the added product in the cart

  const handleDelete = async (itemId) => {
    const storedCustomerId = localStorage.getItem("customerId");
    const token = localStorage.getItem("authToken");
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    try {
      // ✅ Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // ✅ Only delete if user clicks OK
        const response = await axios.post(
          `${BASE_URL}/cartItems/delete`,
          {
            cartItemId: itemId,
            customerId: storedCustomerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire(
          "Deleted!",
          response.data?.message || "Item deleted successfully!",
          "success"
        );

        // ✅ Update state
        setCartItems((prev) => prev.filter((item) => item._id !== itemId));
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error deleting item.";
      console.error("Delete error:", errorMsg);
      Swal.fire("Error", errorMsg, "error");
    }
  };

  //delete stock added product

  const deletestockproduct = async (id) =>{
    try{
      const result = await handleDeleteStock(id);
      if (result) {
        setStockDetail((prev) => prev.filter((item) => item._id !== id));
      }
      
    }
    catch{

    }
  }

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


  function addDaysToDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0]; // returns YYYY-MM-DD
}


  const continuestockpay = async () =>{
    try {
      // example payload, replace with your real cart details
      const customerId = localStorage.getItem("customerId");
      const customer = JSON.parse(localStorage.getItem("customer"));
      // ✅ set delivery date 7 days from today
    const deliveryDate = addDaysToDate(7);
      

      const cartdetail = {
      customerId: customerId,
      deliveryDetails: {
        name: customer?.name || "",
        phone: customer?.mobile || "",
        email: customer?.email || "",
        addressLine1: customer?.address || "",
        addressLine2: customer?.address?.line2 || "",
        city: customer?.address || "",
        state: customer?.address || "",
        postalCode: customer?.address?.pincode || "623315"
      },
      deliveryDate: deliveryDate, // take from your state/input
      remark: "",             // take from your state/input
      gstNumber: gstNumber || ""        // optional if backend supports
    };
    console.log("Payload sending to backend:", cartdetail);
      // console.log("Payload sending to backend:", cartdetail);
      const res = await addstocktopayment(cartdetail);
      // console.log("Payment created:", res);
      if (res.message === "Order created successfully and stock updated") {
        // navigate("/orders");
        navigate("/orders", { state: { openTab: "stock" } });
      }
      
    } catch (err) {
      console.error("Payment error:", err);
    }
    

    

  }


  // ✅ Check if we came from Product or Ready
  useEffect(() => {
    if (location.state?.openTab) {
      setActiveTab(location.state.openTab);
    }
  }, [location.state]);

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

      <div className="container text-start mt-5 mb-5">
        <div className="row">

          <div className="col-lg-7 p-1">
            <div className="productcatoutbox p-5 rounded bg-white mb-2">
              <div className="d-flex justify-content-center gap-3 mb-5">
          <button className={`btn ${activeTab === "product" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setActiveTab("product")}>Product Cart</button>
          <button className={`btn ${activeTab === "ready" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setActiveTab("ready")}>Ready Stock</button>
        </div>
                {/* ✅ Show Product Cart only when activeTab is "product" */}
  {activeTab === "product" ? (
  cartItems && cartItems.length > 0 ? (
    cartItems.map((product, index) => (
      <div key={product.id} className="row align-items-center mb-3 product-row">
        {/* Product Image */}
        <div className="col-3">
          <div className="ratio ratio-1x1 border rounded overflow-hidden">
            <img
              src={`${BASE_URL_IMAGE}${product.productId.images[0]}`}
              alt={product.name}
              className="img-fluid object-fit-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-7">
          <h6 className="fw-bold mb-1 productnametext">
            {product.productId.name}
          </h6>
          <p className="m-0">
            Quantity: {product.quantityCount} &nbsp;&nbsp; Material:{" "}
            {product.clothMaterial}
          </p>
          <p className="m-0">Price: {product.amount}</p>
          <p className="m-0">Total: {product.grandTotal}</p>
          <p className="m-0">Delivery: {product.deliveryDate}</p>
        </div>

        {/* Action Buttons */}
        <div className="col-2 text-end d-flex flex-column align-items-end gap-2">
          <MdEdit
            className="rounded-circle text-primary"
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => navigate(`/updateproduct/${product._id}`)}
          />
          <MdDelete
            className="rounded-circle text-danger top-0"
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleDelete(product._id)}
          />
        </div>

        {/* Logos */}
        {Array.isArray(product.logos) && product.logos.length > 0 && (
          <div className="mt-3">
            <strong>Logos:</strong>
            <div className="d-flex flex-wrap gap-3 mt-2">
              {product.logos.map((logo, idx) => (
                <div key={idx} className="text-center">
                  <img
                    src={`https://gts.tsitcloud.com/${logo.photo?.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={logo.logotype}
                    className="img-thumbnail"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                    }}
                  />
                  <div className="small mt-1">{logo.position}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ))
  ) : (
    <div className="text-center my-5">
      <h5 className="text-muted">
        <span className="me-2">
          <IoCartOutline size={30} />
        </span>
        Add product to cart and continue
      </h5>
    </div>
  )
) : activeTab === "ready" ? (
  stockDetail && stockDetail.length > 0 ? (
    <div>
      {stockDetail.map((item, idx) => (
              <div key={item.id} className="row align-items-center mb-3 product-row">
                {/* Product Image */}
        <div className="col-3">
          <div className="ratio ratio-1x1 border rounded overflow-hidden">
            <img
              src={`${BASE_URL_IMAGE}${item.stockId.images[0]}`}
              alt={item.name}
              className="img-fluid object-fit-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-7">
          <h6 className="fw-bold mb-1 productnametext">
            {item.stockId.productName}
          </h6>
          <p className="m-0">
            Quantity: {item.quantity} &nbsp;&nbsp; Material:{" "}
            {item.stockId.clothType}
          </p>
          <p className="m-0">Price: {item.price}</p>
          <p className="m-0">Total: {item.totalAmount}</p>
          <p className="m-0">Delivery: {item.deliveryDate}</p>
        </div>

        {/* Action Buttons */}
        <div className="col-2 text-end d-flex flex-column align-items-end gap-2">
          <MdEdit
            className="rounded-circle text-primary"
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => navigate(`/updatestock/${item._id}`)}
          />
          <MdDelete
            className="rounded-circle text-danger top-0"
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => deletestockproduct(item._id)}
          />
        </div>
                </div>
      ))}
    </div>
  ) : (
    <div className="text-center my-5">
      <h5 className="text-muted">
        <span className="me-2">
          <IoCartOutline size={30} />
        </span>
        Ready stock cart empty
      </h5>
    </div>
  )
) : null}

            </div>
            <div className="text-center mt-3">
              <button
                className="btn btn-primary rounded"
                onClick={() => navigate("/product")}
              >
                Continue Shopping
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
                {activeTab === "product" && (
  <p>
    <strong>Total Amount: ₹</strong>
    <strong>
      {cartItems.reduce(
        (acc, item) => acc + (Number(item.grandTotal) || 0),
        0
      )}
    </strong>
  </p>
)}
{activeTab === "ready" && (
  <p>
    <strong>Total Amount: ₹</strong>
    <strong>
      {Array.isArray(stockDetail)
        ? stockDetail.reduce(
            (acc, item) => acc + (Number(item.totalAmount) || 0),
            0
          )
        : 0}
    </strong>
  </p>
)}


               
                <hr />
{activeTab === "product" && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-primary rounded"
                    type="button"
                    onClick={continuepayment}
                  >
                    Place Order
                  </button>
                </div>
)}
{activeTab === "ready" && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-primary rounded"
                    type="button"
                    onClick={continuestockpay}
                  >
                    Place Order
                  </button>
                </div>
)}
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
        </div>
      </div>

      {/* <CustomerDetails customerdetail={customerdetail}></CustomerDetails> */}

      <div className="social container-fluid ">
        <div class="row justify-content-center">
          <div className="sociladivider d-flex justify-content-around text-white">
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
      <CustomerDetailEditModal
        show={show}
        onClose={() => setShow(false)}
      ></CustomerDetailEditModal>
    </>
  );
};

export default CartContext;
