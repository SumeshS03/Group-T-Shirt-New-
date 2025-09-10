import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeHeader from "../Layout/HomeHeader";
import shopimage from "../images/shopimage.png";
import { useNavigate } from "react-router-dom";
import "./Productdetail.css";
import "react-multi-carousel/lib/styles.css";
import "./Stockdetail.css";
import axios from "axios";
import { FaShoppingCart } from 'react-icons/fa';
import Footer from '../Layout/Footer'

const Stockdetail = () => {
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const { id } = useParams();
  const [productdetail, setProductdetail] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
   const [selectedSize, setSelectedSize] = useState("");
  const [enteredQty, setEnteredQty] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
  const fetchProduct = async () => {
    console.log("Current ID:", id);
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `${baseurl}/stocks/grouped-by-category`,
        { headers: { Authorization: `Bearer ${token}` } }
      );


      const allStocks = response.data.flatMap((cat) => 
        cat.stocks.map((stock) => stock)
      );
      console.log("response data",response.data)
      console.log("allProducts" , allStocks);
      
      setProductsData(allStocks);
      
      // Correct comparison using _id as string
      const foundStock = allStocks.find((p) => p._id === id);
      console.log("foundproductid",foundStock)

      if (foundStock) {
        setProductdetail(foundStock);
        
        // Safely set selected image
        if (foundStock.product.images && foundStock.product.images.length > 0) {
          setSelectedImage(`https://gts.tsitcloud.com/${foundStock.product.images[0]}`);
        }
        // Store category ID if needed
        const categoryId = foundStock?.category?._id;
        if (categoryId) localStorage.setItem("categoryId", categoryId);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setIsLoading(false);
    }
  };

  fetchProduct();
}, [id]); 

  if (isLoading) {
    return <div>Loading...</div>;
  }



const handleSubmit = async (e) => {
  e.preventDefault();

  const cusid = localStorage.getItem("customerId");
  if (!cusid) {
    alert("Login and continue");
    navigate("/profile");
    return;
  }

  if (!selectedSize || !enteredQty) {
    alert("Please select a size and enter quantity");
    return;
  }

  const payload = {
    customerId: cusid,
    stockId: productdetail._id,
    quantity: Number(enteredQty),
    size: selectedSize,
    sleeveType: productdetail.sleeveType,
    price: productdetail.priceFromMaterial,
  };

  try {
    const response = await fetch("https://gts.tsitcloud.com/api/stockCart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Order submitted successfully:", result);
      alert("Added to Ready stock cart");
      navigate('/stockcart')
    } else {
      console.error("Failed to submit order:", result);
    }
  } catch (error) {
    console.error("Error while submitting order:", error);
  }
};



  return (
    <>
      <div>
        <HomeHeader />
      </div>

      <div className="about-box d-flex  h-50 flex-column align-items-center ">
        <div className="first-background p-5  mb-4 d-flex text-white ">
          <h1 className="mt-4 aboutustext">ABOUT US</h1>
        </div>
        <p
          className=" w-50 home-contactustext "
          style={{ textAlign: "start", marginLeft: "-23%" }}
        >
          Home - About Us
        </p>
        <img src={shopimage} className="imagetopone" alt="Shop" />
      </div>

      <div className="choose-category  ">
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
          <div className="row w-75 gap-2 pb-5">
            <div
              className={`col-lg-3 col-12 product-page ${
                activeTab === "product" ? "active-tab" : ""
              }`}
              onClick={() => navigate("/product")}
            >
              <h2 className="h4 heading-text-product">Product Page</h2>
            </div>
            <div
              className={`col-lg-3 col-12 new-design-page ${
                activeTab === "new" ? "active-tab" : ""
              }`}
              onClick={() => navigate("/newdesign")}
            >
              <h2 className="h4 heading-text-product">New Design Page</h2>
            </div>
            <div
              className={`col-lg-3 col-12 stock-page ${
                activeTab === "stock" || "/foundProduct/:id" ? "active-tab" : ""
              }`}
              onClick={() => navigate("/stock")}
            >
              <h2 className="h4 heading-text-product">Stock Page</h2>
            </div>
          </div>
        </div>
      </div>

      
        <form onSubmit={handleSubmit} className="mb-5">
            <div className="container mt-5">
              <div className="row">
              <div className="col-lg-5 col-12">
              {productdetail && (
  <>
    <div className="product-imagefulone p-2 position-relative">
      <img
        src={
          hoveredImage ||
          selectedImage ||
          `https://gts.tsitcloud.com/${productdetail.product?.images?.[0] || ''}`
        }
        alt={productdetail.product?.name}
        className="img-fluid"
        style={{
          filter: !productdetail.product?.inStock ? 'blur(2px) grayscale(30%)' : 'none',
          opacity: !productdetail.product?.inStock ? 0.7 : 1,
          transition: 'filter 0.3s ease',
        }}
      />

      {/* Overlay for Out of Stock */}
      {!productdetail.product?.inStock && (
        <div
          className="out-of-stock-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: '#dc3545',
            fontWeight: 'bold',
            fontSize: '1.3rem',
          }}
        >
          Out of Stock
        </div>
      )}
    </div>

    <div className="d-flex mt-4 gap-4 w-100 align-items-start">
      <div
        className="productdetail-image"
        onMouseEnter={() =>
          setHoveredImage(
            `https://gts.tsitcloud.com/${productdetail.product?.images?.[1] || ''}`
          )
        }
        onMouseLeave={() => setHoveredImage(null)}
        style={{
          border: selectedImage === `https://gts.tsitcloud.com/${productdetail.product?.images?.[1] || ''}`
            ? '2px solid blue'
            : '2px solid transparent',
        }}
      >
        <img
          src={`https://gts.tsitcloud.com/${productdetail.product?.images?.[1] || ''}`}
          alt="Second"
          className="img-fluid"
          style={{
            cursor: 'pointer',
            filter: !productdetail.product?.inStock ? 'blur(1px) grayscale(30%)' : 'none',
            opacity: !productdetail.product?.inStock ? 0.7 : 1,
          }}
        />
      </div>
    </div>
  </>
)}

            </div>
            <div className="col-lg-5 col-12 mt-lg-5 mt-0">
  {productdetail && (
    <div className="row g-2 ">
      <div className="col-12 d-flex">
        <div className="fw-bold me-2" style={{ width: "140px" }}>Category:</div>
        <div>{productdetail.product.name}</div>
      </div>
      <div className="col-12 d-flex">
        <div className="fw-bold me-2" style={{ width: "140px" }}>Sleeve Type:</div>
        <div>{productdetail.sleeveType}</div>
      </div>
      <div className="col-12 d-flex">
        <div className="fw-bold me-2" style={{ width: "140px" }}>Material:</div>
        <div>{productdetail.product.material}</div>
      </div>
      <div className="col-12 d-flex">
        <div className="fw-bold me-2" style={{ width: "140px" }}>Material Price:</div>
        <div>₹{productdetail.priceFromMaterial}</div>
      </div>
      <div className="col-12 d-flex">
        <div className="fw-bold me-2" style={{ width: "140px" }}>Brand:</div>
        <div>{productdetail.product.brand}</div>
      </div>
      <div className="col-12 d-flex">
        <div className="fw-bold me-2" style={{ width: "140px" }}>Description:</div>
        <div>{productdetail.product.description}</div>
      </div>
      <div className="col-12 d-flex">
        <div className="fw-bold me-2" style={{ width: "140px" }}>Weight:</div>
        <div>{productdetail.product.weight}</div>
      </div>

      

    </div>
  )}
</div>





            </div>
            <div className="row mt-2">

<div className="col-12">
  <table className="table table-bordered text-center">
    <thead className="table-light">
      <tr>
        <th colSpan="3">Choose Your Quantity</th>
      </tr>
      <tr>
        <th>Select</th>
        <th>Size</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
  {productdetail &&
    Object.entries(productdetail.quantityBySize).map(([size, quantity]) =>
      quantity > 0 ? (
        <tr key={size}>
          <td>
            <input
              type="radio"
              name="size"
              value={size}
              onChange={(e) => setSelectedSize(e.target.value)}
            />
          </td>
          <td>{size}</td>
          <td>
            <input
              type="number"
              min="1"
              max={quantity}
              placeholder={`Quantity Available ${quantity}`}
              className="form-control"
              onChange={(e) => setEnteredQty(e.target.value)}
              disabled={selectedSize !== size}
              value={selectedSize === size ? enteredQty : ""}
            />
          </td>
        </tr>
      ) : null
    )}
</tbody>

  </table>
</div>

            </div>


            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-lg-2 col-12 mt-5 d-flex flex-column gap-2 justify-content-center align-items-center">
 
  
  <button
  type="submit"
  className="btn btn-lg w-100 d-flex justify-content-center align-items-center addtocartbuttonsize"
  style={{
    backgroundColor: productdetail.product?.inStock ? '#0d6efd' : '#dc3545',
    color: productdetail.product?.inStock ? 'white' : '#eee',
    cursor: productdetail.product?.inStock ? 'pointer' : 'not-allowed',
    opacity: productdetail.product?.inStock ? 1 : 0.7,
  }}
  disabled={!productdetail.product?.inStock}
>
  <FaShoppingCart className="me-2" />
  {productdetail.product?.inStock ? 'Add to Cart' : 'Out of Stock'}
</button>
</div>


            </div>
            
          </div>
        </form>

       <Footer className='mt-5'></Footer>
      
    </>
  );
};

export default Stockdetail;