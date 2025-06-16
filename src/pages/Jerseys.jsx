import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from 'react-icons/fa';
import Ratemodal from './Ratemodal';

const Jerseys = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  { min: 1, max: 10, print:50, emposed:150 },
  { min: 11, max: 20, print:45, emposed:100 },
  { min: 21, max: 30, print:40, emposed:80 },
  { min: 31, max: 40, print:35, emposed:75 },
  { min: 41, max: 50, print:33, emposed:70 },
  { min: 51, max: 60, print:31, emposed:65 },
  { min: 61, max: 70, print:29, emposed:60 },
  { min: 71, max: 80, print:27, emposed:55 },
  { min: 81, max: 90, print:25, emposed:50 },
  { min: 91, max: 100, print:25, emposed:50 },
  { min: 101, max: 200, print:23, emposed:45 },
  { min: 201, max: 300, print:21, emposed:40 },
  { min: 301, max: 400, print:19, emposed:35 },
  { min: 401, max: 500, print:17, emposed:33 },
  { min: 501, max: 600, print:15, emposed:31 },
  { min: 601, max: 700, print:14, emposed:29 },
  { min: 701, max: 800, print:12, emposed:27 },
  { min: 801, max: 900, print:11, emposed:25 },
  { min: 901, max: 1000, print:10, emposed:25 },
  { min: 1001, max: 2000, print:9, emposed:24 },
  { min: 2001, max: 3000, print:9, emposed:23 },
  { min: 3001, max: 4000, print:9, emposed:22 },
  { min: 4001, max: 5000, print:9, emposed:21 },
  { min: 5001, max: 6000, print:8, emposed:20 },
  { min: 6001, max: 7000, print:8, emposed:20 },
  { min: 7001, max: 8000, print:8, emposed:20 },
  { min: 8001, max: 9000, print:8, emposed:20 },
  { min: 9001, max: 10000, print:8, emposed:20 },
  { min: 10001, max: 20000, print:7, emposed:19 },
  { min: 20001, max: 30000, print:7, emposed:18 },
  { min: 30001, max: 40000, print:7, emposed:17 },
  { min: 40001, max: 50000, print:7, emposed:16 },
  { min: 50001, max: 60000, print:6, emposed:15 },
  { min: 60001, max: 70000, print:6, emposed:15 },
  { min: 70001, max: 80000, print:6, emposed:15 },
  { min: 80001, max: 90000, print:6, emposed:15 },
  { min: 90001, max: 100000, print:6, emposed:15 }
];

  const logoOptions = [
    { label: 'Printed', price: 25 },
    { label: 'Embroidered', price: 50 }
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
    acc[size.label] = "0";
    return acc;
  }, {});

  // State management
  const [productdetail, setProductdetail] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedGSM, setSelectedGSM] = useState({ id: "", name: "", price: 0, type: "" });
  const [materialOptions, setMaterialOptions] = useState({
  Collar: [],
  RoundNeck: [],
  VNeck: []
});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    quantity: '',
    logoCount: '0',
    logos: [],
    color: '#C91D1D',
    collarColor: '#C91D1D',
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
    clothMaterial: '',
    discountPerPiece: 0,
    discountedPrice: 0,
    basePrice: 0,
    deliveryDays: 0,
    estimatedDeliveryDate: ''
  });




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

const getLogoPricePerPiece = (quantity) => {
  const foundRange = logoPriceRanges.find(
    range => quantity >= range.min && quantity <= range.max
  );
  return foundRange
    ? { print: foundRange.print, emposed: foundRange.emposed }
    : { print: 0, emposed: 0 };
};


  const calculateTotal = (quantity) => {
    const discount = getDiscountPerPiece(quantity);
    const discountedPrice = Math.max(0, (selectedGSM.price || 0) - discount);

    console.log("quantity * discountedPrice" , quantity  , discountedPrice);
    

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

 const handleQuantityChange = (e) => {
  const quantity = parseInt(e.target.value) || 0;
  const discountPerPiece = getDiscountPerPiece(quantity);
   const logoPrices = getLogoPricePerPiece(quantity);
  const deliveryDays = getDeliveryDays(quantity);
  const estimatedDeliveryDate = calculateDeliveryDate(deliveryDays);

  console.log('discountprice',discountPerPiece);
  console.log('discountforlog',logoPrices)
  
  setFormData(prev => ({
    ...prev,
    quantity: quantity.toString(),
    discountPerPiece,
    
    discountedPrice: Math.max(0, (selectedGSM.price || 0) - discountPerPiece),
    deliveryDays,
    estimatedDeliveryDate,
    grandtotal: (quantity * Math.max(0, (selectedGSM.price || 0) - discountPerPiece)).toString()
  }));
  
};

console.log("formdata" , formData);





  const handleGSMClick = (type, item) => {
    setSelectedGSM(prev =>
      prev.id === item._id
        ? { id: "", name: "", price: 0, type: "" }
        : { id: item._id, name: item.name, price: item.price, type: type }
    );
  };

  const handleChange = (type, sizeLabel, value) => {
    const updated = {
      ...formData[type],
      [sizeLabel]: value || "0",
    };

    const halftotal = Object.values(
      type === "halfSleeve" ? updated : formData.halfSleeve
    ).reduce((acc, val) => acc + (parseInt(val) || 0), 0);

    const fulltotal = Object.values(
      type === "fullSleeve" ? updated : formData.fullSleeve
    ).reduce((acc, val) => acc + (parseInt(val) || 0), 0);

    const totalQuantity = halftotal + fulltotal;
    const calculated = calculateTotal(totalQuantity);

    setFormData(prev => ({
      ...prev,
      [type]: updated,
      halftotal,
      fulltotal,
      quantity: totalQuantity.toString(),
      ...calculated
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (parseInt(formData.quantity) < 16) {
      alert("Minimum quantity must be 16");
      setIsSubmitting(false);
      return;
    }

    if (!selectedGSM.id) {
      alert("Please select a material/GSM");
      setIsSubmitting(false);
      return;
    }

    if (parseInt(formData.logoCount) > 0) {
      const incompleteLogos = formData.logos.some(logo => 
        !logo.file || !logo.position || !logo.type
      );
      if (incompleteLogos) {
        alert("Please complete all logo details");
        setIsSubmitting(false);
        return;
      }
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please login to continue');
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

      console.log("Form submitted successfully:", response.data);
      alert("Product added to cart successfully!");
      navigate('/cart');
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login to continue.");
        localStorage.removeItem("authToken");
        navigate("/profile");
      } else {
        alert(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    const selectedCategory = response.data;
    
    if (selectedCategory) {
      const options = {
        Collar: [],
        RoundNeck: [],
        VNeck: []
      };

      selectedCategory.cloth_type.forEach((type) => {
        const name = type.name.toLowerCase().replace(/\s/g, '');

        if (name === 'collar') {
          options.Collar = type.material;
        } else if (name === 'roundneck') {
          options.RoundNeck = type.material;
        } else if (name === 'vneck') {
          options.VNeck = type.material;
        }
      });

      setMaterialOptions(options);
      console.log('Material Options:', options);
    }
  })
  .catch((error) => {
    console.error('Error fetching category:', error);
  });
}, []);


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
    {productdetail && productdetail.category &&
    productdetail.category._id ==="680f271c43a9574da31d61c1" &&(
      <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h4>Jerseys Customization</h4>
              </div>
              
              {/* Quantity Input */}
              <div className="card-body">
                <div className="row mb-4">
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
                  <div className="col-lg-6">
                    <button 
                      type="button" 
                      className="btn btn-link p-0"
                      onClick={handleShow}
                    >
                      View discount pricing table
                    </button>
                  </div>
                </div>

                {/* Material Selection */}
                <div className="row mb-4">
                  <h5 className="mb-3">Select Material</h5>
                  
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="card-header bg-success text-white">
                        <h6>Collar</h6>
                      </div>
                      <div className="card-body p-0">
                        <table className="table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th>Select</th>
                              <th>Name</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {materialOptions.Collar.map((item) => (
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
                                <td>₹{item.price - (formData.discountPerPiece || 0)}</td>
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
                        <h6>Round Neck</h6>
                      </div>
                      <div className="card-body p-0">
                        <table className="table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th>Select</th>
                              <th>Name</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {materialOptions.RoundNeck.map((item) => (
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
                                <td>₹{item.price - (formData.discountPerPiece || 0)}</td>
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
                        <h6>V neck</h6>
                      </div>
                      <div className="card-body p-0">
                        <table className="table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th>Select</th>
                              <th>Name</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {materialOptions.VNeck.map((item) => (
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
                                <td>₹{item.price - (formData.discountPerPiece || 0)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Selection */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Choose color:</label>
                    <div className="d-flex align-items-center justify-content-center">
                      <input
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={(e) =>
                          setFormData({ ...formData, [e.target.name]: e.target.value })
                        }
                        className="form-control form-control-color me-2"
                      />
                      <span>{formData.color}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Choose collar color:</label>
                    <div className="d-flex align-items-center justify-content-center">
                      <input
                        type="color"
                        name="collarColor"
                        value={formData.collarColor}
                        onChange={(e) =>
                          setFormData({ ...formData, [e.target.name]: e.target.value })
                        }
                        className="form-control form-control-color me-2"
                      />
                      <span>{formData.collarColor}</span>
                    </div>
                  </div>
                </div>

                {/* Logo Selection */}
                <div className="row mb-4 d-flex align-items-center justify-content-center">
                  <div className="col-md-6">
                    <label className="form-label">How many logos?</label>
                    <input
                      type="number"
                      min="0"
                      name="logoCount"
                      value={formData.logoCount}
                      placeholder="Enter number of logos"
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        const newLogos = [...Array(count)].map((_, index) => {
                          return formData.logos[index] || { file: null, position: "", type: "" };
                        });
                        setFormData({ ...formData, logoCount: count, logos: newLogos });
                      }}
                      className="form-control"
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
                              <option value="front">Front</option>
                              <option value="back">Back</option>
                              <option value="sleeve">Sleeve</option>
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
                                        }}
                                      />
                                    </td>
                                    <td>{option.label}</td>
                                    <td>₹{option.price}</td>
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
                          <th>Half Sleeve</th>
                          {/* <th>Full Sleeve</th> */}
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
                                min="0"
                                className="form-control form-control-sm"
                                value={formData.halfSleeve[size.label]}
                                onChange={(e) =>
                                  handleChange("halfSleeve", size.label, e.target.value)
                                }
                              />
                            </td>
                            {/* <td>
                              <input
                                type="number"
                                min="0"
                                className="form-control form-control-sm"
                                value={formData.fullSleeve[size.label]}
                                onChange={(e) =>
                                  handleChange("fullSleeve", size.label, e.target.value)
                                }
                              />
                            </td> */}
                          </tr>
                        ))}
                        <tr className="table-active">
                          <td colSpan="2">Total</td>
                          <td>{formData.halftotal}</td>
                          {/* <td>{formData.fulltotal}</td> */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Remarks */}
                <div className="mb-4">
                  <label className="form-label">Customization Remarks</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={formData.remark}
                    onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                    placeholder="Enter any additional customization requirements"
                  />
                </div>

                {/* Price Summary */}
                <div className="card mb-4">
                  <div className="card-header bg-success text-white">
                    <h6>Price Summary</h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <p>Base Price: ₹{selectedGSM.price || 0}</p>
                        <p>Discount per piece: ₹{formData.discountPerPiece}</p>
                        <p>Discounted Price: ₹{formData.discountedPrice}</p>
                      </div>
                      <div className="col-lg-4">
                        <p>Total Quantity: {formData.quantity || 0}</p>
                        <p>Logo Charges: ₹{(parseInt(formData.logoCount) || 0) * 
                          (formData.logos[0]?.type === 'Embroidered' ? 50 : 25)}</p>
                      </div>
                      <div className="col-lg-4">
                        <h5>Grand Total: ₹{formData.grandtotal}</h5>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting || !selectedGSM.id}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding to Cart...
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="me-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Ratemodal show={showModal} handleClose={handleClose} discountTable={quantityDiscounts} />
    </div>
    )}
    
    </>
  );
};

export default Jerseys;