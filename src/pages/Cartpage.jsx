import React, { useRef,useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import HomeHeader from '../Layout/HomeHeader'
import shopimage from "../images/shopimage.png";
import qualityshirt from "../images/Premium-Quality.png";

const Cartpage = ({}) => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState("");
    const [activeButton, setActiveButton] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const CartContext = createContext();
    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
      };


      

    

    const products = [
            { id: 1, image: qualityshirt, label: "Sleeve", price: 299,sizes: {S: 5,M: 4,L: 4,X: 2,XL: 1} },
            { id: 2, image: qualityshirt, label: "Full Sleeve", price: 349,sizes: {S: 5,M: 3,L: 1,X: 2,XL: 1} },
            { id: 3, image: qualityshirt, label: "Round Neck", price: 279,sizes: {S: 2,M: 3,L: 4,X: 2,XL: 1} },
            { id: 4, image: qualityshirt, label: "V Neck", price: 319,sizes: {S: 5,M: 3,L: 1,X: 2,XL: 1} },
            { id: 5, image: shopimage, label: "V Neck", price: 319,sizes: {S: 5,M: 15,L: 4,X: 2,XL: 1} },
            { id: 6, image: shopimage, label: "V Neck", price: 319,sizes: {S: 5,M: 3,L: 4,X: 41,XL: 1} },
          ];

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;
    
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
              <h1 className="mt-4 aboutustext">Cart</h1>
            </div>
            <p
              className=" w-50 home-contactustext "
              style={{ textAlign: "start", marginLeft: "-23%" }}
            >
              Home - Shop
            </p>
            <img src={shopimage} className="imagetopone"></img>
          </div>


          <div className="container mt-5">
      <div className="d-flex productpage-box row ">
        <div className="col-lg-5 col-12">
        <div className="product-imageful">
      <img src={product.image} alt={product.label} className="img-fluid" />
      </div>
      
       </div>
       <div className="col-lg-5 col-12 ">
        <h2 className="text-start">{product.label}</h2>
        <p className="text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non atque quasi alias eveniet consequuntur dolor.</p>
        <p className="text-start">Price: ₹{product.price}</p>
        <div>
                <h6 className="mt-2 text-start">Quantity Available</h6>
                <input
                  type="text"
                  value={Object.values(product.sizes).reduce((sum, qty) => sum + qty, 0)}
                  readOnly
                  className="form-control quantity-input"
                />
              </div>
        <div className="d-flex align-items-center gap-3 mt-3">
  <div className="fw-bold">Size</div>
  <select className="form-select w-auto" onChange={handleSizeChange}>
    <option value="">Select</option>
    {Object.keys(product.sizes).map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
  </select>

   {/* Show size-wise quantity when selected */}
   {selectedSize && (
          <div>
            <span className="fw-semibold">
              Available: {product.sizes[selectedSize]}
            </span>
          </div>
        )}
</div>
        
        
      </div>

      
      </div>  
      
      
    </div>



    </>
  )
}

export default Cartpage