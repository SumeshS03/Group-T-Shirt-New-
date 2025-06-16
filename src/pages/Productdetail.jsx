import React, { useRef, useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import qualityshirt from "../images/Premium-Quality.png";
import HomeHeader from "../Layout/HomeHeader";
import shopimage from "../images/shopimage.png";
import { useLocation,useNavigate } from "react-router-dom";
import './Roundneck'
import "./Productdetail.css"
import { useCart } from "./CartContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from 'react-bootstrap/Button';
// import { useCart } from "../context/CartContext";
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
import Hoodiesone from "../images/Hoodie1.png"
import Hoodie from "../images/Hoodie.png"
import Hoodiethree from "../images/Hoodie3.png"
import tshirttwo from "../images/Tshirt2.png"
import tshirtthree from "../images/tshirt3.png"
import tshirtfour from "../images/tshirt4.png"
import fullsleeveone from "../images/Full-Sleeve1.png"
import fullsleevethree from "../images/Full-Sleve3.png"
import axios from 'axios';
import { Form, Row, Col, FloatingLabel} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import Roundneck from "./Roundneck";
import Hoodies from "./Hoodies";
import Jackets from "./Jackets";
import Caps from "./Cups"
import Jerseys from "./Jerseys";
import Collaretshirt from "./Collaretshirt";
import Footer from '../Layout/Footer'


const Productdetail = () => {

   const [selectedSize, setSelectedSize] = useState("");
   const [color, setColor] = useState("#e6194b");
   const [collarcolor,setcollarcolor]=useState("#e6194b");
   const [enteredQty, setEnteredQty] = useState('');
   const [quantityError, setQuantityError] = useState('');
  
   

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

   const [activeButton, setActiveButton] = useState("");

  //new fuction
  



  //end


 
  

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };


  const [showOptions, setShowOptions] = useState(false);
  const [showOptionsone, setShowOptionsone] = useState(false);
  const [showOptionsthree, setShowOptionsthree] = useState(false);
  const [secondlogo, setsecondlogo]=useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const polytoggle = () => {
    setShowOptionsone(!showOptionsone)
  };
  const polycottoggle = () => {
    setShowOptionsthree(!showOptionsthree)
  };

  const [uploadedImage, setUploadedImage] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("Selected image URL:", imageUrl);
  
      setUploadedImage(imageUrl);
  
     
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated.uploadedImage;
        return updated;
      });
    }
  };

  const [uploadedImagetwo, setUploadedImagetwo] = useState('');
  const handleImageUploadtwo = (e) =>{
    const file = e.target.files[0];
    if (file) {
      const imageUrltwo = URL.createObjectURL(file);
      console.log("Selected image URL:", imageUrltwo);
  
    
      setUploadedImagetwo(imageUrltwo);
      
    }
    
  }

  const showsecondlogoadd = () =>{
      setsecondlogo(!secondlogo)
  }

  const sizes = [
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

  const [halfSleeve, setHalfSleeve] = useState({});
  const [fullSleeve, setFullSleeve] = useState({});
  const [amountWithGst, setAmountWithGst] = useState(0);
  const [totalamount,settotal]=useState(0);
  const [gsttotal,setgsttotal]=useState(0);

  const handleInputChange = (type, label, value) => {
    const val = parseInt(value, 10);
    const safeVal = isNaN(val) ? 0 : val;

    const GST_RATE = 0.18;
    const halfSleevePrice = Number(productdetail?.price.half_sleeve) || 0;
    const fullSleevePrice = Number(productdetail?.price.full_sleeve) || 0;


  
    if (type === "half") {
      setHalfSleeve((prev) => ({ ...prev, [label]: safeVal }));
      console.log("safeVal" , safeVal);
      var hfSle = safeVal ? safeVal  : 0;
    } else {
      setFullSleeve((prev) => ({ ...prev, [label]: safeVal }));
      var flSle = safeVal ? safeVal : 0;
    }

    

   




    setFormErrors((prev) => ({ ...prev, quantityMatch: '' }))
  };

  console.log("amountWithGst" , amountWithGst);
  

  const totalHalf = Object.values(halfSleeve).reduce((sum, qty) => sum + qty, 0);
  const totalFull = Object.values(fullSleeve).reduce((sum, qty) => sum + qty, 0);
  const grandTotal = totalHalf + totalFull;
  const [logoCount, setLogoCount] = useState(1);

  


  useEffect(() => {
    if (totalHalf > 0 || totalFull > 0) {
      const halfTotal = totalHalf * selectedPrice;
const fullTotal = totalFull * (selectedPrice + 50);
const logoTotal = logoCount > 0 ? logoCount * 50 : 0;

const totalamount = halfTotal + fullTotal + logoTotal;
const gstAmount = totalamount + (totalamount* 0.18);

console.log('selectedprice from top', totalHalf )
console.log('gst selectedprice from top', gstAmount )

console.log('halftotal from top',halfTotal)
console.log('fulltotal from top',fullTotal)
console.log('logo price from top',logoTotal)

settotal(totalamount);
setgsttotal(gstAmount);
console.log('totalamount ',totalamount)
    }

  }, [halfSleeve , fullSleeve , logoCount])
  

  const [quantities, setQuantities] = useState(
    sizes.map(() => ({ half: 0, full: 0 }))
  );

  const handleQuantityChange = (index, type, value) => {
    const updated = [...quantities];
    updated[index][type] = Number(value);
    setQuantities(updated);
  };





  
    

    

   
    // const [logos, setLogos] = useState([{ logotype: '', position: '' }]);

    const [visibleLogos, setVisibleLogos] = useState(1);
    const [uploadedImages, setUploadedImages] = useState({});
    const [remark, setRemark] = useState('');
    const [qtyError, setQtyError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [pocketRequired, setPocketRequired] = useState('no');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [selectedCotton, setSelectedCotton] = useState('');
    const [selectedPolyester, setSelectedPolyester] = useState('');
    const [selectedPolyCotton, setSelectedPolyCotton] = useState('');
    const [logoType, setLogoType] = useState('');
    const [logotypetwo, setLogoTypeTwo]=useState('');
    const [logoPosition, setLogoPosition] = useState('');
    const [logoPositionTwo, setLogoPositionTwo] = useState('')
    const [selectedoptions, setSelectedoptions] = useState('');
    const [colorTouched, setColorTouched] = useState(false);
    const [collarcolorTouched,setcollarcolorTouched]= useState(false);
     const [productsData, setProductsData] = useState([]);
     const [hasSubmitted, setHasSubmitted] = useState(false);
     const [showRequiredError, setShowRequiredError] = useState(false);
     const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [materialOptions, setMaterialOptions] = useState({
  Cotton: [],
  Polyester: [],
  Polycotton: [],
});
    
   const [logos, setLogos] = useState([
  { logotype: '', position: '', image: '' }
]);

    console.log("logos0 " , logos);
    

   
    

    const handleLogoCountChange = (e) => {
      const count = parseInt(e.target.value, 10);
      setLogoCount(count);
    
      const updatedLogos = Array.from({ length: count }, (_, index) => {
        return logos[index] || { type: '', position: '', image: null };
      });
    
      setLogos(updatedLogos);
    };
    
    



    const handleLogoChange = (index, field, value) => {
    const updated = [...logos];
    updated[index][field] = value;
    setLogos(updated);
  };

 const handleLogoPhotoChange = (index, file) => {
  const updatedLogos = [...logos];
  updatedLogos[index].image = URL.createObjectURL(file); // for preview
  updatedLogos[index].file = file; // for backend upload
  setLogos(updatedLogos);
};


    
    

    const handleLogoImageUpload = (index, file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedLogos = [...logos];
        updatedLogos[index].image = reader.result;
        setLogos(updatedLogos);
    
        // Clear error if image uploaded
        const updatedErrors = { ...formErrors };
        if (file) {
          delete updatedErrors[`logoImage_${index}`];
        }
        setFormErrors(updatedErrors);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    
    
    
    


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
    
   

    const getMinDate =()=>{
      const today=new Date();
      today.setDate(today.getDate()+3);
      return today.toISOString().split('T')[0];
    };

   
const handleBlur = () => {
  const newErrors = {};

  if (!enteredQty) {
    newErrors.enteredQty = 'Quantity must be entered';
  } else if (isNaN(enteredQty)) {
    newErrors.enteredQty = 'Quantity must be a number';
  } else if (parseInt(enteredQty) < 15) {
    newErrors.enteredQty = 'Minimum quantity should be 15';
  }

  setFormErrors(newErrors);
};
const [showSuccess, setShowSuccess] = useState(false);



const handleLogoCountBlur = () => {
  const newErrors = { ...formErrors }; 

  if (!logoCount) {
    newErrors.logoCount = 'Logo count is required';
  } else if (isNaN(logoCount)) {
    newErrors.logoCount = 'Logo count must be a number';
  } else if (parseInt(logoCount) < 1 || parseInt(logoCount) > 4) {
    newErrors.logoCount = 'Logo count must be between 1 and 4';
  } else {
    
    delete newErrors.logoCount;
  }

  setFormErrors(newErrors);
};


    console.log("render")

  const [logoPhotos, setLogoPhotos] = useState([]);

  
const handleLogoImageUploadone = (index, file) => {
  if (!file) return;

  const updatedLogos = [...logos];
  updatedLogos[index].imageFile = file; 
  updatedLogos[index].image = URL.createObjectURL(file); 
  setLogos(updatedLogos);


  const updatedErrors = { ...formErrors };
  delete updatedErrors[`logoImage_${index}`];
  setFormErrors(updatedErrors);
};

console.log("logos123" , logos);


    const validateForm = () => {
      const errors = {};
    
      if (!enteredQty) errors.enteredQty = 'Quantity must be entered';
      
      if (!deliveryDate) errors.deliveryDate = 'Delivery date is required';
      if (!colorTouched) errors.color = 'Choose color';
      if(!collarcolorTouched) errors.collarcolor='Choose collare color'
      if (!selectedCotton && !selectedPolyester && !selectedPolyCotton) {
        errors.selectedoptions = 'Please select at least one option.';
      }
      if (parseInt(enteredQty) !== grandTotal) {
        errors.quantityMatch = 'Total quantities must match entered quantity';
      }
      if (!remark || remark.trim() === '') {
      errors.remark = 'Remark is required';
      }
    
      logos.forEach((logo, index) => {
        if (!logo.logotype) errors[`logotype_${index}`] = `Select Logo Type for logo ${index + 1}`;
        if (!logo.position) errors[`logoPosition_${index}`] = `Select Logo Position for logo ${index + 1}`;
        if (!logo.image) errors[`logoImage_${index}`] = `Upload logo image for logo ${index + 1}`;
      });
    
      return errors;
    };
  
    

 
    const sizestwo = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'];

    const quantitySizeWise = {};
    sizestwo.forEach(size => {
      const upperSize = size.toUpperCase(); 
      quantitySizeWise[size] = {
        half: Number(halfSleeve[upperSize]) || 0,
        full: Number(fullSleeve[upperSize]) || 0
      };
    });

  



const handleSubmit = async (e) => {
  e.preventDefault();
  const storedCustomerId = localStorage.getItem('customerId');
  const formattedDeliveryDate = new Date(deliveryDate).toLocaleDateString('en-CA'); 

  const newErrors = validateForm();
  const noErrors = Object.keys(newErrors).length === 0;

  setFormErrors(newErrors);
  setShowSuccess(noErrors);
  setHasSubmitted(true);

  if (!noErrors) {
    setShowErrorMessage(true);
    alert("Enter all fields to add!");
    setTimeout(() => setShowErrorMessage(false), 2000);
    return;
  }

  // Build logo metadata (no photos here)
 const logoMetadata = logos.map((logo) => ({
    logotype: logo.logotype,
    position: logo.position,

  }));
  

  const formDataObj = {
    customerId: storedCustomerId,
    quantityCount: Number(enteredQty),
    logoCount: Number(logoCount),
    pocketRequired: pocketRequired === "yes",
    deliveryDate: formattedDeliveryDate,
    color,
    cloth: selectedCotton || selectedPolyester || selectedPolyCotton,
    clothMaterial: productdetail?.material,
    logos: logoMetadata,
    quantitySizeWise,
    quantitySleeveWise: {
      half: totalHalf,
      full: totalFull,
    },
    totalCount: Number(grandTotal),
    remark,
    amount: totalamount,
    totalAmount: gsttotal,
    productId: productdetail?._id,
  };

  // Prepare FormData
  
  const payload = new FormData();
  payload.append('customerId', formDataObj.customerId);
  payload.append('quantityCount', formDataObj.quantityCount);
  payload.append('logoCount', formDataObj.logoCount);
  payload.append('pocketRequired', formDataObj.pocketRequired);
  payload.append('deliveryDate', formDataObj.deliveryDate);
  payload.append('color', formDataObj.color);
  payload.append('cloth', formDataObj.cloth);
  payload.append('clothMaterial', formDataObj.clothMaterial);
  payload.append('totalCount', formDataObj.totalCount);
  payload.append('remark', formDataObj.remark);
  payload.append('amount', formDataObj.amount);
  payload.append('totalAmount', formDataObj.totalAmount);
  payload.append('productId', formDataObj.productId);
  payload.append('logos', JSON.stringify(logoMetadata));
 logos.forEach((logo) => {
  if (logo.file) {
    payload.append('logoPhotos', logo.file);
  }
});

  // Append JSON strings
  payload.append('quantitySizeWise', JSON.stringify(formDataObj.quantitySizeWise));
  payload.append('quantitySleeveWise', JSON.stringify(formDataObj.quantitySleeveWise));
 

    console.log("logos" , logos);





  

  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.post("https://gts.tsitcloud.com/api/cartItems/add", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("Form submitted successfully:", response.data);
    alert("Product added to cart successfully!");
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
      const apiMessage = error.response.data?.message || "Something went wrong. Please try again.";
      alert(apiMessage);
    } else {
      console.error("Error submitting form:", error);
      alert("Network error or server not reachable.");
    }
  }
};








  
    
    const [productdetail, setProductdetail] = useState(null);
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoverImage, setHoverImage] = useState(null);
    
    const [hoveredImage, setHoveredImage] = useState(null);

   
    

    useEffect(() => {
      const fetchProduct = async () => {

        const token = localStorage.getItem('authToken');
   
        try {
          const response = await axios.get('https://gts.tsitcloud.com/api/products/single/products-by-category', {
            headers: {
              Authorization: `Bearer token`,
            },
          });
  
          
          const allProducts = response.data.flatMap(cat => cat.products);
          setProductsData(allProducts);
          const foundProduct = allProducts.find((p) => p._id === id);
  
          if (foundProduct) {
            setProductdetail(foundProduct);
            setSelectedImage(`https://gts.tsitcloud.com/${foundProduct.images[0]}`);
            const categoryId = foundProduct?.category?._id;
        if (categoryId) {
          localStorage.setItem('categoryId', categoryId);
          console.log("Stored category ID:", categoryId);
        }
          }
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      };
  
      fetchProduct();
    }, [id]);

const [selectedPrice, setSelectedPrice] = useState(0);

// useEffect(() => {
//   const token = localStorage.getItem('authToken');
//   const cat_id = localStorage.getItem('categoryId');

//   console.log("Token:", token);
//   console.log("Category ID:", cat_id);

//   axios.get(`https://gts.tsitcloud.com/api/category/${cat_id}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   })
//     .then((response) => {
//       console.log("Full API response:", response);
//       const selectedCategory = response.data;
//       console.log("Selected Category:", selectedCategory);

//       if (selectedCategory) {
//         const options = {
//           Cotton: [],
//           Polyester: [],
//           Polycotton: []
//         };

//         selectedCategory.cloth_type.forEach((type) => {
//           const typeName = type.name.toLowerCase().replace(/[-\s]/g, '');
//           if (typeName.includes('cotton') && !typeName.includes('poly')) {
//             options.Cotton = type.material;
//           } else if (typeName === 'polyester') {
//             options.Polyester = type.material;
//           } else if (typeName.includes('poly') && typeName.includes('cotton')) {
//             options.Polycotton = type.material;
//           } else {
//             console.warn("Unhandled cloth type:", typeName);
//           }
//         });

//         setMaterialOptions(options);
//         console.log('MaterialOptions to be set:', options);
//       }
//     })
//     .catch((error) => {
//       if (error.response) {
//         console.error('Server responded with error:', error.response.status);
//         console.error('Response data:', error.response.data);
//       } else {
//         console.error('Error setting up request:', error.message);
//       }
//     });
// }, []);


  
  
  
  
  const product = productdetail;

  const handleCartClick = () => {

    const token = localStorage.getItem('authToken');
   
    
    if (token) {
      // User is authenticated
      setActiveButton("cart");
      navigate(`/cart`);
    }else {
      // User is not authenticated
      alert("Please login to access the cart.");
      navigate('/profile'); // Or redirect to login page
    }
  };

  

  
  if (!productdetail) return <p>Loading...</p>;


  if (!product) return <h2>Product not found</h2>;







const responsive = {
  superLargeDesktop: {
   
    breakpoint: { max: 4000, min: 3000 },
    items: 2
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
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
          <h2 className="text-start productnametext">{productdetail?.name}</h2>
          <p className="text-start">{productdetail?.description}</p>

          <hr className="divider-line" />

          <p className="text-start"><strong>Color:</strong> {productdetail?.color}</p>
          <p className="text-start"><strong>Material:</strong> {productdetail?.material}</p>
          <p className="text-start"><strong>Brand:</strong> {productdetail?.brand}</p>
          <p className="text-start"><strong>Weight:</strong> {productdetail?.weight}</p>

          <hr className="divider-line" />

          <h5 className="mb-2">About this item</h5>
          <ul className="text-start">
            <li><strong>Type:</strong> Comfortable Cotton T-Shirt</li>
            <li><strong>Fit:</strong> Regular Fit – Comfortable for daily wear</li>
            <li><strong>Fabric:</strong> 100% Pure Cotton – Durable and skin-friendly</li>
            <li><strong>Design:</strong> Printed Graphic – Stylish and trendy look</li>
          </ul>

          {/* Responsive Table */}
          <div className="table-responsive mt-4">
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
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  </div>
</div>



<Collaretshirt></Collaretshirt>











   

   

    


    


   







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

export default Productdetail




