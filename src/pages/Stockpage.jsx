import React, { useRef, useState,useEffect } from "react";

import HomeHeader from "../Layout/HomeHeader";
import shopimage from "../images/shopimage.png";
import "./Shopcontentproduct.css";
import "./Stockpage.css"

import { useLocation,useNavigate } from "react-router-dom";



import qualityshirt from "../images/Premium-Quality.png";


import amex from "../images/amex.png";
import applepay from "../images/apple.jpg";
import gpay from "../images/gpay1.jpg";
import visa from "../images/Visa1.jpg";
import mastercard1 from "../images/Master1.jpg";
import phonepay from "../images/Phonepe.jpg";
import { FaArrowRight } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import bluef from "../images/blue-f.png"
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import Footer from '../Layout/Footer'



const Shopcontentproduct = () => {
  const [activeTab, setActiveTab] = useState("product");
  const [stockData, setstockData] = useState(null);
 const baseurl = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

    useEffect(() => {
      // Set activeTab based on current path
      if (location.pathname === "/product") setActiveTab("product");
      else if (location.pathname === "/newdesign") setActiveTab("new");
      else if (location.pathname === "/stock") setActiveTab("stock");
    }, [location.pathname]);

const products = [
                { id: 1, image: qualityshirt, label: "Sleeve", price: 299,sizes: {XS:2,S: 5,M: 4,L: 4,X: 2,XL: 1,'2XL': 3, '3XL': 2, '4XL': 1, '5XL': 0} },
                { id: 2, image: qualityshirt, label: "Full Sleeve", price: 349,sizes: {XS:2,S: 5,M: 3,L: 1,X: 2,XL: 1,'2XL': 3, '3XL': 2, '4XL': 1, '5XL': 0} },
                { id: 3, image: qualityshirt, label: "Round Neck", price: 279,sizes: {XS:2,S: 2,M: 3,L: 4,X: 2,XL: 1,'2XL': 3, '3XL': 2, '4XL': 1, '5XL': 0} },
                { id: 4, image: qualityshirt, label: "V Neck", price: 319,sizes: {XS:2,S: 5,M: 3,L: 1,X: 2,XL: 1,'2XL': 3, '3XL': 2, '4XL': 1, '5XL': 0} },
                { id: 5, image: shopimage, label: "V Neck", price: 319,sizes: {XS:2,S: 5,M: 15,L: 4,X: 2,XL: 1,'2XL': 3, '3XL': 2, '4XL': 1, '5XL': 0} },
                { id: 6, image: shopimage, label: "V Neck", price: 319,sizes: {XS:2,S: 5,M: 3,L: 4,X: 41,XL: 1,'2XL': 3, '3XL': 2, '4XL': 1, '5XL': 0} },
              ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };



  //fetproduct details


  useEffect(() => {
  const fetchProducts = async () => {
    const token = localStorage.getItem("authToken");
    
    try {
      const response = await axios.get(`${baseurl}/stocks/grouped-by-category`, {
        headers: {
          Authorization: `Bearer ${token}`,  // ✅ Also using token from localStorage
          'Content-Type': 'application/json'
        }
      });

      setstockData(response.data);
      console.log("Fetched grouped data:", response.data);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

 
  return (
    <>
      <div>
        <HomeHeader />
      </div>
      <div
        className="about-box d-flex  h-50 flex-column align-items-center "
        //
      >
        <div className="first-background p-5  mb-4 d-flex text-white ">
          <h1 className="mt-4 aboutustext">ABOUT US</h1>
        </div>
        <p
          className=" w-50 home-contactustext "
          style={{ textAlign: "start", marginLeft: "-23%" }}
        >
          Home - About Us
        </p>
        <img src={shopimage} className="imagetopone"></img>
      </div>

      <div className="choose-category  ">
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
          <div className="row w-75 gap-2 pb-5">
            {/* <div className="products-type "> */}
              <div
                 className={`col-lg-3 col-12 product-page 



                  ${
                  activeTab === "product" ? "active-tab" : ""
                }`
              
              }
              onClick={() => navigate("/product")}
              >
                <h2 className="h4 heading-text-product">Product</h2>
              </div>
              <div
                className={`col-lg-3 col-12 new-design-page ${
                  activeTab === "new" ? "active-tab" : ""
                }`}
                onClick={() => navigate("/newdesign")}
              >
                <h2 className="h4 heading-text-product">New Design</h2>
              </div>
              <div
                className={`col-lg-3 col-12 stock-page ${
                  activeTab === "stock" ? "active-tab" : ""
                }`}
                onClick={() => navigate("/stock")}
              >
                <h2 className="h4 heading-text-product">Ready Stock</h2>
              </div>
            {/* </div> */}
          </div>

          
          
        </div>
      </div>

      {/* <div className="container mt-5">
    <h1 className="h4 text-start">T-shirts</h1>
    <div className="product-slider-container">
      <Carousel responsive={responsive} infinite={false} arrows={true}>
        {products.map((item, index) => (
          <div key={index} className="product-card text-center p-2">
            <div className="product-image">
              <img src={item.image} alt={`product-img-${index}`} />
            </div>

            <div className="d-flex justify-content-between">
              <div>
                <h6 className="mt-2 text-start">{item.label}</h6>
                <p className="text-start fw-semibold price-tag">₹ {item.price}</p>
              </div>
              <div>
                <h6 className="mt-2 text-start">Quantity Available</h6>
                <input
                  type="text"
                  value={Object.values(item.sizes).reduce((sum, qty) => sum + qty, 0)}
                  readOnly
                  className="form-control quantity-input"
                />
              </div>
            </div>

            <button
              className="rounded-5 showdetail-btn mt-2"
              onClick={() => navigate(`/stockdetail/${item.id}`)}
            >
              Show Detail
            </button>
          </div>
        ))}
      </Carousel>
    </div>
  </div> */}


  <div className="container mt-5 productshowbox">
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        stockData.map((categoryItem, catIndex) => (
          <div key={catIndex} className="mb-5">
            {categoryItem.stocks.length > 0 && (
  <h2 className="h4 text-start mb-3">{categoryItem.categoryName}</h2>
)}
  {console.log("categoryItem" , categoryItem)
  }
            {categoryItem.stocks && categoryItem.stocks.length > 0 ? (
  <div className="product-slider-container">
    <Carousel responsive={responsive} infinite={false} arrows={true}>
  {categoryItem.stocks.map((stockItem, prodIndex) => {
    const stockId = stockItem._id;
    const product = stockItem.product;
    const isOutOfStock = !product.inStock;

    return (
      <div key={prodIndex} className="product-card text-center p-2 position-relative">
        <div
          className="product-image"
          onClick={() => navigate(`/stockdetail/${stockId}`)}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <img
            src={`https://gts.tsitcloud.com/${product.images[0]}`}
            alt={`product-img-${prodIndex}`}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              filter: isOutOfStock ? 'blur(2px) grayscale(30%)' : 'none',
              opacity: isOutOfStock ? 0.7 : 1,
              transition: 'filter 0.3s ease',
            }}
          />

          {isOutOfStock && (
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
                fontSize: '1.2rem',
              }}
            >
              Out of Stock
            </div>
          )}
        </div>
      </div>
    );
  })}
</Carousel>

  </div>
) : (
  <p>No products available in this category.</p>
)}

          </div>
        ))
      )}
    </div>
      
      
      
      
      
      
      
      
  <div className="social container-fluid  ">
        <div class="row justify-content-center">
          <div className="sociladivider   d-flex justify-content-around text-white">
            <div className="d-flex align-items-center justify-content-center socialone col-2 ">
              <text
                className="socialtexts"
                style={{ color: "white"}}
              >
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
    </>
  );
};

export default Shopcontentproduct;
