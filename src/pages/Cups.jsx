import React, { useRef, useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';


const Cups = ({handleShow,handleQuantityChange}) => {

const { id } = useParams();

  const [productdetail, setProductdetail] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

const [formData, setFormData] = useState({
    quantity: '',})

    useEffect(() => {
          const fetchProduct = async () => {
    
            const token = localStorage.getItem('authToken');
       
            try {
              const response = await axios.get('https://gts.tsitcloud.com/api/products/single/products-by-category', {
                headers: {
                  Authorization: `Bearer token`,
                },
              });
      
              // Flatten all products from all categories (like your home layout)
              const allProducts = response.data.flatMap(cat => cat.products);
              setProductsData(allProducts);
              const foundProduct = allProducts.find((p) => p._id === id);
      
              if (foundProduct) {
                setProductdetail(foundProduct);
                console.log('fooundproduct',foundProduct)
                setSelectedImage(`https://gts.tsitcloud.com/${foundProduct.images[0]}`);
              }
            } catch (error) {
              console.error('Failed to fetch product:', error);
            }
          };
      
          fetchProduct();
        }, [id]);

  const product=productdetail
    
  if (!productdetail) return <p>Loading...</p>;


  if (!product) return <h2>Product not found</h2>;
  return (
    <>
      {productdetail &&
        productdetail.category &&
        productdetail.category._id === "680f271543a9574da31d61be" && (

          

          <div className="container-fluid">
            <form >
              <div className="row justify-content-center mt-4">
                <div className="col-md-8">
                   <div className="card mb-4">
                    <div className="card-header bg-primary text-white">
                <h4>Caps Customization</h4>
              </div>
              <div className="card-body">
                <div className="row mb-4 justify-content-center align-items-center">
                  <div className="col-lg-6">
                    <label className="form-label">Enter Quantity Required</label>
                    <input
                      type="number"
                      min="16"
                      name="quantity"
                      value={formData.quantity}
                      required
                      placeholder="Minimum 16"
                      onChange={handleQuantityChange}
                      className="form-control"
                    />
                    <small className="text-muted">Minimum order quantity: 16</small>
                  </div>
                  
                </div>
              </div>
                   </div>
                </div>
              </div>
            
            </form>
          </div>
        )}
    </>
  );
};

export default Cups;

