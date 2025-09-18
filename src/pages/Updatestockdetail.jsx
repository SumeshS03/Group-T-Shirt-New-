import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeHeader from "../Layout/HomeHeader";
import shopimage from "../images/shopimage.png";
import { useNavigate } from "react-router-dom";
import "./Productdetail.css";
import "react-multi-carousel/lib/styles.css";
import "./Stockdetail.css";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "../Layout/Footer";
import Swal from "sweetalert2";

const Updatestockdetail = () => {
    const baseurl = process.env.REACT_APP_API_BASE_URL;
      const { id } = useParams();
      const [productdetail, setProductdetail] = useState(null);
      const [productsData, setProductsData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [selectedImage, setSelectedImage] = useState(null);
      const [hoveredImage, setHoveredImage] = useState(null);
      const [activeTab, setActiveTab] = useState("");
    
      const navigate = useNavigate();
      const [error, setError] = useState("");
    
      const [formData, setFormData] = useState({
      logoCount: 0,
      logos: [],
      selectedSize: "",
      enteredQty: "",
    });
    const { logoCount, logos, selectedSize, enteredQty } = formData;

const [sizeWiseQty, setSizeWiseQty] = useState(
  productdetail?.quantityBySize
    ? Object.fromEntries(Object.keys(productdetail.quantityBySize).map(size => [size, 0]))
    : {}
);

  

  const logoOptions = [
    { label: "Printed", price: 50 },
    { label: "Embroidered", price: 150 },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Current ID:", id);
      const token = localStorage.getItem("authToken");
      const customerId = localStorage.getItem("customerId");

      try {
        const response = await axios.post(
          `${baseurl}stockCart/getByCustomer`,{customerId},
          { headers: { Authorization: `Bearer ${token}` } }
        );

          console.log("response data", response.data.data);

  // API already returns array of stock items
  const allStocks = response.data.data || [];

  console.log("allStocks", allStocks);

  // Find specific product by id
  const foundStock = allStocks.find((p) => p._id === id);
  console.log("foundStock", foundStock);


  

  if (foundStock) {
    setProductdetail(foundStock);

     // ✅ Pre-fill form with existing data
  setFormData({
    logos: foundStock.logos.map((logo) => ({
      position: logo.position || "",
      type: logo.logotype || "",
      file: null, // existing photo won't be a File
      preview: logo.photo
        ? `https://gts.tsitcloud.com/${logo.photo}`
        : "",
    })),
    sizeWiseQty: { ...foundStock.sizeWiseQty },
    quantity: foundStock.quantity || 0,
    price: foundStock.price || 0,
    totalAmount: foundStock.totalAmount || 0,
    logoCount: foundStock.logos?.length || 0,   // ✅ FIXED
  });
    

    // Safely set selected image
    if (foundStock.stockId.images && foundStock.stockId.images.length > 0) {
      setSelectedImage(`https://gts.tsitcloud.com/${foundStock.stockId.images[0]}`);
    }

    // Store categoryId if needed
    if (foundStock.categoryId) {
      localStorage.setItem("categoryId", foundStock.categoryId);
    }
  }

  setProductsData(foundStock);
  setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, baseurl]);



  if (isLoading) {
    return <div>Loading...</div>;
  }




const handleSubmit = async (e) => {
  e.preventDefault();

  const cusid = localStorage.getItem("customerId");
  if (!cusid) {
    Swal.fire("Login and continue");
    navigate("/profile");
    return;
  }

  // 🔑 Use formData.sizeWiseQty instead
  const cleanedSizeWiseQty = Object.fromEntries(
    Object.entries(formData.sizeWiseQty).map(([size, val]) => [
      size,
      val === "" ? 0 : Number(val),
    ])
  );

  const totalQty = Object.values(cleanedSizeWiseQty).reduce(
    (a, b) => a + b,
    0
  );

 // Build logo metadata array
const logoMetadata = (formData.logos || []).map((logo) => {
  let photo = logo.photo || null;

  // If only preview exists, extract relative path
  if (!photo && logo.preview) {
    const match = logo.preview.match(/(\/uploads\/.*)$/);
    if (match) photo = match[1]; // e.g. "/uploads/abc.png"
  }

  // If a new file is selected, backend will replace photo
  if (logo.file) photo = null;

  return {
    _id: logo._id || undefined,  // include _id if updating an existing logo
    position: logo.position || "",
    logotype: logo.type || "",
    photo,
  };
});

const formDataObj = {
  customerId: cusid,
  stockId: productdetail.stockId._id,
  quantity: totalQty,
  sizeWiseQty: cleanedSizeWiseQty,
  sleeveType: productdetail.stockId.sleeveType,
  price: Number(productdetail.stockId.Price),
  totalAmount: Number(productdetail.stockId.Price) * totalQty,
  logos: logoMetadata, // ✅ use processed metadata
};

// Build payload
const payload = new FormData();

Object.entries(formDataObj).forEach(([key, value]) => {
  if (key === "logos") {
    // send metadata as JSON string
    payload.append("logos", JSON.stringify(value));
  } else if (value !== null && typeof value === "object") {
    payload.append(key, JSON.stringify(value));
  } else if (typeof value !== "undefined") {
    payload.append(key, value);
  }
});

// Append actual files (new uploads only)
(formData.logos || []).forEach((logo) => {
  if (logo.file) {
    payload.append("logoPhotos", logo.file); // backend should match with order/index
  }
});

  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.put(
      `${baseurl}stockCart/update/${productdetail._id}`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Order submitted successfully:", response.data);
    Swal.fire("Added to Ready stock cart");
    navigate("/cart", { state: { openTab: "ready" } });
  } catch (error) {
    console.error("Error while submitting order:", error.response || error);
    Swal.fire(
      error.response?.data?.message || "Error while submitting order"
    );
  }
};

  return (
    <>
    <div>
        <HomeHeader />
      </div>

      <div className="about-box d-flex  h-50 flex-column align-items-center ">
        <div className="first-background p-5  mb-4 d-flex text-white ">
          <h1 className="mt-4 aboutustext">ABOUT US</h1>
        </div>
        <p
          className=" w-50 home-contactustext "
          style={{ textAlign: "start", marginLeft: "-23%" }}
        >
          Home - About Us
        </p>
        <img src={shopimage} className="imagetopone" alt="Shop" />
      </div>

      <div className="choose-category  ">
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
          <div className="row w-75 gap-2 pb-5">
            <div
              className={`col-lg-3 col-12 product-page ${
                activeTab === "product" ? "active-tab" : ""
              }`}
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
                activeTab === "stock" || "/foundProduct/:id" ? "active-tab" : ""
              }`}
              onClick={() => navigate("/stock")}
            >
              <h2 className="h4 heading-text-product">Stock Page</h2>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-5">
      <div className="container mt-5">
        <div className="row g-4">
          {/* ---------- Left: Product Images ---------- */}
          <div className="col-lg-5 col-12">
            {productdetail && (
              <>
                {/* Main Image */}
                <div className="p-2 position-relative border rounded shadow-sm">
                  <img
                    src={
                      hoveredImage ||
                      selectedImage ||
                      `https://gts.tsitcloud.com/${productdetail.stockId.images?.[0] || ""}`
                    }
                    alt={productdetail.stockId.productName}
                    className="img-fluid w-100"
                    style={{
                      filter: !productdetail.stockId.inStock
                        ? "blur(2px) grayscale(30%)"
                        : "none",
                      opacity: !productdetail.stockId.inStock ? 0.7 : 1,
                      transition: "filter 0.3s ease",
                    }}
                  />

                  {!productdetail.stockId.inStock && (
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        color: "#dc3545",
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                      }}
                    >
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {productdetail?.stockId.images?.slice(1).map((img, i) => {
                  const imgUrl = `https://gts.tsitcloud.com/${img}`;
                  return (
                    <div
                      key={i}
                      className="d-inline-block mt-3 me-3"
                      onMouseEnter={() => setHoveredImage(imgUrl)}
                      onMouseLeave={() => setHoveredImage(null)}
                      onClick={() => setSelectedImage(imgUrl)}
                      style={{
                        border:
                          selectedImage === imgUrl
                            ? "2px solid blue"
                            : "2px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt="Product Thumbnail"
                        className="img-fluid"
                        style={{
                          height: "70px",
                          width: "70px",
                          objectFit: "cover",
                          filter: !productdetail.stockId.inStock
                            ? "blur(1px) grayscale(30%)"
                            : "none",
                          opacity: !productdetail.stockId.inStock ? 0.7 : 1,
                        }}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* ---------- Right: Product Info ---------- */}
          <div className="col-lg-7 col-12">
            {productdetail && (
              <div className="row g-2">
                <div className="col-12 d-flex">
                  <div className="fw-bold me-2" style={{ width: "140px" }}>
                    Category:
                  </div>
                  <div>{productdetail.stockId.productName}</div>
                </div>
                <div className="col-12 d-flex">
                  <div className="fw-bold me-2" style={{ width: "140px" }}>
                    Sleeve Type:
                  </div>
                  <div>{productdetail.stockId.sleeveType}</div>
                </div>
                <div className="col-12 d-flex">
                  <div className="fw-bold me-2" style={{ width: "140px" }}>
                    Material:
                  </div>
                  <div>{productdetail.stockId.clothType}</div>
                </div>
                <div className="col-12 d-flex">
                  <div className="fw-bold me-2" style={{ width: "140px" }}>
                    Price:
                  </div>
                  <div>₹{productdetail.stockId.Price}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ---------- Logos Section ---------- */}
        <div className="row mb-3 mt-3 align-items-center">
          <label className="form-label text-start fw-bold mb-2 ">
            How Many Logos?
          </label>

          <div className="col-8 col-md-3">
            <input
               type="number"
  min="0"
  className="form-control"
  placeholder="Enter number"
  value={formData.logoCount || 0}
  onChange={(e) =>
    setFormData((prev) => ({ ...prev, logoCount: Number(e.target.value) }))
  }
            />
          </div>
        </div>

        {Number(logoCount) > 0 && (
          <div className="card mt-3">
            <div className="card-header bg-secondary text-white">
              Logo Details
            </div>
            <div className="card-body">
              {[...Array(Number(logoCount))].map((_, i) => (
                <div key={i} className="row g-3 mb-4 pb-3">
                  {/* Upload Logo */}
                  <div className="col-lg-4">
  <label className="form-label">Upload Logo {i + 1}</label>
  <input
    type="file"
    accept="image/*"
    className="form-control"
    onChange={(e) => {
      const file = e.target.files[0];
      const newLogos = [...formData.logos];
      newLogos[i] = {
        ...newLogos[i],
        file,
        preview: file ? URL.createObjectURL(file) : newLogos[i]?.preview,
      };
      setFormData((prev) => ({ ...prev, logos: newLogos }));
    }}
  />

  {/* ✅ Show either uploaded file preview OR existing preview */}
  {(formData.logos[i]?.file || formData.logos[i]?.preview) && (
    <div className="mt-2 text-center">
      <img
        src={
          formData.logos[i]?.file
            ? URL.createObjectURL(formData.logos[i].file) // new file
            : formData.logos[i]?.preview                  // prefilled preview
        }
        alt={`Logo ${i + 1}`}
        className="img-fluid rounded shadow"
        style={{ maxHeight: "100px", objectFit: "contain" }}
      />
    </div>
  )}
</div>


                  {/* Position */}
                  <div className="col-lg-4">
                    <label className="form-label">Position</label>
                    <select
                      className="form-select"
                      value={logos[i]?.position || ""}
                      onChange={(e) => {
                        const newLogos = [...logos];
                        newLogos[i] = {
                          ...newLogos[i],
                          position: e.target.value,
                        };
                        setFormData((prev) => ({ ...prev, logos: newLogos }));
                      }}
                    >
                      <option value="">Select position</option>
                      <option value="right chest">Right Chest</option>
                      <option value="left sleeve">Left Sleeve</option>
                      <option value="right sleeve">Right Sleeve</option>
                      <option value="front center">Front Center</option>
                      <option value="back top">Back Top</option>
                      <option value="back center">Back Center</option>
                      <option value="on pocket">On Pocket</option>
                    </select>
                  </div>

                  {/* Logo Type */}
                  <div className="col-lg-4">
                    <label className="form-label">Logo Type</label>
                    <table className="table table-bordered table-striped">
                      <tbody>
                        {logoOptions.map((option, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="radio"
                                name={`logoType-${i}`}
                                value={option.label}
                                checked={logos[i]?.type === option.label}
                                onChange={(e) => {
                                  const newLogos = [...logos];
                                  newLogos[i] = {
                                    ...newLogos[i],
                                    type: e.target.value,
                                    price: option.price,
                                  };
                                  setFormData((prev) => ({
                                    ...prev,
                                    logos: newLogos,
                                  }));
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

        {/* ---------- Quantity Selection ---------- */}
        <div className="mt-4">
  <table className="table table-bordered text-center">
    <thead className="table-light">
      <tr>
        <th colSpan="3">Choose Your Quantity</th>
      </tr>
      <tr>
        <th>Size</th>
        <th>Available</th>
        <th>Enter Quantity</th>
      </tr>
    </thead>
    <tbody>
      {productdetail &&
        Object.entries(productdetail.stockId.quantityBySize).map(
          ([size, quantity]) =>
            quantity > 0 ? (
              <tr key={size}>
                <td>{size}</td>
                <td>{quantity}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max={quantity}
                    placeholder={`Available: ${quantity}`}
                    className="form-control"
                    value={
                      formData.sizeWiseQty[size] !== undefined
                        ? formData.sizeWiseQty[size]
                        : ""
                    }
                    onChange={(e) => {
                      let value = e.target.value;

                      // If empty, keep it blank
                      if (value === "") {
                        setFormData((prev) => ({
                          ...prev,
                          sizeWiseQty: {
                            ...prev.sizeWiseQty,
                            [size]: "",
                          },
                        }));
                        return;
                      }

                      // Convert to number (remove leading 0s)
                      value = Number(value.replace(/^0+/, "")) || 0;

                      // Validation
                      if (value > quantity) {
                        setFormData((prev) => ({
                          ...prev,
                          sizeWiseQty: {
                            ...prev.sizeWiseQty,
                            [size]: quantity,
                          },
                        }));
                        setError(`Only ${quantity} available in size ${size}`);
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          sizeWiseQty: {
                            ...prev.sizeWiseQty,
                            [size]: value,
                          },
                        }));
                        setError("");
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                        e.preventDefault();
                      }
                    }}
                  />
                  {/* {error && <small style={{ color: "red" }}>{error}</small>} */}
                </td>
              </tr>
            ) : null
        )}
    </tbody>
  </table>
</div>



        {/* ---------- Add to Cart ---------- */}
        <div className="d-flex justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-lg addtocartbuttonsize d-flex align-items-center"
            style={{
              backgroundColor: productdetail.stockId.inStock ? "#0d6efd" : "#dc3545",
              color: "white",
              cursor: productdetail.stockId.inStock ? "pointer" : "not-allowed",
              opacity: productdetail.stockId.inStock ? 1 : 0.7,
            }}
            
          >
            <FaShoppingCart className="me-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </form>

      <Footer className="mt-5"></Footer>
    </>
  )
}

export default Updatestockdetail