import React, { useState,useEffect } from "react";
import HomeHeader from "../Layout/HomeHeader";
import shopimage from "../images/shopimage.png";
import "./Shopcontentproduct.css";
import "./Stockpage.css"
import { useLocation,useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import Footer from "../Layout/Footer"


const Shopcontentproduct = () => {
  const [activeTab, setActiveTab] = useState("product");
  const location = useLocation();
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
 const base_url = process.env.REACT_APP_API_BASE_URL;


    useEffect(() => {
      // Set activeTab based on current path
      if (location.pathname === "/product") setActiveTab("product");
      else if (location.pathname === "/newdesign") setActiveTab("new");
      else if (location.pathname === "/stock") setActiveTab("stock");
    }, [location.pathname]);


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

  const [loading, setLoading] = useState(true);


// api to get all category
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${base_url}/products/single/products-by-category`
      );
      setProductsData(response.data);
      console.log("products", response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [base_url]);



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
          <h1 className="mt-4 aboutustext">SHOP</h1>
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
          <div className="row w-75 gap-2 pb-lg-5 pb-4 centerfixproductbutton">
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

      


  

 
  <div className="container mt-5 productshowbox">
    {loading ? (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      productsData.map((categoryItem, catIndex) => (
        <div key={catIndex} className="mb-5">

          {categoryItem.products.length > 0 && (
  <h2 className="h4 text-start mb-3">{categoryItem.category}</h2>
)}

          {categoryItem.products.length > 0 && (
  <div className="product-slider-container">
    <Carousel responsive={responsive} infinite={false} arrows={true}>
      {categoryItem.products.map((product, prodIndex) => (
        <div key={prodIndex} className="product-card text-center p-2">
          <div
            className="product-image position-relative"
            onClick={() => navigate(`/productdetail/${product._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`https://gts.tsitcloud.com/${product.images[0]}`}
              alt={`product-img-${prodIndex}`}
              
            />
            
          </div>
        </div>
      ))}
    </Carousel>
  </div>
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























//old-design

// import React, { useRef, useState,useEffect } from "react";
// import HomeHeader from "../Layout/HomeHeader";
// import shopimage from "../images/shopimage.png";
// import "./Shopcontentproduct.css";
// import { MdAddPhotoAlternate } from "react-icons/md";
// import { IoIosArrowDown } from "react-icons/io";
// import { FaPlusCircle } from "react-icons/fa";
// import { useLocation,useNavigate } from "react-router-dom";

// import tshirt from "../images/yourstyle.png";
// import yourprintone from "../images/yourprint.png";
// import quantity from "../images/yourquantity.jpg";
// import payment from "../images/payment.jpg";

// import qualityshirt from "../images/Premium-Quality.png";
// import outstandquality from "../images/Outstanding-Quality1.png";
// import secpayment from "../images/Secure-payment1.png";
// import cussizestyle from "../images/Custom-SIze-STyle.png";

// import amex from "../images/amex.png";
// import applepay from "../images/apple.jpg";
// import gpay from "../images/gpay1.jpg";
// import visa from "../images/Visa1.jpg";
// import mastercard1 from "../images/Master1.jpg";
// import phonepay from "../images/Phonepe.jpg";
// import { FaArrowRight } from "react-icons/fa6";
// import { FaTwitter } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa6";
// import { FiYoutube } from "react-icons/fi";
// import bluef from "../images/blue-f.png"
// import { FiPhoneCall } from "react-icons/fi";
// import { HiOutlineMailOpen } from "react-icons/hi";
// import { IoLocationOutline } from "react-icons/io5";
// import { FaCircleChevronLeft } from "react-icons/fa6";
// import { FaCircleChevronRight } from "react-icons/fa6";

// const Shopcontentproduct = () => {
//   const [activeTab, setActiveTab] = useState("product");
//   const [showColors, setShowColors] = useState(false);
 
// const [showColorList, setShowColorList] = useState(false);
// const colors = ["red", "blue", "green", "yellow", "black", "purple"];
// const [selectedColor, setSelectedColor] = useState(['#ff0000', '#00ff00']);

// const [selectedColors, setSelectedColors] = useState([['#ff0000', '#00ff00']]); // 💡 The array you're asking about

// const [activeIndex, setActiveIndex] = useState(null);

// const addSelectedColor = () => {
//   if (
//     selectedColors.length < 2 &&
//     !selectedColors.includes(selectedColor)
//   ) {
//     setSelectedColors([...selectedColors, selectedColor]);
//   }
// };

//   const [selectedCategory, setSelectedCategory] = useState("T-Shirts");
//   const [selectedNumber, setSelectedNumber] = useState(10);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showSizes, setShowSizes] = useState(false);
//   const [selectedSize, setSelectedSize] = useState('XXL');
//   const [selectedQuality, setSelectedQuality] = useState("Premium");
//   const [selectedType, setSelectedType] = useState("Print");
//   const [clicked, setClicked] = useState(false);
//   const sliderRef = useRef(null);
//   const cardWidth = 270; // Must match actual width of one card

//   const handleColorClick = (color) => {
//     const updatedColors = [...selectedColors];
//     updatedColors[activeIndex] = color;
//     setSelectedColors(updatedColors);
//     setShowColorList(false); // Close the dropdown after selecting a color
//   };

//  const handleAddCircle = () => {
//     setSelectedColors([...selectedColors, '#eee']); // Add a new default color slot (light gray)
//   };


//   const sizes = [ 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];


//   const numbers = Array.from({ length: 2000 }, (_, i) => i + 10);

  
//   const handleSelect = (num) => {
//     setSelectedNumber(num);
//     setShowDropdown(false);
//   };

//   const tshirtItems = [
//     { id: 1, image: qualityshirt, title: "Normal T-Shirts" },
//     { id: 2, image: qualityshirt, title: "Full Color T-Shirts" },
//     { id: 3, image: qualityshirt, title: "Line T-Shirts" },
//     { id: 4, image: qualityshirt, title: "Double Line T-Shirts" },
//     { id: 5, image: qualityshirt, title: "Single Line T-Shirts" }, // Add more items as needed
//     { id: 6, image: qualityshirt, title: "Striped T-Shirts" },
//     { id: 7, image: qualityshirt, title: "T-shirts" },
//     { id: 8, image: qualityshirt, title: "Oversize T-Shirts" },
//   ];

//   const [currentPage, setCurrentPage] = useState(0);
  
//   const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth <= 768 ? 1 : 4);

//   useEffect(() => {
//     const handleResize = () => {
//       setItemsPerPage(window.innerWidth <= 768 ? 1 : 4);
//     };
  
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 
  

//   const visibleItems = tshirtItems.slice(
//     currentPage,
//     currentPage + itemsPerPage
//   );

//   const canGoNext = currentPage < tshirtItems.length - itemsPerPage;
//   const canGoPrev = currentPage > 0;





//   const location = useLocation();
//   const navigate = useNavigate();

//   const items = [
//     { title: "T-Shirts", path: "/tshirts" },
//     { title: "Long Sleeves", path: "/longsleeves" },
//     { title: "Sweater", path: "/sweater" },
//     { title: "Hoodies", path: "/hoodies" },
//     { title: "Cups", path: "/cups" },
//   ];

//   const pathToTitleMap = {
//     "/tshirts": "T-Shirts",
//     "/longsleeves": "Long Sleeves",
//     "/sweater": "Sweater",
//     "/hoodies": "Hoodies",
//     "/cups": "Cups",
 
//   };


//   const allProducts = [
//     { id: 1, title: "Tee 1", category: "T-Shirts", image: qualityshirt },
//     { id: 2, title: "Tee 2", category: "T-Shirts", image: qualityshirt },
//     { id: 3, title: "Long Sleeve 1", category: "Long Sleeves", image: qualityshirt },
//     { id: 4, title: "Hoodie 1", category: "Hoodies", image: qualityshirt },
//     { id: 5, title: "Sweater 1", category: "Sweater", image: qualityshirt },
//     { id: 6, title: "Cup 1", category: "Cups", image: qualityshirt },
//     // Add more sample items
//   ];

 



//   const handleClick = (item) => {
//     setSelectedCategory(item.title);
//     setCurrentPage(0); // reset to first page on new category
//   };

//   const selectedBox = selectedCategory;




//   useEffect(() => {
//     // Set activeTab based on current path
//     if (location.pathname === "/product") setActiveTab("product");
//     else if (location.pathname === "/newdesign") setActiveTab("new");
//     else if (location.pathname === "/stock") setActiveTab("stock");
//   }, [location.pathname]);




//   const handleAddProduct = () => {
//     setProductRows(prevRows => [...prevRows, { ...defaultRow }]);
//   };

//   const defaultRow = {
//     colors: ['#ff0000', '#00ff00'], // default color options
//     activeColorIndex: 0,
//     showColorList: false,
//     selectedQuantity: 1,
//     showDropdown: false,
//     selectedType: 'Print',
//     selectedSize: 'M',
//     showSizes: false,
//   };
  
//   const [productRows, setProductRows] = useState([defaultRow]);







//   const [visibleSizeCount, setVisibleSizeCount] = useState(1);
//   const [sizeQuantities, setSizeQuantities] = useState({});


//   const handleAddSize = () => {
//     if (visibleSizeCount < sizes.length) {
//       setVisibleSizeCount(visibleSizeCount + 1);
//     }
//   };

//   const handleChange = (size, value) => {
//     setSizeQuantities((prev) => ({
//       ...prev,
//       [size]: value === "" ? "" : parseInt(value) || 0,
//     }));
//   };
  


  



  
  
  

//   return (
//     <>
//       <div>
//         <HomeHeader />
//       </div>
//       <div
//         className="about-box d-flex  h-50 flex-column align-items-center "
//         //
//       >
//         <div className="first-background p-5  mb-4 d-flex text-white ">
//           <h1 className="mt-4 aboutustext">ABOUT US</h1>
//         </div>
//         <p
//           className=" w-50 home-contactustext "
//           style={{ textAlign: "start", marginLeft: "-23%" }}
//         >
//           Home - About Us
//         </p>
//         <img src={shopimage} className="imagetopone"></img>
//       </div>

//       <div className="choose-category  ">
//         <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
//           <div className="row w-75 gap-2">
//             {/* <div className="products-type "> */}
//               <div
//                  className={`col-lg-3 col-12 product-page 



//                   ${
//                   activeTab === "product" ? "active-tab" : ""
//                 }`
              
//               }
//               onClick={() => navigate("/product")}
//               >
//                 <h2 className="h4 heading-text-product">Product Page</h2>
//               </div>
//               <div
//                 className={`col-lg-3 col-12 new-design-page ${
//                   activeTab === "new" ? "active-tab" : ""
//                 }`}
//                 onClick={() => navigate("/newdesign")}
//               >
//                 <h2 className="h4 heading-text-product">New Design Page</h2>
//               </div>
//               <div
//                 className={`col-lg-3 col-12 stock-page ${
//                   activeTab === "stock" ? "active-tab" : ""
//                 }`}
//                 onClick={() => navigate("/stock")}
//               >
//                 <h2 className="h4 heading-text-product">Stock Page</h2>
//               </div>
//             {/* </div> */}
//           </div>

//           <h1 className="heading-text mt-3 mb-3">
//             Choose
//             <span style={{ color: "#015dc0" }}> Category</span>
//           </h1>
//           <div className="p-2 t-shirtsrowbox">
//           <div className="custom-tshirts row justify-content-between align-items-center gx-0 gy-4">
//         {items.map((item, idx) => (
//           <div
//             key={idx}
//             className={`verityproduct-box col-12 col-md-12 col-lg-3 ${
//               selectedBox === item.title ? "selected-box" : ""
//             }`}
//             onClick={() => handleClick(item)}
//             style={{ cursor: "pointer" }}
//           >
//             <div className="box-innersize">
//               <img
//                 src={qualityshirt}
//                 alt={item.title}
//                 className="t-shirt-image img-fluid"
//               />
//               <h2 className="h5 bortexthead">{item.title}</h2>
//               <p className="tshirtstext">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, quo! Deserunt
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//         </div>
//       </div>
//       <div className="container d-flex justify-content-center align-items-center mt-3">
//       <div 
//        className={`btn  rounded-5 leftarrw-rounded  ${!canGoPrev ? "disabled" : ""}`}
//        onClick={() => canGoPrev && setCurrentPage((prev) => prev - 1)}
//       >
//         <FaCircleChevronLeft className="leftarrw-btn" />
//       </div>
      
//       <div className="p-3 tshirtstyles row gap-3 gap-md-3 gap-lg-2">
//           {visibleItems.map((item) => (
//             <div key={item.id} className="tshirtstylebox col-12 col-md-12 col-lg-3">
//               <div className="box-innersize">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="t-shirtstyle-image"
//                 />
//                 <h2 className="h5 bortextheadone">{item.title}</h2>
//               </div>
//             </div>
//           ))}
//         </div>

//       <div 
//         className={`btn rounded-5 rightarrw-rouded  ${!canGoNext ? "disabled" : ""}`}
//         onClick={() => canGoNext && setCurrentPage((prev) => prev + 1)}
//       >
//         <FaCircleChevronRight className="rightarrw-btn" />
//       </div>
//     </div>
//       <div className="container d-flex justify-content-center align-items-center mt-3  ">
//         <div className="row ">
//         <div className="d-flex gap-4 enter-quatity-box">
//           <div className="d-flex align-items-center col-lg-6 col-12">
//             <label className="me-2 mb-0 fw-bold p-3">Enter Quantity:</label>
//             <input type="text" className="rounded-5 py-1 px-3 w-50" />
//           </div>
//           <div className="d-flex align-items-center col-lg-6 col-12">
//             <label className="me-2 mb-0 fw-bold p-3">Number of logos:</label>
//             <input type="text" className="rounded-5 py-1 px-3 w-25" />
//           </div>
//         </div>
//         </div>
//       </div>
//       <div className="container d-flex justify-content-center align-items-center mt-3 mb-0">
//         <div className="image-uplode-box text-white bg-dark p-3 rounded-5 text-center justify-content-between d-flex ">
//           <label className="d-block mb-2 uplode-text">Upload Logo</label>
//           <label htmlFor="upload-logo" style={{ cursor: "pointer" }}>
//             <MdAddPhotoAlternate size={40} />
//           </label>
//           <input
//             type="file"
//             id="upload-logo"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={(e) => {
//               const file = e.target.files[0];
//               console.log("Selected file:", file);
//               // you can preview or handle file upload here
//             }}
//           />
//         </div>
//       </div>
//       <p className="mt-0">Png,Svg Format</p>
//       <div className="container d-flex justify-content-center align-items-center  logoaddedtshirt-box-con ">
//         <div className="logoaddedtshirt-box text-center justify-content-center align-items-center ">
//           <div className="logoaddedtshirt col-12 col-md-12 col-lg-3 ">
//             <div className="box-inner">
//               <img
//                 src={qualityshirt}
//                 alt="Premium Quality"
//                 className="t-shirtstyle-logo"
//                 style={{}}
//               />
//             </div>
//           </div>

//           <div className="logoaddedtshirt col-12 col-md-12 col-lg-3 ">
//             <div className="box-inner">
//               <img
//                 src={qualityshirt}
//                 alt="Premium Quality"
//                 className="t-shirtstyle-logo"
//                 style={{}}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div
//               className="container w-75 d-flex flex-column justify-content-center align-items-center  position-relative styling-box "
//               style={{ minHeight: "150px", paddingTop: "80px" }}
//             >
//               <div className="quality-type text-center">
//                 <div>Price Format:</div>
//                 <div className="row justify-content-center align-items-center">
//                   <div className=" justify-content-center align-items-center quality-types-box">
//                   {["Premium", "VFM", "Budget"].map((type) => (
//               <button
//                 key={type}
//                 className={`btn rounded-5 quality-btn ${
//                   selectedQuality === type ? "active" : ""
//                 }`}
//                 onClick={() => setSelectedQuality(type)}
//               >
//                 {type}
//               </button>
//             ))}
//                   </div>
//                 </div>
//               </div>
      
      
             
        
      
      
      
      
      
      
      
      
      
      
//               {productRows.map((row, index) => (
//         <div key={index} className="row w-100 mt-5 ">
          
//           {/* Colour Section */}
//           <div className="col-lg-6 col-12 p-2 d-flex flex-column choose-colour-box justify-content-center align-items-center">
//         {/* Label */}
//         <label className="mb-2">Choose Colour:</label>
      
//         <div className="colour-choose-box d-flex align-items-center gap-2 position-relative">
//           {/* Render selected color circles */}
//           {row.colors.map((color, i) => (
//   <div key={i} className="position-relative">
//     {/* Color Circle Input */}
//     <input 
//       type="color"
//       value={color}
//       className="w-10 h-10 border-0 p-0 cursor-pointer circle-color-picker"
//       onChange={(e) => {
//         const updatedRows = [...productRows];
//         updatedRows[index].colors[i] = e.target.value;
//         setProductRows(updatedRows);
//       }}
//     />

//     {/* ❌ Remove Color Button */}
//     {row.colors.length > 1 && (
//       <div
//         className="position-absolute"
//         style={{
//           top: "-6px",
//           right: "-6px",
//           backgroundColor: "white",
//           borderRadius: "50%",
//           width: "16px",
//           height: "16px",
//           fontSize: "12px",
//           color: "red",
//           textAlign: "center",
//           lineHeight: "16px",
//           cursor: "pointer",
//           border: "1px solid #ccc",
//           zIndex: 10,
//         }}
//         onClick={(e) => {
//           e.stopPropagation();
//           const updatedRows = [...productRows];
//           updatedRows[index].colors.splice(i, 1);
//           setProductRows(updatedRows);
//         }}
//       >
//         ×
//       </div>
//     )}
//   </div>
// ))}
      
//           {/* Dropdown Toggle */}
//           <div
//             className="color-select-icon d-flex align-items-center"
//             style={{ backgroundColor: "white", cursor: "pointer" }}
//           >
//             <IoIosArrowDown
//               size={20}
//               color="#555"
//               onClick={() => {
//                 const updatedRows = [...productRows];
//                 updatedRows[index].showColorList = !row.showColorList;
//                 setProductRows(updatedRows);
//               }}
//             />
//           </div>
      
//           {/* Color Dropdown */}
//           {row.showColorList && (
//             <div
//               className="color-list position-absolute bg-white p-2 rounded shadow"
//               style={{ top: "100%", left: 0, zIndex: 1000, minWidth: "150px" }}
//             >
//               {colors.map((color, i) => (
//                 <div
//                   key={i}
//                   className="color-option d-inline-block m-1"
//                   style={{
//                     width: "24px",
//                     height: "24px",
//                     borderRadius: "50%",
//                     backgroundColor: color,
//                     cursor: "pointer",
//                   }}
//                   onClick={() => {
//                     const updatedRows = [...productRows];
//                     updatedRows[index].colors[row.activeColorIndex] = color;
//                     updatedRows[index].showColorList = false;
//                     setProductRows(updatedRows);
//                   }}
//                 ></div>
//               ))}
//             </div>
//           )}
      
//           {/* ➕ Add New Color */}
//           <div
//             style={{ cursor: "pointer" }}
//             onClick={() => {
//               if (row.colors.length < 2) {
//                 const updatedRows = [...productRows];
//                 updatedRows[index].colors.push("#eee");
//                 setProductRows(updatedRows);
//               }
//             }}
//           >
//             <FaPlusCircle size={20} />
//           </div>
//         </div>
//       </div>
      
//           {/* Quantity Section */}
//           <div className="col-lg-6 col-12 p-2 d-flex flex-column choose-colour-box align-items-center">
//         <label className="mb-4">T-shirt Quantity:</label>
//         <div
//           className="position-relative w-100 d-flex flex-column align-items-center"
//         >
//           <div
//             className="pieces-box d-flex justify-content-between align-items-center  px-2 py-1 border rounded-5"
//             onClick={() => {
//               const updatedRows = [...productRows];
//               updatedRows[index].showDropdown = !row.showDropdown;
//               setProductRows(updatedRows);
//             }}
//           >
//             <span>{row.selectedQuantity}</span>
//             <IoIosArrowDown size={20} color="#555" />
//           </div>
      
//           {row.showDropdown && (
//             <div
//               className="dropdown-list position-absolute mt-1"
//               style={{
//                 top: "100%",
//                 maxHeight: "200px",
//                 overflowY: "auto",
//                 width: "100%",
//                 border: "1px solid #ccc",
//                 borderRadius: "5px",
//                 backgroundColor: "#fff",
//                 zIndex: 100,
//               }}
//             >
//               {numbers.map((num) => (
//                 <div
//                   key={num}
//                   onClick={() => {
//                     const updatedRows = [...productRows];
//                     updatedRows[index].selectedQuantity = num;
//                     updatedRows[index].showDropdown = false;
//                     setProductRows(updatedRows);
//                   }}
//                   style={{
//                     padding: "8px",
//                     cursor: "pointer",
//                     borderBottom: "1px solid #eee",
//                   }}
//                 >
//                   {num}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
      
//           {/* Type Section */}
//           <div className="col-lg-6 col-12 p-2 d-flex flex-column choose-colour-box justify-content-center ">
//             <label className="mb-3">Logo Type:</label>
//             <div className="d-flex justify-content-center align-items-center quality-type-select mb-5">
//               <div className={`btn print-btn ${row.selectedType === "Print" ? "active" : ""}`}
//                    onClick={() => {
//                      const updatedRows = [...productRows];
//                      updatedRows[index].selectedType = "Print";
//                      setProductRows(updatedRows);
//                    }}>Print</div>
//               <div className={`btn emposed-btn ${row.selectedType === "Emposed" ? "active" : ""}`}
//                    onClick={() => {
//                      const updatedRows = [...productRows];
//                      updatedRows[index].selectedType = "Emposed";
//                      setProductRows(updatedRows);
//                    }}>Emposed</div>
//             </div>
//             <div className="container w-100 d-flex flex-column justify-content-center align-items-center ">
//               <p className="tshirtchangetext mb-5">Tshirt any change in add design</p>
//               <textarea className="design-change-box"></textarea>
              
//             </div>
//           </div>
      
//           {/* Size Section */}
//           <div className="col-lg-6 col-12 d-flex flex-column align-items-center justify-content-center mb-md-2">
//             <label className="mb-3">Size Chart:</label>
      
           
      
//             <table className="table table-bordered w-100 text-center">
//           <thead>
//             <tr>
//               <th>Size</th>
//               <th className="w-50">Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
          
//             {sizes.slice(0, visibleSizeCount).map((size) =>(
//               <tr key={size}>
//                 <td>{size}</td>
//                 <td>
//                   <input
//                   type="number"
//                   min='0'
//                   className="form-control"
//                   value={
//                     sizeQuantities[size] === 0 || sizeQuantities[size]
//                       ? sizeQuantities[size]
//                       : ""
//                   }
//                   onChange={(e) => handleChange(size, e.target.value)}
                  
                  
                  
//                   ></input>
//                 </td>
//               </tr>
      
//             ))}
            
//           </tbody>
          
//         </table>
//         {visibleSizeCount < sizes.length &&(
//           <button className="btn rounded-5 add-size-btn" onClick={handleAddSize}>
//           Add Size
//         </button>
//         )}
       
//           </div>
      
//         </div>
//       ))}
              
//             </div>
      
//       <div className="container w-50 d-flex flex-column justify-content-center align-items-center ">
//         {/* <p className="tshirtchangetext">Tshirt any change in add design</p>
//         <textarea className="design-change-box"></textarea> */}
//         <div className={`sent-text-btn mt-3 ${clicked ? "active" : ""}`}
//       onClick={() => setClicked(!clicked)}>Send</div>
//       </div>




      
//       <div className="container price-cal-box ">
//         <div className="row price-calculate display-flex justify-content-center align-items-center ">
//           <div className="d-flex flex-column col-lg-2 col-12 ">
//             <label>Amount:</label>
//             <div className="amount-box mt-3">

//             </div>
//           </div>
//           <div className="d-flex flex-column col-lg-2 col-12 ">
//             <label>GST Detailes:</label>
//             <div className="gst-box mt-3">

//             </div>
//           </div>
//           <div className="d-flex flex-column col-lg-2 col-12 justify-content-center align-items-center">
//             <label>Discount:<strong> 50%</strong></label>
           
//             <div className="discount-box mt-3">
//              50%
//             </div>
//           </div>
//           <div className="col-1">=</div>
//           <div className="d-flex flex-column col-lg-2 col-12 ">
//             <label>Total-Amount:</label>
//             <div className="total-amount-box mt-3">
             
//             </div>
//           </div>

//         </div>


//       </div>
//       <div className="social container-fluid  ">
//               <div class="row justify-content-center">
//                 <div className="sociladivider   d-flex justify-content-around text-white">
//                   <div className="d-flex align-items-center justify-content-center socialone col-2 ">
//                     <h1
//                       className="socilaheader"
//                       style={{ margin: "0", color: "white", fontSize: "25px" }}
//                     >
//                       f
//                     </h1>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-center socialone col-2">
//                     <text className="socialtexts" style={{ color: "white" }}>
//                       Twitter
//                     </text>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-center socialone col-2">
//                     <text className="socialtexts" style={{ color: "white" }}>
//                       Instagram
//                     </text>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-center socialone col-2">
//                     <text className="socialtexts" style={{ color: "white" }}>
//                       Youtube
//                     </text>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-center socialone col-2">
//                     <text className="socialtexts" style={{ color: "white" }}>
//                       Pinterest
//                     </text>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="footerone container-fluid py-5">
//         <div className="row align-items-center justify-content-center">
//           <div className=" col-5 d-flex flex-column align-items-center justify-content-center text-white">
//             <img className="img img-fluid footer-img" alt="logo" src={bluef} ></img>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores beatae itaque veniam doloremque.</p>
//             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero ipsa architecto nulla reprehenderit odio aspernatur aperiam esse nam qui expedita.</p>
//           </div>
//         </div>
//         <div className="footerdetails row justify-content-center text-white">
//           <div className="getintouch col-md-3 mb-4">
//             <h4 style={{ color: "white" }}>Get in Touch</h4>
//             <div className="phonedetail d-flex align-items-center mb-3">
//               <div style={{ color: "green", fontSize: "24px" }}>
//                 <FiPhoneCall className="text-success fs-4" />
//               </div>
//               <div
//                 className="ms-3"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   marginLeft: "10px",
//                 }}
//               >
//                 <span
//                   className="d-block fw-bold"
//                   style={{ color: "white", fontSize: "15px" }}
//                 >
//                   Hotline
//                 </span>
//                 <span  style={{ color: "#8a8a8a" }}>
//                   19008188
//                 </span>
//               </div>
//             </div>
//             <div className="phonedetail d-flex align-items-center mb-3">
//               <div style={{ color: "green", fontSize: "24px" }}>
//                 <HiOutlineMailOpen />
//               </div>
//               <div
//                 className="ms-3"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   marginLeft: "10px",
//                 }}
//               >
//                 <span style={{ color: "white", fontSize: "15px" }}>EMAIL</span>
//                 <span style={{ color: "#8a8a8a" }}>hello@teespace.io</span>
//               </div>
//             </div>
//             <div className="phonedetail">
//               <div style={{ color: "green", fontSize: "24px" }}>
//                 <IoLocationOutline />
//               </div>
//               <div className="address-fix d-flex align-items-start">
//                 <div className="ms-3 d-flex flex-column text-start">
//                   <span style={{ color: "white", fontSize: "15px" }}>
//                     ADDRESS
//                   </span>
//                   <span style={{ color: "#8a8a8a" }}>
//                     3245 Abbot Kinney BLVD-PH
//                   </span>
//                   <span style={{ color: "#8a8a8a" }}>Venice,CA124</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="getintouch col-md-2 mb-4 text-start">
//             <h4 style={{ color: "white", marginBottom: "7px" }}>Company</h4>
//             <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>About Us</p>
//             <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>Our blog</p>
//             <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>
//               Start a Return
//             </p>
//             <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>Contact Us</p>
//             <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>
//               Shipping FAQs
//             </p>
//           </div>
//           <div className="getintouch col-md-2 mb-4 text-start">
//             <h4 style={{ color: "white" }}>Useful Links</h4>
//             <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>My Account</p>
//             <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>Shipping</p>
//             <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>
//               Contact & Support
//             </p>
//             <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>
//               All Products
//             </p>
//           </div>
//           <div className="getintouch col-md-3 mb-4 text-start">
//             <h4 style={{ color: "white" }}>Newsletter</h4>
//             <p style={{ color: "#8a8a8a", marginBottom: "0px" }}>
//               Follow our newsletter to stay updated about us
//             </p>
            
    
//             <div className="email-input-container relative inline-block">
//   <input
//     type="email"
//     placeholder="Your email address"
//     className="emailbox pr-10"  // Add right padding for the arrow
//   />
//   <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//     <FaArrowRight />
//   </span>
// </div>
            
//           </div>
//         </div>
//         <div className="footersocial row justify-content-between align-items-center  mt-5 px-4">
//           <div
//             className="footersocial1 col-md-6 d-flex align-items-center gap-3"
//             style={{ display: "flex", gap: "20px", color: "#8a8a8a" }}
//           >
//             <span className="followuson" style={{ marginTop: "6px" }}>Follow us on </span>
//             <span>
//               <FaTwitter style={{ color: "#8a8a8a", marginTop: "6px" }} />
//             </span>
//             <span>
//               <FaFacebookF style={{ color: "#8a8a8a", marginTop: "6px" }} />
//             </span>
//             <span>
//               <FaInstagram style={{ color: "#8a8a8a", marginTop: "6px" }} />
//             </span>
//             <span>
//               <FiYoutube style={{ color: "#8a8a8a", marginTop: "6px" }} />
//             </span>
//           </div>

//           <div className="footersocial1 col-md-6 d-flex justify-content-start gap-2 ">
//             <img src={amex} style={{ width: "33px", height: "37px" }}></img>
//             <img
//               src={applepay}
//               style={{
//                 width: "33px",
//                 height: "20px",
//                 backgroundColor: "white",
//               }}
//             ></img>
//             <img
//               src={gpay}
//               style={{
//                 width: "33px",
//                 height: "20px",
//                 backgroundColor: "white",
//               }}
//             ></img>
//             <img src={visa} style={{ width: "33px", height: "20px" }}></img>
//             <img
//               src={mastercard1}
//               style={{ width: "33px", height: "20px" }}
//             ></img>
//             <img src={phonepay} style={{ width: "33px", height: "20px" }}></img>
//           </div>
//         </div>
//       </div>
//             <div className="footer2 py-3">
//               <p style={{ color: "#000000", fontSize: "16px", margin: "0px" }}>
//                 © All Copyright 2025 by Website Design and Build -
//                 <span style={{ fontWeight: "bold", color: "#000000" }}>
//                   www.Tabsquareinfotech.com
//                 </span>
//               </p>
//             </div>
//     </>
//   );
// };

// export default Shopcontentproduct;
