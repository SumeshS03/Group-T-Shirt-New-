import React from 'react'
import logofinal from "../images/GT-FInal-Logo.png"
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";

import amex from "../images/amex.png";
import applepay from "../images/apple.jpg";
import gpay from "../images/gpay1.jpg";
import visa from "../images/Visa1.jpg";
import mastercard1 from "../images/Master1.jpg";
import phonepay from "../images/Phonepe.jpg";
import './Footer.css'


const Footer = () => {
  return (
   <>

   <div className="footerone container-fluid py-5">
        <div className="row align-items-center justify-content-center">
          <div className=" col-lg-5 col-md-8 d-flex flex-column align-items-center justify-content-center text-white">
            <img className="img img-fluid footer-img" alt="logo" src={logofinal} ></img>
            <p className="mt-4 footeronefontfix">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores beatae itaque veniam doloremque Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero ipsa architecto nulla reprehenderit odio aspernatur aperiam esse nam qui expedita.</p>
            
          </div>
        </div>
        <div className="footerdetails row justify-content-center text-white">
          <div className="getintouch col-md-3 mb-4">
            <h4 style={{ color: "white" }}>Get in Touch</h4>
            <div className="phonedetail d-flex align-items-center mb-3">
              <div style={{ color: "green", fontSize: "24px" }}>
                <FiPhoneCall className="text-success fs-4" />
              </div>
              <div
                className="ms-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: "10px",
                }}
              >
                <span
                  className="d-block fw-bold"
                  style={{ color: "white", fontSize: "15px" }}
                >
                  Hotline
                </span>
                <span  style={{ color: "#8a8a8a" }}>
                  19008188
                </span>
              </div>
            </div>
            <div className="phonedetail d-flex align-items-center mb-3">
              <div style={{ color: "green", fontSize: "24px" }}>
                <HiOutlineMailOpen />
              </div>
              <div
                className="ms-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: "10px",
                }}
              >
                <span style={{ color: "white", fontSize: "15px" }}>EMAIL</span>
                <span style={{ color: "#8a8a8a" }}>hello@teespace.io</span>
              </div>
            </div>
            <div className="phonedetail">
              <div style={{ color: "green", fontSize: "24px" }}>
                <IoLocationOutline />
              </div>
              <div className="address-fix d-flex align-items-start">
                <div className="ms-3 d-flex flex-column text-start">
                  <span style={{ color: "white", fontSize: "15px" }}>
                    ADDRESS
                  </span>
                  <span style={{ color: "#8a8a8a" }}>
                    3245 Abbot Kinney BLVD-PH
                  </span>
                  <span style={{ color: "#8a8a8a" }}>Venice,CA124</span>
                </div>
              </div>
            </div>
          </div>
          <div className="getintouch col-md-2 mb-4 text-start">
            <h4 style={{ color: "white", marginBottom: "7px" }}>Company</h4>
            <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>About Us</p>
            <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>Our blog</p>
            <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>
              Start a Return
            </p>
            <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>Contact Us</p>
            <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>
              Shipping FAQs
            </p>
          </div>
          <div className="getintouch col-md-2 mb-4 text-start">
            <h4 style={{ color: "white" }}>Useful Links</h4>
            <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>My Account</p>
            <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>Shipping</p>
            <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>
              Contact & Support
            </p>
            <p style={{ color: "#8a8a8a", marginBottom: "7px" }}>
              All Products
            </p>
          </div>
          <div className="getintouch col-md-3 mb-4 text-start">
            <h4 style={{ color: "white" }}>Newsletter</h4>
            <p style={{ color: "#8a8a8a", marginBottom: "0px" }}>
              Follow our newsletter to stay updated about us
            </p>
            
    
            <div className="email-input-container relative inline-block">
  <input
    type="email"
    placeholder="Your email address"
    className="emailbox pr-10"  // Add right padding for the arrow
  />
  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
    <FaArrowRight />
  </span>
</div>
            
          </div>
        </div>
        <div className="footersocial row d-flex justify-content-center align-items-center mt-5 px-4">
  <div className="col-12 d-flex justify-content-center">
    <div className="footersocial1 d-flex align-items-center gap-3" style={{ color: "#8a8a8a" }}>
      <span className="followuson" style={{ marginTop: "6px" }}>Follow us on</span>
      <span><FaTwitter style={{ color: "#8a8a8a", marginTop: "6px" }} /></span>
      <span><FaFacebookF style={{ color: "#8a8a8a", marginTop: "6px" }} /></span>
      <span><FaInstagram style={{ color: "#8a8a8a", marginTop: "6px" }} /></span>
      <span><FiYoutube style={{ color: "#8a8a8a", marginTop: "6px" }} /></span>
    </div>
  </div>

  <div className="col-12 d-flex justify-content-center mt-1">
    <div className="footersocial1 d-flex gap-2">
      <img src={amex} style={{ width: "33px", height: "37px" }} alt="amex" />
      <img src={applepay} style={{ width: "33px", height: "20px", backgroundColor: "white" }} alt="applepay" />
      <img src={gpay} style={{ width: "33px", height: "20px", backgroundColor: "white" }} alt="gpay" />
      <img src={visa} style={{ width: "33px", height: "20px" }} alt="visa" />
      <img src={mastercard1} style={{ width: "33px", height: "20px" }} alt="mastercard" />
      <img src={phonepay} style={{ width: "33px", height: "20px" }} alt="phonepay" />
    </div>
  </div>
</div>

      </div>

      <div className="footer2 py-3">
        <p className='footercopytext' >
          © All Copyright 2025 by Website Design and Build -
          <span className='footercopytexttwo'>
            www.Tabsquareinfotech.com
          </span>
        </p>
      </div>
   </>
            
  )
}

export default Footer