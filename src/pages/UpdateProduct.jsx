import React, {useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeHeader from "../Layout/HomeHeader";
import shopimage from "../images/shopimage.png";
import { useLocation,useNavigate } from "react-router-dom";
import "./Productdetail.css"
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import Footer from '../Layout/Footer'
import UpdateProductDetailForm from "./UpdateProductDetailForm";


const UpdateProduct = () => {



const navigate = useNavigate();
const [activeTab, setActiveTab] = useState("product");
const location = useLocation();
const { id } = useParams();
useEffect(() => {
          // Set activeTab based on current path
          if (location.pathname === "/product") setActiveTab("product");
          else if (location.pathname === "/newdesign") setActiveTab("new");
          else if (location.pathname === "/stock") setActiveTab("stock");
        }, [location.pathname]);


 const sizesone = [
      { label: 'XS', chest: 34 },
      { label: 'S', chest: 36 },
      { label: 'M', chest: 38 },
      { label: 'L', chest: 40 },
      { label: 'XL', chest: 42 },
      { label: '2XL', chest: 44 },
      { label: '3XL', chest: 46 },
      { label: '4XL', chest: 48 },
      { label: '5XL', chest: 50 },
      

    ];




  const [productdetail, setProductdetail] = useState(null);
    
    const [selectedImage, setSelectedImage] = useState(null);
   
    
    const [hoveredImage, setHoveredImage] = useState(null);

   
    

    useEffect(() => {
      const fetchProduct = async () => {

        const token = localStorage.getItem('authToken');
        const BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const customerId = localStorage.getItem('customerId');
   
        try {
          const response = await axios.get(`${BASE_URL}/cartItems/list/${customerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Fetched cart items:", response.data);

           // Directly use the array of cart items
      const allProducts = response.data; 

      // Find the single product by `_id` from params
      const foundProduct = allProducts.find((p) => p._id === id);

      if (foundProduct) {
        setProductdetail(foundProduct);
        console.log("Found product:", foundProduct);

        // product images are inside productId.images
        if (foundProduct.productId?.images?.length > 0) {
          setSelectedImage(
            `https://gts.tsitcloud.com/${foundProduct.productId.images[0]}`
          );
        }
          
      }
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      };
  
      fetchProduct();
    }, [id]);



const product = productdetail;
if (!productdetail) return <p>Loading...</p>;

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
                  activeTab === "stock" ? "active-tab" : ""
                }`}
                onClick={() => navigate("/stock")}
              >
                <h2 className="h4 heading-text-product">Stock Page</h2>
              </div>
            {/* </div> */}
          </div>

          
          
        </div>
      </div>

    

<div className="container mt-5">
  <div className="row justify-content-center align-items-start">
    {/* Product Image Column */}

    {console.log('product',productdetail)}
    <div className="col-lg-6 col-12 mb-4">
  {productdetail ? (
  <>
    {/* Main Product Image with Out-of-Stock Overlay */}
    <div className="product-imageful mb-3 text-center position-relative">
      <img
        src={
          hoveredImage ||
          selectedImage ||
          `https://gts.tsitcloud.com/${productdetail?.images?.[0]}`
        }
        alt={productdetail?.name}
        className="img-fluid"
       
      />
      
    </div>

    {/* Thumbnail Images */}
    <div className="d-flex flex-wrap align-items-start justify-content-start gap-3">
      {productdetail.images?.slice(1).map((img, index) => (
        <div
          key={index}
          className="productdetail-image"
          onMouseEnter={() =>
            setHoveredImage(`https://gts.tsitcloud.com/${img}`)
          }
          onMouseLeave={() => setHoveredImage(null)}
          onClick={() =>
            setSelectedImage(`https://gts.tsitcloud.com/${img}`)
          }
          style={{
            border:
              selectedImage === `https://gts.tsitcloud.com/${img}`
                ? "2px solid blue"
                : "2px solid transparent",
            borderRadius: "8px",
            padding: "4px",
            cursor: "pointer",
            maxWidth: "100px",
          }}
        >
          <img
            src={`https://gts.tsitcloud.com/${img}`}
            alt={`Thumbnail ${index + 1}`}
            className="img-fluid"
          />
        </div>
      ))}
    </div>
  </>
) : (
  <p>Loading product images...</p>
)}

</div>


    {/* Product Detail Column */}
    <div className="col-lg-6 col-12">
      {productdetail ? (
        <>
        <h2 className="text-start productnametext">{productdetail?.productId.name}</h2>
        <p className="text-start">
  {productdetail?.productId.description
    ?.split(/(?=Type:|Fit:|Fabric:|Quality:|Design:)/) // split but keep keywords
    .map((line, idx) => {
      // Extract keyword + rest of line
      const match = line.match(/^(Type:|Fit:|Fabric:|Quality:|Design:)(.*)/);

      if (match) {
        return (
          <div key={idx}>
            <strong>{match[1]}</strong>
            {match[2].trim()}
          </div>
        );
      }

      return <div key={idx}>{line.trim()}</div>;
    })}
</p>
          {/* <p className="text-start">{productdetail?.description}</p>

          <hr className="divider-line" />

          <p className="text-start"><strong>Color:</strong> {productdetail?.productId.color}</p>
          <p className="text-start"><strong>Material:</strong> {productdetail?.productId.material}</p>
          <p className="text-start"><strong>Brand:</strong> {productdetail?.productId.brand}</p>
          <p className="text-start"><strong>Weight:</strong> {productdetail?.productId.weight}</p>

          <hr className="divider-line" />

          <h5 className="mb-2">About this item</h5>
          <ul className="text-start">
            <li><strong>Type:</strong> Comfortable Cotton T-Shirt</li>
            <li><strong>Fit:</strong> Regular Fit – Comfortable for daily wear</li>
            <li><strong>Fabric:</strong> 100% Pure Cotton – Durable and skin-friendly</li>
            <li><strong>Design:</strong> Printed Graphic – Stylish and trendy look</li>
          </ul> */}

          {/* Responsive Table */}
          {/* <div className="table-responsive mt-4">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  {sizesone.length > 0 ? (
                    sizesone.map((size, index) => (
                      <th key={index} style={{ padding: "8px", whiteSpace: "nowrap" }}>
                        {size.label}
                      </th>
                    ))
                  ) : (
                    <th>No sizes available</th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {sizesone.length > 0 ? (
                    sizesone.map((size, index) => (
                      <td key={index} style={{ padding: "8px", whiteSpace: "nowrap" }}>
                        {size.chest ? `${size.chest}"` : "N/A"}
                      </td>
                    ))
                  ) : (
                    <td>No chest data available</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div> */}
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  </div>
</div>




<UpdateProductDetailForm></UpdateProductDetailForm>











   

   

    


    


   







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

export default UpdateProduct




