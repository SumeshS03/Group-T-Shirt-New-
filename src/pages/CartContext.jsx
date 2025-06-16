import React, { useRef, useState , useEffect } from 'react';
import HomeHeader from '../Layout/HomeHeader'
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
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import bluef from "../images/blue-f.png"
import axios from 'axios';
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import './CartContext.css'
import Button from '@mui/material/Button';
import Footer from '../Layout/Footer'

const CartContext = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [productdetail, setProductdetail] = useState(null);
   const [productsData, setProductsData] = useState([]);
   const [cartItems, setCartItems] = useState([]);
   const [foundProduct,setfoundProduct] =useState([]);
   const { id } = useParams();






    
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const storedCustomerId = localStorage.getItem('customerId');
        const token =localStorage.getItem('authToken')
        const response = await axios.get(
          `https://gts.tsitcloud.com/api/cartItems/list/${storedCustomerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data);
        console.log('Fetched product:', response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
  
    fetchProduct();
  }, []);

  const handleDelete = async(itemId) => {
    const storedCustomerId = localStorage.getItem('customerId');
    const token = localStorage.getItem('authToken');
    // console.log('itemid',itemId);
    try{
      const response = axios.post('https://gts.tsitcloud.com/api/cartItems/delete',
        {
           cartItemId:itemId,
           customerId : storedCustomerId,
        },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      alert(response.data?.message || "Item deleted successfully!");
      setCartItems((prev) => prev.filter(item => item._id !== itemId));

    }catch (error) {
    const errorMsg = error.response?.data?.message || "Error deleting item.";
    console.error("Delete error:", errorMsg);
    alert(errorMsg);
  }


  };

  

  return (
    <>
    <div>
    <HomeHeader />
   </div>


   
    
   <div className='container mt-5 d-flex align-items-center justify-content-center'>
   <div className='row w-75'>
   <div className='fw-bold shopping-cart-text'>Shopping cart</div>
    </div>
    </div>

   <div className='container mt-5 d-flex align-items-center justify-content-center'>
  <div className='row w-75'>
    <div className='col-12'>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={item._id || index} className="card p-3 mb-3">
            <div className='row'>
              <div className='col-lg-5'>
                {/* Product Image */}
                {item.productId?.images?.length > 0 && (
  <div className="position-relative" style={{ width: "100%", height: "auto" }}>
    <img
      src={`https://gts.tsitcloud.com/${item.productId.images[0]}`}
      alt="Product"
      className="img-fluid rounded"
     
    />
    
   
  </div>
)}

              </div>
              <div className='col-lg-4 text-start'>
                <h5>{item.productId?.name}</h5>
                <p><strong>Cloth:</strong> {item.cloth}</p>
                <p><strong>Quantity:</strong> {item.quantityCount}</p>
                <p><strong>Delivery Date:</strong> {new Date(item.deliveryDate).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> ₹{item.amount}</p>
                <p><strong>Total Amount:</strong> ₹{item.totalAmount}</p>

                {/* Logo Images */}
                {Array.isArray(item.logos) && item.logos.length > 0 && (
                  <div className="mt-3">
                    <strong>Logos:</strong>
                    <div className="d-flex flex-wrap gap-3 mt-2">
                      {item.logos.map((logo, idx) => (
                        <div key={idx} className="text-center">
                          <img
                            src={`https://gts.tsitcloud.com/${logo.photo?.replace(/\\/g, '/')}`}
                            alt={logo.logotype}
                            className="img-thumbnail"
                            style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                          />
                          <div className="small mt-1">{logo.position}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className='col-lg-3 d-flex flex-column align-items-center justify-content-center gap-lg-5 gap-2  mt-lg-0 mt-3'>
                
              <MdDelete className='delete-icon   '
              onClick={() => handleDelete(item._id)}
               size={32} />
              <Button
  className="w-100 bg-success"
  variant="contained"
  
  
>
  Buy Now
</Button>

              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Product not add</p>
      )}
    </div>
  </div>
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
  )
}

export default CartContext