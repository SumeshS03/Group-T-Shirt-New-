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
import CustomerDetailAddModal from "./CustomerDetailAddModal";
import { IoCartOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { getstockdetail,handleDeleteStock } from "../ApiFunctions/Stockdetail";
import {getuseraddressdetail,deleteuseraddress} from "../ApiFunctions/CustomerAdress"
import CustomerAdressEditModal from "./CustomerAdressEditModal";

const CartContext = () => {
  const [show, setShow] = useState(false);
  const [hasGst, setHasGst] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState("product");
  const [stockDetail,setStockDetail] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
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
    const customerId = localStorage.getItem("customerId");
    const customer = JSON.parse(localStorage.getItem("customer"));

    // 🔎 Check if any address exists
    if (!addresses || addresses.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Address Found",
        text: "Please add a delivery address before continuing.",
      });
      return;
    }

    // 🔎 Check if an address is selected
    const selectedAddrObj = addresses.find(
      (addr) => addr._id === selectedAddress
    );

    if (!selectedAddrObj) {
      Swal.fire({
        icon: "warning",
        title: "No Address Selected",
        text: "Please select a delivery address before continuing.",
      });
      return;
    }

    // ✅ Transform cart items
    const transformedCartItems = cartItems.map((item) => ({
      productId: {
        _id: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,
      },
      quantityCount: item.quantityCount,
      logoCount: item.logoCount,
      deliveryDate: new Date(
        Date.now() + (item.deliveryDate || 0) * 24 * 60 * 60 * 1000
      ).toISOString(),
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

    // ✅ Final payload
    const cartdetail = {
      customerId: customerId,
      customerName: customer.name,
      customerMobile: customer.mobile,
      customerEmail: customer.email,
      deliveryDetails: `${selectedAddrObj.name}, ${selectedAddrObj.mobile}, ${selectedAddrObj.addressLine1}, ${selectedAddrObj.city}, ${selectedAddrObj.state}, ${selectedAddrObj.postalCode}`,
      gstNumber: gstNumber,
      cartItems: transformedCartItems,
    };

    // 🚀 Send to backend
    const res = await addproducttopayment(cartdetail);
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

        // 🔎 Check if any address exists
    if (!addresses || addresses.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Address Found",
        text: "Please add a delivery address before continuing.",
      });
      return;
    }

    // 🔎 Check if an address is selected
    const selectedAddrObj = addresses.find(
      (addr) => addr._id === selectedAddress
    );

    if (!selectedAddrObj) {
      Swal.fire({
        icon: "warning",
        title: "No Address Selected",
        text: "Please select a delivery address before continuing.",
      });
      return;
    }
      

      const cartdetail = {
      customerId: customerId,
      deliveryDetails: {
        name: selectedAddrObj.name,
        phone: selectedAddrObj.mobile,
        addressLine1: selectedAddrObj.addressLine1,
        city: selectedAddrObj.city,
        state: selectedAddrObj.state,
        postalCode: selectedAddrObj.postalCode,
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

// fetch customer address
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getuseraddressdetail(); 
        console.log("Fetched Addresses:", data.data);   
        setAddresses(data.data);
        if (data.data.length > 0) {
        setSelectedAddress(data.data[0]._id);
      }                        
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses(); // call async function
  }, []);


  // Callback to add new address immediately
  const handleNewAddress = (newAddr) => {
  // Add new address to addresses list
  setAddresses((prev) => [...prev, newAddr]);

  // ✅ Auto-select this new address
  setSelectedAddress(newAddr._id);
};

  const handleAddressDelete = async (id) => {
  try {
    // Confirm deletion with the user
    const confirmDelete = window.confirm("Are you sure you want to delete this address?");
    if (!confirmDelete) return;

    // Call API to delete
    const response = await deleteuseraddress(id);
    console.log("Deleted address:", response);

    // Update local state to remove address immediately from UI
    setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    
    // If the deleted address was selected, reset selectedAddress
    if (selectedAddress === id) setSelectedAddress(null);

  } catch (error) {
    console.error("Failed to delete address:", error);
    alert("Failed to delete address. Please try again.");
  }
};

const handleAddressEdit = (addr) => {
  setEditAddress(addr);   // store the address to edit
  setShowEditModal(true); // open modal
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
  <div className="ratio ratio-1x1 border rounded overflow-hidden d-flex align-items-center justify-content-center bg-light">
    <img
      src={`${BASE_URL_IMAGE}${product.productId.images[0]}`}
      alt={product.name}
      className="img-fluid"
      style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
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
          <p className="m-0">Price: ₹ {product.amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
          <p className="m-0">Total: ₹ {product.grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
          <p className="m-0">Delivery in {product.deliveryDate} days after payment is done</p>
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
          <div className="ratio ratio-1x1 border rounded overflow-hidden d-flex align-items-center justify-content-center bg-light">
            <img
              src={`${BASE_URL_IMAGE}${item.stockId.images[0]}`}
              alt={item.name}
              className="img-fluid"
              style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
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
        {Array.isArray(item.logos) && item.logos.length > 0 && (
          <div className="mt-3">
            <strong>Logos:</strong>
            <div className="d-flex flex-wrap gap-3 mt-2">
              {item.logos.map((logo, idx) => (
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
           
           
                

<div>
      <h4 className="productnametext">Shopping Address</h4>

      {/* List of addresses */}
      <div className="d-flex flex-column gap-3"
  style={{
    maxHeight: "350px", 
    overflowY: "auto",   
  }}
>
          {addresses.map((addr) => (
  <div
    key={addr._id}
    className={`p-3 border rounded-3 position-relative d-flex justify-content-between align-items-start ${
      selectedAddress === addr._id
        ? "border-primary shadow-sm"
        : "border-secondary"
    }`}
    style={{ cursor: "pointer", transition: "0.3s" }}
  >
    {/* Address Info */}
    <div onClick={() => setSelectedAddress(addr._id)} style={{ flex: 1 }}>
      <div><strong>Name:</strong> {addr.name}</div>
      <div><strong>Mobile:</strong> {addr.mobile}</div>
      <div>
        <strong>Address:</strong> {addr.addressLine1}, {addr.city}, {addr.state}
      </div>
      <div><strong>Pincode:</strong> {addr.postalCode}</div>
      <div
  className="address-card p-2 mb-3 mt-2"
  style={{
    backgroundColor: "#f5f5f5", // light gray background
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)", // subtle shadow
    borderRadius: "10px", // rounded corners
    display: "inline-block", // keep compact
    textAlign: "center",
    fontWeight: "500",
    color: "#333",
  }}
>
  {addr.addressName}
</div>

    </div>

    {/* Action Icons */}
    <div className="d-flex flex-column gap-2 ms-3">
      <MdEdit
        className="rounded-circle text-primary"
        size={20}
        style={{ cursor: "pointer" }}
        onClick={(e) => {
    e.stopPropagation(); // prevent selecting the address
    handleAddressEdit(addr._id);
  }}
      />

      {/* Delete Icon */}
      <MdDelete
        className="rounded-circle text-danger"
        size={20}
        style={{ cursor: "pointer" }}
        onClick={(e) => {
    e.stopPropagation(); 
    handleAddressDelete(addr._id);
  }}
      />
    </div>

    {/* Selected Badge */}
    {selectedAddress === addr._id && (
      <span
        className="badge bg-primary position-absolute"
        style={{ top: "10px", right: "10px", fontSize: "0.8rem" }}
      >
       
      </span>
    )}
  </div>
))} 

      </div>

      {/* Add button */}
    <button
  className="btn btn-primary mt-3 d-flex align-items-center justify-content-center fw-bold"
  style={{
    borderRadius: "8px",   // keep it slightly rounded instead of a circle
    fontSize: "16px",
    padding: "8px 16px",   // make room for text
  }}
  onClick={() => setShow(true)}
>
  <span style={{ fontSize: "20px", marginRight: "8px" }}>+</span> Add Address
</button>
    </div>


               

                {/* GST Details */}
                <h4 className="productnametext mt-3">GST Details</h4>
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
                
                <hr />
                {activeTab === "product" && (
                  <>
                  <p>Total Amount ({cartItems.length} Products)</p>
  <p>
    
  <strong>Total Amount: ₹ </strong>
  <strong>
    {(
      cartItems.reduce(
        (acc, item) => acc + (Number(item.grandTotal) || 0),
        0
      )
    ).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
  </strong>
</p>
</>
)}
{activeTab === "ready" && (
  <>
  {/* <p>Total Amount ({cartItems.length} Products)</p> */}
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
  </>
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
      <CustomerDetailAddModal
        show={show}
        onClose={() => setShow(false)}
        onAddressAdded={handleNewAddress} // ✅ Pass callback
      ></CustomerDetailAddModal>
      <CustomerAdressEditModal
  show={showEditModal}
  onClose={() => setShowEditModal(false)}
  addressId={editAddress}
  onSave={(updatedAddr) => {
    setAddresses((prev) =>
      prev.map((a) => (a._id === updatedAddr._id ? updatedAddr : a))
    );
    setShowEditModal(false);
  }}
/>

    </>
  );
};

export default CartContext;
