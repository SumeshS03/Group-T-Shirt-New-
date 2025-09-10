import React, { useEffect, useState } from 'react';
import Header from "../Layout/HomeHeader"
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import Footer from '../Layout/Footer';
import "./Shopcontentproduct.css";



export const Stockcart = () => {

  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
      fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
          const storedCustomerId = localStorage.getItem('customerId');
          const token =localStorage.getItem('authToken')
          const response = await axios.get(
            `https://gts.tsitcloud.com/api/stockCart/${storedCustomerId}`,
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

 
    const handleDelete = async(itemId) => {
    const storedCustomerId = localStorage.getItem('customerId');
    const token = localStorage.getItem('authToken');
    console.log('itemid',itemId);
    console.log('custid',storedCustomerId)
    try{
      const response = await axios.post(`https://gts.tsitcloud.com/api/stockCart/remove`,
        {
           itemId:itemId,
           customerId : storedCustomerId,
        },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      if(response.status === 200){
        fetchProduct();
      }
      

      // if(response.message){
      // fetchProduct();
      // }
     // alert(response.data?.message );
      // setCartItems((prev) => prev.filter(item => item._id !== itemId));

    }catch (error) {
    const errorMsg = error.response?.data?.message || "Error deleting item.";
    console.error("Delete error:", errorMsg);
    alert(errorMsg);
  }
  };

  console.log("cartItems" , cartItems);
  

  return (
    <>
    <Header></Header>
   <div className='container mt-5 d-flex align-items-center justify-content-center'>
      <div className='row w-75'>
      <div className='fw-bold shopping-cart-text'>Shopping cart</div>
       </div>
       </div>
   
     <div className='container mt-5 d-flex align-items-center justify-content-center'>
  <div className='row w-75'>
    <div className='col-12'>
      {cartItems?.items?.length > 0 ? (
        cartItems.items.map((item, index) => (
          <div key={item._id || index} className="card p-3 mb-3">
            <div className='row'>
              <div className='col-lg-5'>
  {item.stockId?.productId?.images?.length > 0 && (
    <div style={{ position: 'relative' }}>
      <img
        src={`https://gts.tsitcloud.com/${item.stockId.productId.images[0]}`}
        alt="Product"
        className="img-fluid rounded"
        style={{
          objectFit: 'cover',
          filter: item.stockId?.productId?.inStock === false ? 'blur(3px)' : 'none',
          opacity: item.stockId?.productId ? 1 : 0.6,
        }}
      />

      {item.stockId?.productId?.inStock === false && (
        <div
        className="position-absolute top-50 start-50 translate-middle bg-light text-danger px-3 py-1 rounded"
          style={{
           fontWeight: 'bold',
          fontSize: '1rem',
          backgroundColor: 'rgba(255,255,255,0.85)',
          }}
        >
          Out of Stock
        </div>
      )}
    </div>
  )}
</div>

              <div className='col-lg-4 text-start '>
                <h5 className='mt-lg-5 mt-0 h2' style={{color:"#2d72c4"}}>{item.stockId?.productId?.name}</h5>
                
                <p><strong>Material:</strong> {item.stockId?.productId.material}</p>
                <p><strong>Size:</strong> {item.size}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Sleeve Type:</strong> {item.sleeveType}</p>
                <p><strong>Price:</strong> ₹{item.price}</p>
               
                
                {/* Logo Images */}
                
              </div>
              <div className='col-lg-3 d-flex flex-column align-items-center justify-content-center gap-lg-5 gap-2  mt-lg-0 mt-3'>
                <MdDelete 
                  className='delete-icon'
                  onClick={() => handleDelete(item._id)}
                  size={32} 
                />
                <Button
  variant="contained"
  style={{
    backgroundColor: item.stockId?.productId?.inStock === false ? '#dc3545' : 'green',
    cursor: item.stockId?.productId?.inStock === false ? 'not-allowed' : 'pointer',
  }}
  disabled={item.stockId?.productId?.inStock === false}
>
  {item.stockId?.productId?.inStock === false ? 'Out of Stock' : 'Buy Now'}
</Button>

              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products in cart</p>
      )}
    </div>
  </div>
</div>
<Footer></Footer>
   </>
    
    
  )
}
