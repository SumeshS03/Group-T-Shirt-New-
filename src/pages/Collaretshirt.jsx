import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from 'react-icons/fa';
import Ratemodal from './Ratemodal';
import Caps from "./Cups";
import Jerseys from './Jerseys';
import PolysterColorModal from './PolysterColorModal';
import PolyCottonColorModal from "./PolyCottonColorModal";
import CollareCottonColorModal from "./CollareCottonColorModal";
import CollarePolysterColorModal from "./CollarePolysterColorModal";
import CollarePolyCottonColorModal from "./CollarePolyCottonColorModal";
import LoginModal from "./LoginModal";
import useNavigationGuard from '../ApiFunctions/useNavigationGuard'
import { flushSync } from "react-dom";
import Swal from 'sweetalert2';
import './Collaretshirt.css'
import "./Shopcontentproduct.css";


const Collaretshirt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantityError, setQuantityError] = useState("");
  const [sleeveError, setSleeveError] = useState("");
  const [showPolyesterModal, setShowPolyesterModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showPolCottonModel, setShowPolyCottonModel] = useState(false);
  const [showCollareCottonColorModal, setShowCollareCottonColorModal] = useState(false);
  const [showCollarePolysterColorModal, setShowCollarePolysterColorModal] = useState(false);
  const [showCollarePolyCottonColorModal, setShowCollarePolyCottonColorModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  // const { formData, setFormData, resetForm } = useFormContext();

  // Discount structure based on quantity ranges
  const quantityDiscounts = [
    { min: 1, max: 10, discount: 0 },
    { min: 11, max: 20, discount: 8 },
    { min: 21, max: 30, discount: 16 },
    { min: 31, max: 40, discount: 24 },
    { min: 41, max: 50, discount: 32 },
    { min: 51, max: 60, discount: 40 },
    { min: 61, max: 70, discount: 48 },
    { min: 71, max: 80, discount: 56 },
    { min: 81, max: 90, discount: 64 },
    { min: 91, max: 100, discount: 72 },
    { min: 101, max: 200, discount: 79 },
    { min: 201, max: 300, discount: 86 },
    { min: 301, max: 400, discount: 93 },
    { min: 401, max: 500, discount: 100 },
    { min: 501, max: 600, discount: 107 },
    { min: 601, max: 700, discount: 114 },
    { min: 701, max: 800, discount: 121 },
    { min: 801, max: 900, discount: 128 },
    { min: 901, max: 1000, discount: 135 },
    { min: 1001, max: 2000, discount: 138 },
    { min: 2001, max: 3000, discount: 141 },
    { min: 3001, max: 4000, discount: 144 },
    { min: 4001, max: 5000, discount: 147 },
    { min: 5001, max: 6000, discount: 150 },
    { min: 6001, max: 7000, discount: 153 },
    { min: 7001, max: 8000, discount: 156 },
    { min: 8001, max: 9000, discount: 159 },
    { min: 9001, max: 10000, discount: 162 },
    { min: 10001, max: 20000, discount: 164 },
    { min: 20001, max: 30000, discount: 166 },
    { min: 30001, max: 40000, discount: 168 },
    { min: 40001, max: 50000, discount: 170 },
    { min: 50001, max: 60000, discount: 172 },
    { min: 60001, max: 70000, discount: 174 },
    { min: 70001, max: 80000, discount: 176 },
    { min: 80001, max: 90000, discount: 178 },
    { min: 90001, max: 100000, discount: 180 }
  ];




  const deliveryTimeRanges = [
    { min: 1, max: 10, days: 10 },
    { min: 11, max: 20, days: 10 },
    { min: 21, max: 30, days: 10 },
    { min: 31, max: 40, days: 10 },
    { min: 41, max: 50, days: 10 },
    { min: 51, max: 60, days: 10 },
    { min: 61, max: 70, days: 10 },
    { min: 71, max: 80, days: 10 },
    { min: 81, max: 90, days: 10 },
    { min: 91, max: 100, days: 12 },
    { min: 101, max: 200, days: 12 },
    { min: 201, max: 300, days: 12 },
    { min: 301, max: 400, days: 13 },
    { min: 401, max: 500, days: 13 },
    { min: 501, max: 600, days: 13 },
    { min: 601, max: 700, days: 14 },
    { min: 701, max: 800, days: 14 },
    { min: 801, max: 900, days: 14 },
    { min: 901, max: 1000, days: 14 },
    { min: 1001, max: 2000, days: 16 },
    { min: 2001, max: 3000, days: 16 },
    { min: 3001, max: 4000, days: 17 },
    { min: 4001, max: 5000, days: 17 },
    { min: 5001, max: 6000, days: 18 },
    { min: 6001, max: 7000, days: 18 },
    { min: 7001, max: 8000, days: 19 },
    { min: 8001, max: 9000, days: 19 },
    { min: 9001, max: 10000, days: 20 },
    { min: 10001, max: 20000, days: 22 },
    { min: 20001, max: 30000, days: 22 },
    { min: 30001, max: 40000, days: 24 },
    { min: 40001, max: 50000, days: 24 },
    { min: 50001, max: 60000, days: 26 },
    { min: 60001, max: 70000, days: 26 },
    { min: 70001, max: 80000, days: 28 },
    { min: 80001, max: 90000, days: 28 },
    { min: 90001, max: 100000, days: 30 }
  ];



  const logoPriceRanges = [
    { min: 1, max: 10, print: 50, emposed: 150 },
    { min: 11, max: 20, print: 45, emposed: 100 },
    { min: 21, max: 30, print: 40, emposed: 80 },
    { min: 31, max: 40, print: 35, emposed: 75 },
    { min: 41, max: 50, print: 33, emposed: 70 },
    { min: 51, max: 60, print: 31, emposed: 65 },
    { min: 61, max: 70, print: 29, emposed: 60 },
    { min: 71, max: 80, print: 27, emposed: 55 },
    { min: 81, max: 90, print: 25, emposed: 50 },
    { min: 91, max: 100, print: 25, emposed: 50 },
    { min: 101, max: 200, print: 23, emposed: 45 },
    { min: 201, max: 300, print: 21, emposed: 40 },
    { min: 301, max: 400, print: 19, emposed: 35 },
    { min: 401, max: 500, print: 17, emposed: 33 },
    { min: 501, max: 600, print: 15, emposed: 31 },
    { min: 601, max: 700, print: 14, emposed: 29 },
    { min: 701, max: 800, print: 12, emposed: 27 },
    { min: 801, max: 900, print: 11, emposed: 25 },
    { min: 901, max: 1000, print: 10, emposed: 25 },
    { min: 1001, max: 2000, print: 9, emposed: 24 },
    { min: 2001, max: 3000, print: 9, emposed: 23 },
    { min: 3001, max: 4000, print: 9, emposed: 22 },
    { min: 4001, max: 5000, print: 9, emposed: 21 },
    { min: 5001, max: 6000, print: 8, emposed: 20 },
    { min: 6001, max: 7000, print: 8, emposed: 20 },
    { min: 7001, max: 8000, print: 8, emposed: 20 },
    { min: 8001, max: 9000, print: 8, emposed: 20 },
    { min: 9001, max: 10000, print: 8, emposed: 20 },
    { min: 10001, max: 20000, print: 7, emposed: 19 },
    { min: 20001, max: 30000, print: 7, emposed: 18 },
    { min: 30001, max: 40000, print: 7, emposed: 17 },
    { min: 40001, max: 50000, print: 7, emposed: 16 },
    { min: 50001, max: 60000, print: 6, emposed: 15 },
    { min: 60001, max: 70000, print: 6, emposed: 15 },
    { min: 70001, max: 80000, print: 6, emposed: 15 },
    { min: 80001, max: 90000, print: 6, emposed: 15 },
    { min: 90001, max: 100000, print: 6, emposed: 15 }
  ];

  const logoOptions = [
    { label: 'Printed', price: 50 },
    { label: 'Embroidered', price: 150 }
  ];

  const sizes = [
    { label: "xs", chest: 34 },
    { label: "s", chest: 36 },
    { label: "m", chest: 38 },
    { label: "l", chest: 40 },
    { label: "xl", chest: 42 },
    { label: "xxl", chest: 44 },
    { label: "xxxl", chest: 46 },
    { label: "xxxxl", chest: 48 },
    { label: "xxxxxl", chest: 50 },
  ];

  // Initialize empty sleeve state
  const emptySleeveState = sizes.reduce((acc, size) => {
    acc[size.label] = "";
    return acc;
  }, {});

  // State management
  const [productdetail, setProductdetail] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedGSM, setSelectedGSM] = useState({ id: "", name: "", price: 0, type: "" });
  const [materialOptions, setMaterialOptions] = useState({
    Cotton: [],
    Polyester: [],
    Polycotton: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    quantity: '',
    logoCount: '0',
    logos: [],
    color: '',
    collarColor: 'true',
    hasCollarColor: true,
    logoFile: null,
    logoPosition: '',
    logoType: '',
    halftotal: 0,
    fulltotal: 0,
    grandtotal: 0,
    halfSleeve: { ...emptySleeveState },
    fullSleeve: { ...emptySleeveState },
    remark: '',
    cloth: '',
    clothMaterial: "Cotton",
    discountPerPiece: 0,
    discountedPrice: 0,
    basePrice: 0,
    deliveryDays: 0,
    estimatedDeliveryDate: '',
    printamount: '',
    emposedamount: '',
    finalAmount:0,

  });


//helperfuction to upadate the totalamount
useEffect(() => {
  if (formData.grandtotal) {
    const finalTotal = parseFloat(formData.grandtotal) * 1.05; // add 5%
    console.log("Grandtotal changed with gst:",finalTotal)
    setFormData((prev) => ({
      ...prev,
      finalAmount: finalTotal,
    }));
  }
}, [formData.grandtotal]);



  // Helper functions
  const getDiscountPerPiece = (quantity) => {
    const foundRange = quantityDiscounts.find(
      range => quantity >= range.min && quantity <= range.max
    );
    return foundRange ? foundRange.discount : 0;
  };





  const getDeliveryDays = (quantity) => {
    const foundRange = deliveryTimeRanges.find(
      range => quantity >= range.min && quantity <= range.max
    );
    return foundRange ? foundRange.days : 30; // Default to 30 days if not found
  };


  const getLogoPriceFromRange = (type) => {
    const quantity = parseInt(formData.quantity) || 0;
    const foundRange = logoPriceRanges.find(
      (range) => quantity >= range.min && quantity <= range.max
    );

    if (!foundRange) return type === 'Printed' ? 25 : 50; // fallback to default price

    return type === 'Printed' ? foundRange.print : foundRange.emposed;
  };




  const getLogoPricePerPiece = (quantity, logos = []) => {
    const foundRange = logoPriceRanges.find(
      range => quantity >= range.min && quantity <= range.max
    );

    if (!foundRange) return 0;

    let totalLogoPrice = 0;

    logos.forEach((logo) => {
      if (logo.type === 'Printed') {
        totalLogoPrice += foundRange.print;
      } else if (logo.type === 'Embroidered') {
        totalLogoPrice += foundRange.emposed;
      }
    });

    return {
      totalLogoPrice,
      printPerPiece: foundRange.print,
      emposedPerPiece: foundRange.emposed
    };



  };







  const calculateTotal = (quantity) => {
    const discount = getDiscountPerPiece(quantity);
    const discountedPrice = Math.max(0, (selectedGSM.price || 0) - discount);

    console.log("quantity * discountedPrice", quantity, discountedPrice);


    return {
      discountPerPiece: discount,
      discountedPrice: discountedPrice,
      grandtotal: quantity * discountedPrice
    };
  };

  const calculateDeliveryDate = (days) => {
    if (!days) return '';

    const today = new Date();
    let count = 0;
    const deliveryDate = new Date(today);

    while (count < days) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      // Skip weekends (optional)
      if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
        count++;
      }
    }

    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handlers
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handlePolyesterShow = () => setShowPolyesterModal(true);
  const handlePolyesterClose = () => setShowPolyesterModal(false);
  const handlePolyCottonShow = () => setShowPolyCottonModel(true);
  const handlePolyCottonClose = () => setShowPolyCottonModel(false);
  const handleCollareCottonShow = () => setShowCollareCottonColorModal(true);
  const handleCollareCottonClose = () => setShowCollareCottonColorModal(false);
  const handleCollarePolysterShow = () => setShowCollarePolysterColorModal(true);
  const handleCollarePolysterClose = () => setShowCollarePolysterColorModal(false);
  const handleCollarePolyCottonShow = () => setShowCollarePolyCottonColorModal(true);
  const handleCollarePolyCottonClose = () => setShowCollarePolyCottonColorModal(false);
  const handleLoginModalShow = () => setShowLogin(true);
  const handleLoginModalClose = () => setShowLogin(false);


  const calculateAndSetTotal = (updatedFormData) => {
    const quantity = parseInt(updatedFormData.quantity) || 0;
    const discountPerPiece = getDiscountPerPiece(quantity);
    const deliveryDays = getDeliveryDays(quantity);
    const estimatedDeliveryDate = calculateDeliveryDate(deliveryDays);


    const selectedPrice = updatedFormData.selectedGSM?.price || selectedGSM?.price || 0;
    const discountedPrice = Math.max(0, selectedPrice - discountPerPiece);
    const baseTotal = quantity * discountedPrice;

    const logos = updatedFormData.logos || [];
    const {
      totalLogoPrice,
      printPerPiece,
      emposedPerPiece
    } = getLogoPricePerPiece(quantity, logos);

    const logoTotal = quantity * totalLogoPrice;
    const totalwithoutlogo = baseTotal;
    const subtotal = baseTotal + logoTotal;
    const grandTotal = baseTotal + logoTotal;
    // const finalAmount = grandTotal + (grandTotal * 0.05);

    console.log("✅ Recalculated:");
    console.log("Base Total:", baseTotal);
    console.log("Logo Total:", logoTotal);
    console.log("Grand Total:", grandTotal);
   

    setFormData({
      ...updatedFormData,
      discountPerPiece,
      discountedPrice,
      deliveryDays,
      estimatedDeliveryDate,
      totalLogoPricePerPiece: totalLogoPrice,
      totalLogoPrice: logoTotal,
      printPerPiece,
      emposedPerPiece,
      baseTotal,
      subtotal,
      totalwithoutlogo,
      grandtotal: grandTotal,
      
    });
  };



  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setIsDirty(true);
    const quantity = parseInt(e.target.value) || 0;
    calculateAndSetTotal({ ...formData, quantity: quantity.toString() });
    if (value && value < 16) {
      setQuantityError("⚠️ Minimum order is 16");
    } else {
      setQuantityError("");
    }
  };


  console.log("formdata", formData);





  const handleGSMClick = (type, item) => {
    setIsDirty(true);
    setSelectedGSM(prev =>
      prev.id === item._id
        ? { id: "", name: "", price: 0, type: "" }
        : { id: item._id, name: item.name, price: item.price, type: type }
    );
  };



  // helper function outside handleChange
const calculateTotalquantity = (totalQuantity) => {
  return {
    totalQuantity,  // ✅ store total
  };
};

  const handleChange = (type, sizeLabel, value) => {
    const updated = {
      ...formData[type],
      [sizeLabel]: value || "",
    };

    const halftotal = Object.values(
      type === "halfSleeve" ? updated : formData.halfSleeve
    ).reduce((acc, val) => acc + (parseInt(val) || 0), 0);

    const fulltotal = Object.values(
      type === "fullSleeve" ? updated : formData.fullSleeve
    ).reduce((acc, val) => acc + (parseInt(val) || 0), 0);

    const totalQuantity = halftotal + fulltotal;
    const calculated = calculateTotalquantity(totalQuantity);

   // ✅ check if totalQuantity matches quantity
  
  if (formData.quantity && totalQuantity !== parseInt(formData.quantity)) {
    setSleeveError("Half & Full sleeve total must match required quantity above.");
  } else {
    setSleeveError("");
  }

    setFormData(prev => ({
      ...prev,
      [type]: updated,
      halftotal,
      fulltotal,
      // quantity: totalQuantity.toString(),
      ...calculated,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (parseInt(formData.quantity) < 16) {
      Swal.fire("Validation Error", "Minimum quantity must be 16", "warning");
      setIsSubmitting(false);
      return;
    }

    if (!selectedGSM.id) {
      Swal.fire("Validation Error", "Please select a material/GSM", "warning");
      setIsSubmitting(false);
      return;
    }

    // if (!formData.halftotal) {
    //  Swal.fire("Validation Error", "Please Fill Size Wise Quantity in Men and Women", "warning");
    //   setIsSubmitting(false);
    //   return;
    // }

    if (parseInt(formData.quantity) !== parseInt(formData.totalQuantity)) {
      Swal.fire("Validation Error", "Men and Women Quantity and total must be equal. Please check.", "warning");
      setIsSubmitting(false);
      return;
    }

    if (!formData.color) {
      Swal.fire("Validation Error", "Please Select Your T-Shirt Color", "warning");
      setIsSubmitting(false);
      return;
    }

    if (parseInt(formData.logoCount) > 0) {
      const incompleteLogos = formData.logos.some(logo =>
        !logo.file || !logo.position || !logo.type
      );
      if (incompleteLogos) {
        Swal.fire("Validation Error", "Please complete all logo details", "warning");
        setIsSubmitting(false);
        return;
      }
    }

    if (!formData.remark) {
      Swal.fire("Validation Error", "Please Fill Remark", "warning");
      setIsSubmitting(false);
      return;
    }





    const token = localStorage.getItem('authToken');
    if (!token) {
      Swal.fire("Authentication Required", "Please login to continue", "info");
      navigate('/profile');
      return;
    }

    const logoMetadata = formData.logos.map((logo) => ({
      position: logo.position,
      logotype: logo.type,
    }));

    const formDataObj = {
      customerId: localStorage.getItem('customerId'),
      quantityCount: formData.quantity,
      collarColor: formData.collarColor,
      hasCollarColor: formData.hasCollarColor,
      colorid: formData.id,
      grandTotal: formData.finalAmount,
      logoCount: formData.logoCount,
      color: formData.color,
      cloth: selectedGSM.name,
      clothMaterial: selectedGSM.type,
      totalCount: parseInt(formData.quantity),
      remark: formData.remark,
      basePrice: selectedGSM.price,
      discountPerPiece: formData.discountPerPiece,
      discountedPrice: formData.discountedPrice,
      amount: formData.grandtotal,
      totalAmount: formData.grandtotal,
      productId: productdetail?._id,
      deliveryDate: formData.estimatedDeliveryDate,
      logos: logoMetadata,
      quantitySizeWise: {
        half: formData.halfSleeve,
        full: formData.fullSleeve
      },
      quantitySleeveWise: {
        halfTotal: formData.halftotal,
        fullTotal: formData.fulltotal
      }
    };

    const payload = new FormData();
    Object.entries(formDataObj).forEach(([key, value]) => {
      if (typeof value === 'object') {
        payload.append(key, JSON.stringify(value));
      } else {
        payload.append(key, value);
      }
    });

    formData.logos.forEach((logo) => {
      if (logo.file) {
        payload.append('logoPhotos', logo.file);
      }
    });

    try {
      const response = await axios.post("https://gts.tsitcloud.com/api/cartItems/add", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // ✅ Force update immediately
      flushSync(() => setIsDirty(false));
      console.log("Form submitted successfully:", response.data);
      // await Swal.fire("Success", "Product added to cart successfully!", "success");
      
      navigate('/cart');
      // wait a tick so the cart page loads first
      setTimeout(() => {
      window.scrollTo(0, 0);
      }, 0); 

    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response?.status === 401) {
        await Swal.fire("Session Expired", "Please login to continue.", "error");
        localStorage.removeItem("authToken");
        handleLoginModalShow();
        // navigate("/profile");
      } else {
        Swal.fire("Error", error.response?.data?.message || "Something went wrong. Please try again.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


 //clear the color if user select different material
 useEffect(() => {
  // when material changes, reset selected color
  setFormData((prev) => ({
    ...prev,
    color: "", // reset color
  }));
}, [formData.clothMaterial]);


  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get(
          "https://gts.tsitcloud.com/api/products/single/products-by-category",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allProducts = response.data.flatMap((cat) => cat.products);
        setProductsData(allProducts);
        const foundProduct = allProducts.find((p) => p._id === id);

        if (foundProduct) {
          setProductdetail(foundProduct);
          setSelectedImage(
            `https://gts.tsitcloud.com/${foundProduct.images[0]}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch material options
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const cat_id = localStorage.getItem('categoryId');

    axios.get(`https://gts.tsitcloud.com/api/category/${cat_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const selectedCategory = response.data;
        if (selectedCategory) {
          const options = {
            Cotton: [],
            Polyester: [],
            Polycotton: []
          };

          selectedCategory.cloth_type.forEach((type) => {
            const typeName = type.name.toLowerCase().replace(/[-\s]/g, '');
            if (typeName.includes('cotton') && !typeName.includes('poly')) {
              options.Cotton = type.material;
            } else if (typeName === 'polyester') {
              options.Polyester = type.material;
            } else if (typeName.includes('poly') && typeName.includes('cotton')) {
              options.Polycotton = type.material;
            }
          });

          setMaterialOptions(options);
        }
      })
      .catch(console.error);
  }, []);


  //check the page reloade or navigate to other page
  useNavigationGuard(isDirty, "⚠️ Your entered data will be lost. Do you want to leave?");

  // Update form data when GSM is selected
  useEffect(() => {
    if (selectedGSM.id) {
      const calculated = calculateTotal(parseInt(formData.quantity) || 0);
      setFormData(prev => ({
        ...prev,
        cloth: selectedGSM.name,
        clothMaterial: selectedGSM.type,
        basePrice: selectedGSM.price,
        ...calculated
      }));
    }
  }, [selectedGSM]);

  if (!productdetail) return <p>Loading...</p>;

  return (
    <>





      {productdetail?.category?._id === "680f271543a9574da31d61be" ? (
        <Caps></Caps>
      ) : productdetail?.category?._id === "680f271c43a9574da31d61c1" ? (

        <Jerseys></Jerseys>
      ) : (
        <div className="container-fluid ">
          <form onSubmit={handleSubmit}>
            <div className="container">
            <div className="row d-flex justify-content-center mt-4 mb-lg-5 mb-2">
              {/* changes made */}
              <div className="col-md-8"> 
                <div className="card mb-4">
                  <div className="card-header bg-primary text-white">
                    <h4>{productdetail?.category?.name} Customization</h4>
                  </div>

                  {/* Quantity Input */}
                  <div className="card-body">
                    <div className="row mb-4 d-flex justify-content-center">
                      <div className="col-lg-6">
                        <label className="form-label fw-bold" style={{ color: '#0d6efd' }}>Enter Quantity Required</label>
                        <input
                          type="number"
                          min="16"
                          name="quantity"
                          value={formData.quantity}
                          required
                          placeholder="Minimum 16"
                          onChange={handleQuantityChange}
                          className={`form-control ${quantityError ? "is-invalid" : ""}`} // bootstrap red border
                          onWheel={(e) => e.currentTarget.blur()}
                        />
                        {/* <small className="text-muted">Minimum order quantity: 16</small> */}
                        {quantityError && (
        <div className="invalid-feedback">{quantityError}</div>
      )}
                      </div>

                    </div>

                    {/* Material Selection */}
                    <div className="row mb-4">
                      <h5 className="mb-3" style={{ color: '#0d6efd' }}>Select Material</h5>

                      <div className="col-lg-4">
                        <div className="card">
                          <div className="card-header bg-success text-white">
                            <h6>Cotton</h6>
                          </div>
                          <div className="card-body p-0">
                            <table className="table table-bordered mb-0">
                              <thead>
                                <tr>
                                  <th>Select</th>
                                  <th>GSM</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {materialOptions.Cotton.map((item) => (
                                  <tr key={item._id} className={selectedGSM.id === item._id ? 'table-active' : ''}>
                                    <td>
                                      <input
                                        type="radio"
                                        name="material"
                                        checked={selectedGSM.id === item._id}
                                        onChange={() => handleGSMClick("Cotton", item)}
                                      />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                      {formData.discountPerPiece ? (
                                        <>
                                          <del className="text-muted me-2">₹{item.price}</del>
                                          ₹{item.price - formData.discountPerPiece}
                                        </>
                                      ) : (
                                        <>₹{item.price}</>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 mt-lg-0 mt-3">
                        <div className="card">
                          <div className="card-header bg-info text-white">
                            <h6>Polyester</h6>
                          </div>
                          <div className="card-body p-0">
                            <table className="table table-bordered mb-0">
                              <thead>
                                <tr>
                                  <th>Select</th>
                                  <th>GSM</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {materialOptions.Polyester.map((item) => (
                                  <tr key={item._id} className={selectedGSM.id === item._id ? 'table-active' : ''}>
                                    <td>
                                      <input
                                        type="radio"
                                        name="material"
                                        checked={selectedGSM.id === item._id}
                                        onChange={() => handleGSMClick("Polyester", item)}
                                      />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                      {formData.discountPerPiece ? (
                                        <>
                                          <del className="text-muted me-2">₹{item.price}</del>
                                          ₹{item.price - formData.discountPerPiece}
                                        </>
                                      ) : (
                                        <>₹{item.price}</>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 mt-lg-0 mt-3">
                        <div className="card">
                          <div className="card-header bg-warning text-dark">
                            <h6>Polycotton</h6>
                          </div>
                          <div className="card-body p-0">
                            <table className="table table-bordered mb-0">
                              <thead>
                                <tr>
                                  <th>Select</th>
                                  <th>GSM</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {materialOptions.Polycotton.map((item) => (
                                  <tr key={item._id} className={selectedGSM.id === item._id ? 'table-active' : ''}>
                                    <td>
                                      <input
                                        type="radio"
                                        name="material"
                                        checked={selectedGSM.id === item._id}
                                        onChange={() => handleGSMClick("Polycotton", item)}
                                      />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                      {formData.discountPerPiece ? (
                                        <>
                                          <del className="text-muted me-2">₹{item.price}</del>
                                          ₹{item.price - formData.discountPerPiece}
                                        </>
                                      ) : (
                                        <>₹{item.price}</>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Color Selection */}
                    <div className="row mb-4 d-flex align-items-center justify-content-start">
                      {formData.clothMaterial === "Cotton" && (
                        <div className="col-md-6 d-flex justify-content-start">
                          <button
                            type="button"
                            className="btn fw-bold text-white"
  style={{
    backgroundColor: "#0d6efd",
    borderRadius: "30px",
    
   
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#084298"}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d6efd"}
                            onClick={handleShow}
                          >
                            Choose T-Shirt Color
                          </button>
                        </div>
                      )}

                      {formData.clothMaterial === "Polyester" && (
                        <div className="col-md-6 d-flex justify-content-start">
                          <button
                            type="button"
                            className="btn fw-bold text-white"
  style={{
    backgroundColor: "#0d6efd",
    borderRadius: "30px",
    
    
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#084298"}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d6efd"}
                            onClick={handlePolyesterShow}
                          >
                            Choose T-Shirt Color
                          </button>
                        </div>
                      )}
                      {formData.clothMaterial === "Polycotton" && (
                        <div className="col-md-6 d-flex justify-content-start">
                          <button
                            type="button"
                            className="btn fw-bold text-white"
  style={{
    backgroundColor: "#0d6efd",
    borderRadius: "30px",
    
    
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#084298"}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d6efd"}
                            onClick={handlePolyCottonShow}
                          >
                            Choose T-Shirt Color
                          </button>
                        </div>
                      )}
                      {productdetail?.collarColor === true && formData.clothMaterial === "Cotton" && (
                        <div className="col-md-6 d-flex justify-content-start">
                          <button
                            type="button"
                            className="btn fw-bold text-white"
  style={{
    backgroundColor: "#0d6efd",
    borderRadius: "30px",
    
   
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#084298"}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d6efd"}
                            onClick={handleCollareCottonShow}
                          >
                            Choose collar Color
                          </button>
                        </div>
                      )}
                      {productdetail?.collarColor === true && formData.clothMaterial === "Polyester" && (
                        <div className="col-md-6 d-flex justify-content-start">
                          <button
                            type="button"
                            className="btn fw-bold text-white"
  style={{
    backgroundColor: "#0d6efd",
    borderRadius: "30px",
    
    
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#084298"}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d6efd"}
                            onClick={handleCollarePolysterShow}
                          >
                            Choose collar Color
                          </button>
                        </div>
                      )}
                      {productdetail?.collarColor === true && formData.clothMaterial === "Polycotton" && (
                        <div className="col-md-6 d-flex justify-content-start">
                          <button
                            type="button"
                            className="btn fw-bold text-white"
  style={{
    backgroundColor: "#0d6efd",
    borderRadius: "30px",
    
   
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#084298"}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d6efd"}
                            onClick={handleCollarePolyCottonShow}
                          >
                            Choose collar Color
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="row mb-4 d-flex align-items-center justify-content-start">
                      <div className="col-md-6 d-flex justify-content-start">
                        {formData.color && formData.color.trim() !== "" && (
  <div className="text-center d-flex flex-column justify-content-center align-items-center mb-4">
    <label className="form-label fw-bold" style={{ color: '#0d6efd' }}>
      Selected Color:
    </label>
    <div
      className="form-control"
      style={{
        backgroundColor: formData.color,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        width: "150px",
      }}
    >
      {formData.color}
    </div>
  </div>
)}
                      </div>
                    </div>
                    



                    {/* Logo Selection */}
                    <div className="row mb-4 justify-content-start align-items-center">
                      <div className="col-md-6 d-flex flex-column align-items-start">
                        <label className="form-label fw-bold" style={{ color: '#0d6efd' }}>How many logos?</label>
                        <input
                          type="number"
                          min="0"
                          name="logoCount"
                          value={formData.logoCount}
                          placeholder="Enter number of logos"
                          onChange={(e) => {
                            setIsDirty(true);
                            const rawValue = e.target.value;
                            // If user clears input → keep empty string
    if (rawValue === "") {
      setFormData({ ...formData, logoCount: "", logos: [] });
      return;
    }
                            const count = parseInt(e.target.value) || 0;
                            const newLogos = [...Array(count)].map((_, index) => {
                              return formData.logos[index] || { file: null, position: "", type: "" };
                            });
                            setFormData({ ...formData, logoCount: count, logos: newLogos });
                          }}
                          className="form-control w-75"
                          onWheel={(e) => e.currentTarget.blur()}
                        />
                      </div>
                    </div>

                    {/* Logo Details */}
                    {parseInt(formData.logoCount) > 0 && (
                      <div className="card mb-4">
                        <div className="card-header bg-secondary text-white">
                          <h6>Logo Details</h6>
                        </div>
                        <div className="card-body">
                          {formData.logos.map((logo, index) => (
                            <div key={index} className="row mb-3">
                              <div className="col-lg-4">
                                <label className="form-label">Upload Logo {index + 1}</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  required
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    const newLogos = [...formData.logos];
                                    newLogos[index] = {
                                      ...newLogos[index],
                                      file,
                                      preview: URL.createObjectURL(file)
                                    };
                                    setFormData({ ...formData, logos: newLogos });
                                  }}
                                  className="form-control"
                                />
                                {logo.preview && (
                                  <img
                                    src={logo.preview}
                                    alt={`Logo ${index + 1} preview`}
                                    className="img-thumbnail mt-2"
                                    style={{ maxWidth: '100px' }}
                                  />
                                )}
                              </div>
                              <div className="col-lg-4 mt-lg-0 mt-3">
                                <label className="form-label">Position</label>
                                <select
                                  value={logo.position}
                                  required
                                  onChange={(e) => {
                                    const newLogos = [...formData.logos];
                                    newLogos[index].position = e.target.value;
                                    setFormData({ ...formData, logos: newLogos });
                                  }}
                                  className="form-select"
                                >
                                  <option value="">Select position</option>
                                  <option value="left chest">Left Chest</option>
                                  <option value="right chest">Right Chest</option>
                                  <option value="left sleeve">Left Sleeve</option>
                                  <option value="right sleeve">Right Sleeve</option>
                                  <option value="front center">Front Center</option>
                                  <option value="back top">Back Top</option>
                                  <option value="back center">Back center</option>
                                  <option value="on pocket">On Pocket</option>
                                </select>
                              </div>
                              <div className="col-lg-4 mt-lg-0 mt-3">
                                <label className="form-label">Logo Type</label>
                                <table className="table table-sm">
                                  <tbody>
                                    {logoOptions.map((option) => (
                                      <tr key={option.label}>
                                        <td>
                                          <input
                                            type="radio"
                                            name={`logoType-${index}`}
                                            checked={logo.type === option.label}
                                            onChange={() => {
                                              const newLogos = [...formData.logos];
                                              newLogos[index].type = option.label;
                                              setFormData({ ...formData, logos: newLogos });
                                              calculateAndSetTotal({ ...formData, logos: newLogos });
                                            }}

                                          />
                                        </td>
                                        <td>{option.label}</td>
                                        <td>
                                          {formData.quantity ? (
                                            option.label === 'Printed' ? (
                                              <>
                                                <del className="text-muted me-1">₹{option.price}</del>
                                                ₹{getLogoPriceFromRange('Printed')}
                                              </>
                                            ) : (
                                              <>
                                                <del className="text-muted me-1">₹{option.price}</del>
                                                ₹{getLogoPriceFromRange('Embroidered')}
                                              </>
                                            )
                                          ) : (
                                            <>₹{option.price}</>
                                          )}
                                        </td>

                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Size-wise Quantity */}
                    <div className="card mb-4">
                      <div className="card-header bg-dark text-white">
                        <h6>Size-wise Quantity</h6>
                      </div>
                      <div className="card-body p-0">
                        <table className="table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th>Size</th>
                              <th>Chest (inches)</th>
                              <th>Men</th>
                              <th>Women</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizes.map((size) => (
                              <tr key={size.label}>
                                <td>{size.label.toUpperCase()}</td>
                                <td>{size.chest}</td>
                                <td>
                                  <input
                                    type="number"
                                    // min="0"
                                    className="form-control form-control-sm"
                                    value={formData.halfSleeve[size.label] ?? ""}
                                    onChange={(e) =>{
                                      setIsDirty(true);
                                      const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
                                      handleChange("halfSleeve", size.label, e.target.value)
                                    }}
                                    onWheel={(e) => e.currentTarget.blur()}
                                  />
                                </td>
                                <td>
                              <input
                                type="number"
                                // min="0"
                                className="form-control form-control-sm"
                                value={formData.fullSleeve[size.label]}
                                onChange={(e) =>{
                                  setIsDirty(true);
                                  handleChange("fullSleeve", size.label, e.target.value)
                                }}
                                onWheel={(e) => e.currentTarget.blur()}
                              />
                            </td>
                              </tr>
                            ))}
                            <tr className="table-active">
                              <td colSpan="2">Total</td>
                              <td>{formData.halftotal}</td>
                              <td>{formData.fulltotal}</td>
                            </tr>
                            <tr className="table-secondary">
                              <td colSpan="2">Overall Total</td>
                              <td colSpan="2">{formData.totalQuantity}</td>
                            </tr>
                          </tbody>
                        </table>
                        {sleeveError && (
    <div className="invalid-feedback d-block">{sleeveError}</div>
  )}
                      </div>
                    </div>
                    {quantityError && (
    <div className="invalid-feedback">{quantityError}</div>
  )}

                    {/* Remarks */}
                    <div className="mb-4">
                      <label className="form-label fw-bold" style={{ color: '#0d6efd' }}>Customization Remarks</label>
                      <textarea
                        rows={3}
                        className="form-control"
                        value={formData.remark}
                        onChange={(e) => {
                          setIsDirty(true);
                          setFormData({ ...formData, remark: e.target.value });
                        }}
                        placeholder="Enter any additional customization requirements"
                      />
                    </div>


                    

                    
                    





                  </div>
                </div>
              </div>
              <div className="col-md-4">
  <div className="sticky-col">
    <div className="card mb-4">
      <div className="card-header bg-success text-white">
        <h6>Price Summary</h6>
      </div>

      <div className="card-body d-flex justify-content-center">
        <div className="row w-100 g-3 mb-4">
          <div className="col-12">
            {/* ✅ Responsive Table */}
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th></th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>T-Shirt</td>
                    <td>{formData.quantity || 0}</td>
                    <td>{formData.discountedPrice ? `₹${formData.discountedPrice}` : '₹0.00'}</td>
                    <td>
                      {formData.grandtotal
                        ? `₹${formData.quantity * formData.discountedPrice}`
                        : '₹0.00'}
                    </td>
                  </tr>
                  <tr>
                    <td>Logo</td>
                    <td>{formData.quantity || 0}</td>
                    <td>
                      {formData.totalLogoPricePerPiece
                        ? `₹${formData.totalLogoPricePerPiece}`
                        : '₹0.00'}
                    </td>
                    <td>
                      {formData.totalLogoPricePerPiece
                        ? `₹${formData.totalLogoPrice}`
                        : '₹0.00'}
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td colSpan={3}>
                      {formData.quantity && formData.discountedPrice
                        ? `₹${
                            formData.quantity * formData.discountedPrice +
                            (formData.totalLogoPrice || 0)
                          }`
                        : '₹0.00'}
                    </td>
                  </tr>
                  <tr>
                    <td>GST (5%)</td>
                    <td colSpan={3}>
                      ₹{(
                        ((formData.quantity * formData.discountedPrice) +
                          (formData.totalLogoPrice || 0)) *
                        0.05
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>Grand Total</td>
                    <td colSpan={3}>
                      ₹{(
                        ((formData.quantity * formData.discountedPrice) +
                          (formData.totalLogoPrice || 0)) *
                          1.05
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* ✅ End Responsive Table */}
          </div>
        </div>
      </div>
    </div>

    {/* Buttons */}
    <div className="d-grid gap-2">
      {localStorage.getItem("authToken") ? (
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={isSubmitting || !selectedGSM.id}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Adding to Cart...
            </>
          ) : (
            <>
              <FaShoppingCart className="me-2" />
              Add to Cart
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary btn-lg"
          disabled={!selectedGSM.id}
          onClick={handleLoginModalShow}
        >
          Add to Cart
        </button>
      )}
    </div>
  </div>
</div>

            </div>
            </div>
          </form>
          

          <LoginModal show={showLogin} handleClose={handleLoginModalClose} />
          <Ratemodal show={showModal} handleClose={handleClose} formData={formData} setFormData={setFormData} />
          <PolysterColorModal
            show={showPolyesterModal}
            handleClose={handlePolyesterClose}
            formData={formData}
            setFormData={setFormData}
          />
          <PolyCottonColorModal
            show={showPolCottonModel}
            handleClose={handlePolyCottonClose}
            formData={formData}
            setFormData={setFormData}
          />
          <CollareCottonColorModal
            show={showCollareCottonColorModal}
            handleClose={handleCollareCottonClose}
            formData={formData}
            setFormData={setFormData}
          />
          <CollarePolysterColorModal
            show={showCollarePolysterColorModal}
            handleClose={handleCollarePolysterClose}
            formData={formData}
            setFormData={setFormData}
          />
          <CollarePolyCottonColorModal
            show={showCollarePolyCottonColorModal}
            handleClose={handleCollarePolyCottonClose}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      )}

    </>
  );
};

export default Collaretshirt;