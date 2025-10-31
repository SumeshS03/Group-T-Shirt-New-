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



const Stockdetail = () => {
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

      try {
        const response = await axios.get(
          `${baseurl}stocks/grouped-by-category`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("response data", response.data.data);

        // Flatten all products across categories into a single array
        const allStocks = response.data.data.flatMap(
          (category) => category.stocks
        );

        console.log("allProducts", allStocks);

        // Find specific product by id
        const foundStock = allStocks.find((p) => p._id === id);
        console.log("foundProduct", foundStock);

        if (foundStock) {
          setProductdetail(foundStock);

          // Safely set selected image
          if (foundStock.images && foundStock.images.length > 0) {
            setSelectedImage(
              `https://gts.tsitcloud.com/${foundStock.images[0]}`
            );
          }

          // Store categoryId if needed
          if (foundStock.categoryId) {
            localStorage.setItem("categoryId", foundStock.categoryId);
          }
        }

        setProductsData(allStocks);
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




const totalQty = Object.values(sizeWiseQty).reduce((a, b) => a + b, 0);
  // Prepare formData object
const formDataObj = {
  customerId: cusid,
  stockId: productdetail._id,
  quantity: totalQty, 
  sizeWiseQty,
  sleeveType: productdetail.sleeveType,
  price: Number(productdetail.Price),          // ✅ Use correct key
  totalAmount: Number(productdetail.Price) * totalQty, // ✅ Correct calculation
   logos: formData.logos.map((logo) => ({
    position: logo.position,
    logotype: logo.type,   // send 'type' as 'logotype'
  })), 
};

  // Create FormData
  const payload = new FormData();
  Object.entries(formDataObj).forEach(([key, value]) => {
    if (typeof value === "object") {
      payload.append(key, JSON.stringify(value));
    } else {
      payload.append(key, value);
    }
  });

  // Append logos
  formData.logos.forEach((logo) => {
    if (logo.file) {
      payload.append("logoPhotos", logo.file); // 'logoPhotos' is key expected by backend
    }
  });

  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(`${baseurl}stockCart/add`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Do NOT set 'Content-Type' manually; axios sets it automatically for FormData
      },
    });

    console.log("Order submitted successfully:", response.data);
    // Swal.fire("Added to Ready stock cart");
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
                      `https://gts.tsitcloud.com/${productdetail.images?.[0] || ""}`
                    }
                    alt={productdetail.productName}
                    className="img-fluid w-100"
                    style={{
                      filter: !productdetail.inStock
                        ? "blur(2px) grayscale(30%)"
                        : "none",
                      opacity: !productdetail.inStock ? 0.7 : 1,
                      transition: "filter 0.3s ease",
                    }}
                  />

                  {!productdetail.inStock && (
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
                {productdetail?.images?.slice(1).map((img, i) => {
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
                          filter: !productdetail.inStock
                            ? "blur(1px) grayscale(30%)"
                            : "none",
                          opacity: !productdetail.inStock ? 0.7 : 1,
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
                  <div>{productdetail.productName}</div>
                </div>
                <div className="col-12 d-flex">
                  <div className="fw-bold me-2" style={{ width: "140px" }}>
                    Sleeve Type:
                  </div>
                  <div>{productdetail.sleeveType}</div>
                </div>
                <div className="col-12 d-flex">
                  <div className="fw-bold me-2" style={{ width: "140px" }}>
                    Material:
                  </div>
                  <div>{productdetail.clothType}</div>
                </div>
                <div className="col-12 d-flex">
                  <div className="fw-bold me-2" style={{ width: "140px" }}>
                    Price:
                  </div>
                  <div>₹{productdetail.Price}</div>
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
              value={logoCount}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, logoCount: e.target.value }))
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
                        if (file) {
                          const newLogos = [...logos];
                          newLogos[i] = { ...newLogos[i], file };
                          setFormData((prev) => ({ ...prev, logos: newLogos }));
                        }
                      }}
                    />

                    {logos[i]?.file && (
                      <div className="mt-2 text-center">
                        <img
                          src={URL.createObjectURL(logos[i].file)}
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
        Object.entries(productdetail.quantityBySize).map(
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
                    value={sizeWiseQty[size] || 0}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value === "") {
                        setSizeWiseQty((prev) => ({ ...prev, [size]: 0 }));
                        return;
                      }
                      value = Number(value.replace(/^0+/, "")) || 0;

                      if (value > quantity) {
                        setSizeWiseQty((prev) => ({ ...prev, [size]: quantity }));
                        setError(`Only ${quantity} available in size ${size}`);
                      } else {
                        setSizeWiseQty((prev) => ({ ...prev, [size]: value }));
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
                  {/* {error && (
                    <small style={{ color: "red" }}>{error}</small>
                  )} */}
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
              backgroundColor: productdetail.inStock ? "#0d6efd" : "#dc3545",
              color: "white",
              cursor: productdetail.inStock ? "pointer" : "not-allowed",
              opacity: productdetail.inStock ? 1 : 0.7,
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
  );
};

export default Stockdetail;
