import React from "react";
import "./HomeHeader.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFileSignature } from "react-icons/fa6";
import logofinal from "../images/GT-FInal-Logo.png";
import { FaBars } from "react-icons/fa";
import { Popover } from "antd";

const HomeHeader = () => {
  const location = useLocation(); // Get current URL
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isShopActive =
    ["/shop", "/tshirts", "/product", "/newdesign", "/stock"].includes(
      currentPath
    ) || currentPath.startsWith("/productdetail/");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    setActiveLink(location.pathname.replace("/", ""));
  }, [location]);

  const handlehistoryclick = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/orders");
    }
  };

  //content for product dropdown
 const contentproduct = (
  <ul
    className="no-dots"
    style={{ listStyle: "none", padding: 0, margin: 0 }}
  >
    <li>
      <span
        style={{ cursor: "pointer", color: "#007fff" }}
        onClick={() => handleProtectedNavigation("/product")}
      >
        Products
      </span>
    </li>
    <li>
      <span
        style={{ cursor: "pointer", color: "#007fff" }}
        onClick={() => handleProtectedNavigation("/stock")}
      >
        Stock
      </span>
    </li>
    <li>
      <span
        style={{ cursor: "pointer", color: "#007fff" }}
        onClick={() => handleProtectedNavigation("/newdesign")}
      >
        New Design
      </span>
    </li>
  </ul>
);



  const handleProtectedNavigation = (path) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    navigate(path);
  } else {
    navigate("/profile");
  }
};

  const content = (
    <ul
      className="no-dots"
      style={{ listStyle: "none", padding: 0, margin: 0 }}
    >
      <li>
        <Link to="/cart">Product Cart</Link>
      </li>
      <li>
        <Link to="/stockcart">Ready Stock Cart</Link>
      </li>
      {/* <li><Link to="/orders">Orders</Link></li> */}
    </ul>
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    // Extract pathname and set active link
    setActiveLink(location.pathname.replace("/", ""));
  }, [location]);

  //logout the user
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("categoryId");
    localStorage.removeItem("customer");
    localStorage.removeItem("customerId");
    navigate("/profile"); // redirect after logout
  };

  return (
    <div>
      <header className="header">
        <nav className="logo d-flex">
          <img src={logofinal} alt="logo" className="logo-img"></img>
        </nav>

        <div className="divider">
          <div className="address-divider">
            <div className="address hide-on-770 ">
              <nav className="d-flex justify-content-between w-100">
                <div>
                  <ul className="address-gapfix list-inline d-flex ">
                    <li className="list-inline-item">
                      <FaLocationDot className="location-icon" />
                    </li>
                    <li className="list-inline-item">
                      <div className="dotted"></div>
                    </li>
                    <li className="list-inline-item">
                      <a href="" class="no-underline">
                        No.05-Kodambak, Kam High Road Nungambakkam, Chennai -
                        34.
                      </a>
                    </li>
                    <li className="telephone-icon list-inline-item">
                      <FaPhoneVolume className="telephone-icon" />
                    </li>
                    <li className="dotted list-inline-item"></li>
                    <li className="list-inline-item">+91 9600056884</li>
                  </ul>
                </div>
                <div className="header-insta-icon">
                  <div className="icon-divider">
                    <div className="insta-box">
                      <FaInstagram className="insta-icons" />
                    </div>
                    <div className="insta-box">
                      <FaFacebookF className="facebook-icon" />
                    </div>
                    <div className="insta-box">
                      <FaTwitter className="twitter-icon" />
                    </div>
                    <div className="insta-box">
                      <FaWhatsapp className="whatsapp-icon" />
                    </div>
                    <div className="insta-box">
                      <FaYoutube className="youtube-icon" />
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <nav className="home-text navbar ">
            <div className="home-divider">
              <Link
                to="/home"
                className="no-underline-1 fw-bold"
                style={{ color: activeLink === "home" ? "#cf9601" : "#007fff" }}
              >
                HOME
              </Link>

              <Link
                to="/aboutus"
                className="no-underline-2 fw-bold"
                style={{
                  color: activeLink === "aboutus" ? "#cf9601" : "#007fff",
                }}
              >
                ABOUT US
              </Link>

              <Popover
                content={contentproduct}
                placement="bottom"
                trigger="hover"
              >
                <span
                  className="fw-bold"
                  style={{
                    color: isShopActive ? "#cf9601" : "#007fff",
                    cursor: "pointer",
                  }}
                >
                  SHOP
                </span>
              </Popover>
              <Link
                to="/service"
                className="no-underline-2 fw-bold"
                style={{
                  color: activeLink === "service" ? "#cf9601" : "#007fff",
                }}
              >
                SERVICE
              </Link>
              <Link
                to="/contactus"
                className="no-underline-2 fw-bold"
                style={{
                  color: activeLink === "contactus" ? "#cf9601" : "#007fff",
                }}
              >
                CONTACT US
              </Link>
            </div>
            <div className="home-divider1">
              <div className="search-container">
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search..."
                />
                <FaSearch className="search-icon" />
              </div>
              <div className="pofile-box">
                {!authToken ? (
                  <MdPerson
                    className="profileicons"
                    onClick={() => navigate("/profile")}
                  />
                ) : (
                  <Popover
                    content={
                      <div className="text-center">
                        <button
                          className="btn btn-sm btn-outline-danger w-100"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    }
                    trigger="hover"
                    placement="bottom"
                  >
                    <MdPerson className="profileicons" />
                  </Popover>
                )}
                {/* <MdPerson className='profileicons'

                onClick={() => navigate("/profile")} /> */}
              </div>

              {/* <Popover content={content} trigger="hover" placement="bottom">
  <div className="pofile-box">
    <FaCartShopping
      className="profile-icons"
      style={{ color: "#007fff" }}
    />
  </div>
</Popover> */}

              <div className="pofile-box">
                <FaCartShopping
                  className="profile-icons"
                  style={{ color: "#007fff" }}
                  onClick={() => navigate("/cart")}
                />
              </div>

              {localStorage.getItem("authToken") && (
                <div className="pofile-box">
                  <FaFileSignature
                    className="profileicons"
                    onClick={handlehistoryclick}
                  />
                </div>
              )}
            </div>

            <div className="hamburger-menu search-boxhead mb-4">
              <div className="search-container">
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search..."
                />
                <FaSearch className="search-icon" />
              </div>
              <div className="pofile-box">
                {!authToken ? (
                  <MdPerson
                    className="profileicons"
                    onClick={() => navigate("/profile")}
                  />
                ) : (
                  <Popover
                    content={
                      <div className="text-center">
                        <button
                          className="btn btn-sm btn-outline-danger w-100"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    }
                    trigger="hover"
                    placement="bottom"
                  >
                    <MdPerson className="profileicons" />
                  </Popover>
                )}
                {/* <MdPerson className='profileicons'

                onClick={() => navigate("/profile")} /> */}
              </div>
              <div className="st-line"></div>

              <div className="pofile-box">
                <FaCartShopping
                  className="profile-icons"
                  style={{ color: "#007fff" }}
                  onClick={() => navigate("/cart")}
                />
              </div>
            </div>

            <div className="hamburger-menu" onClick={toggleSidebar}>
              <FaBars />
            </div>
          </nav>

          {/* added */}
          <div className={`mobile-sidebar ${isSidebarOpen ? "open" : ""}`}>
            <div
              className="close-btn"
              onClick={toggleSidebar}
              style={{ color: "blue" }}
            >
              ×
            </div>
            {localStorage.getItem("authToken") && (
              <div className="pofile-box ">
                <FaFileSignature
                  className="profileicons"
                  onClick={handlehistoryclick}
                />
              </div>
            )}
            <Link
              to="/"
              onClick={toggleSidebar}
              className="no-underline-1"
              style={{ color: activeLink === "home" ? "#cf9601" : "blue" }}
            >
              HOME
            </Link>
            <Link
              to="/aboutus"
              onClick={toggleSidebar}
              className="no-underline-2"
              style={{ color: activeLink === "aboutus" ? "#cf9601" : "blue" }}
            >
              ABOUTUS
            </Link>
            <Popover
              content={contentproduct}
              placement="bottom"
              trigger="hover"
            >
              <span
                className="fw-bold"
                style={{
                  color: isShopActive ? "#cf9601" : "#007fff",
                  cursor: "pointer",
                }}
              >
                SHOP
              </span>
            </Popover>
            <Link
              to="/service"
              onClick={toggleSidebar}
              className="no-underline-2"
              style={{ color: activeLink === "service" ? "#cf9601" : "blue" }}
            >
              SERVICE
            </Link>
            <Link
              to="/contactus"
              onClick={toggleSidebar}
              className="no-underline-2"
              style={{ color: activeLink === "contactus" ? "#cf9601" : "blue" }}
            >
              CONTACT US
            </Link>
            <div className="icon-diver ">
              <div className="insta-box">
                <FaInstagram className="insta-icons" />
              </div>
              <div className="insta-box">
                <FaFacebookF className="facebook-icon" />
              </div>
              <div className="insta-box">
                <FaTwitter className="twitter-icon" />
              </div>
              <div className="insta-box">
                <FaWhatsapp className="whatsapp-icon" />
              </div>
              <div className="insta-box">
                <FaYoutube className="youtube-icon" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomeHeader;
