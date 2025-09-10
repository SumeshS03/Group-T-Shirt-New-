import React, { useState,useEffect } from "react";
import HomeHeader from "../Layout/HomeHeader";
import shopimage from "../images/shopimage.png";
import "./Shopcontentproduct.css";
import { useLocation,useNavigate } from "react-router-dom";
import Footer from '../Layout/Footer'
import { RiUpload2Fill } from "react-icons/ri";
import "./Newdesign.css"
import Button from 'react-bootstrap/Button';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import Swal from "sweetalert2";




const Shopcontentproduct = () => {
  const [activeTab, setActiveTab] = useState("product");
 

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 1200, min: 992 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 992, min: 768 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1
  }
};



const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
    // Set activeTab based on current path
    if (location.pathname === "/product") setActiveTab("product");
    else if (location.pathname === "/newdesign") setActiveTab("new");
    else if (location.pathname === "/stock") setActiveTab("stock");
  }, [location.pathname]);

const [submitted, setSubmitted] = useState(false);
const [errors, setErrors] = useState({});
const BASE_URL = process.env.REACT_APP_API_BASE_URL;





  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

 const [previewImages, setPreviewImages] = useState([]);
const [formData, setFormData] = useState({
  previewImages: [], 
  quantity: '',
 
  deliverydate: '',
});







 const validate = () => {
  const newErrors = {};
  const { previewImages,deliverydate,quantity } = formData;

  if (!previewImages || previewImages.length === 0) {
    newErrors.previewImages = 'Please upload at least one image';
  }

  if (!quantity) {
    newErrors.quantity = 'Quantity is required';
  } else if (isNaN(quantity)) {
    newErrors.quantity = 'Quantity must be a number';
  } else if (parseInt(quantity) <= 15) {
    newErrors.quantity = 'Quantity must be greater than 15';
  }

 

 
 

  if (!deliverydate) newErrors.deliverydate = 'Select delivery date';

  return newErrors;
};

  

  


const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
 

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setSubmitted(false);
    
    return; // Important: exit early on validation error
  }
  setIsSubmitting(true);
  const customerId = localStorage.getItem('customerId');
  const token = localStorage.getItem('authToken');
  const data = new FormData();
  data.append('quantity', formData.quantity);
  data.append('customerId', customerId);
  data.append('deliveryDate', new Date(formData.deliverydate).toISOString());

  formData.previewImages.forEach((file) => {
    data.append('designImages', file); 
  });

  for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

  if (!token || !customerId) {
    Swal.fire("Login and continue");
    navigate('/profile')
    return;
  }
  
  console.log('token', token);
  try {
    const response = await axios.post(`${BASE_URL}customizeDesign/add`, data, {
      headers: {
        
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.message === "CustomizeDesign saved successfully") {
      console.log('API Response:', response.data);
      setSubmitted(true);
      // Reset form after successful submission
      setFormData({
        previewImages: [],
        quantity: '',
        deliverydate: '',
      });
      setPreviewImages([]);
      Swal.fire('Your design details have been sent to your registered email!');
      
    } else {
      console.error('Unexpected API response:', response);
      // alert('Submission failed. Please try again.');
    }
  }  catch (error) {
    console.error('Submission error:', error);
    if (error.response) {
      
      console.error('Server response:', error.response.data);
      
    } else {
      Swal.fire('Network error. Please check your connection.');
    }
  }
  finally{
    setIsSubmitting(false);
  }
};



const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  if (files.length > 0) {
    setFormData((prev) => ({
      ...prev,
      previewImages: files,
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);

    
    setErrors((prev) => {
      const { previewImages, ...rest } = prev;
      return rest;
    });
  }
};


  



    
  

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
        <img src={shopimage} alt="shopimage" className="imagetopone"></img>
      </div>

   



      

      <div className="choose-category  ">
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
          <div className="row w-75 gap-2 mb-5">
          
              <div
                 className={`col-lg-3 col-12 product-page d-flex align-items-center justify-content-center



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
            
          </div>



          
        </div>
      </div>

      <h1 className="mt-5 ">
              <span className="heading-text">Please Insert</span>
              <span className="heading-text-two" style={{ margin: "0px" }}>
                {" "}
                Your Design
              </span>
            </h1>

            

<form onSubmit={handleSubmit}>
      <div className="container d-flex justify-content-center align-items-center mt-5">
  <div className="upload-newdeisgn-box text-center">
    <label className="upload-button">
      <RiUpload2Fill className="uplode-icon" />
      <span>Upload File</span>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </label>

   {previewImages.length > 0 && (
  <div className="mt-3" style={{ width: '100%', height: '148px' }}>
    <Carousel
      responsive={responsive}
      infinite={false}
      arrows={true}
      keyBoardControl={true}
      autoPlay={false}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px"
    >
      {previewImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Preview ${index}`}
          style={{
            width: '70%',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '8px',
            padding: '5px'
          }}
        />
      ))}
    </Carousel>
  </div>
)}




    {errors.previewImages && (
      <div className="text-danger mt-2">{errors.previewImages}</div>
    )}
  </div>
</div>


      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 enter-quality-box text-center mb-lg-3 mb-1">
            <h1 className="h5 mb-3 mt-lg-0 mt-2">Enter Quantity Required</h1>
            <input
              type="number"
              className="form-control mb-2 newdesigninputs"
              value={formData.quantity}
              onChange={handleChange('quantity')}
              placeholder="Enter quantity"
            />
            {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
          </div>
        </div>
      </div>

      <div className="container mt-5 mt-lg-0 mt-2">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 enter-quality-box text-center ">
            <h1 className="h5 mb-3">Enter Delivery date</h1>
            <input
              type="date"
              className="form-control mb-2 newdesigninputs"
              value={formData.deliverydate}
              onChange={handleChange('deliverydate')}
              
            />
            {errors.deliverydate && <div className="text-danger">{errors.deliverydate}</div>}
          </div>
        </div>
      </div>

     

      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-sm-6 text-center">
            <Button type="submit" className="w-25 btn btn-primary new-sent-btn mb-5" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </div>

      
    </form>
    












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
