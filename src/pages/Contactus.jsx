import React from "react";
import "./Contactus.css";
import HomeHeader from "../Layout/HomeHeader";
import SimpleMap from "./SimpleMap";
import glow from "../images/Service-page-8.png"
import leaf from "../images/service-page9.png"
import fastshipping from "../images/fastshipping.png"
import customerhappy from "../images/customerhappy.png"
import contactusimageone from "../images/contactusimageone.png"
import Footer from '../Layout/Footer'
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Contactus = () => {
  const navigate = useNavigate();
    const newcheck = () =>{
      const token = localStorage.getItem('authToken');
      window.scrollTo(0, 0);
      if (token) {
        // User is authenticated
        navigate(`/newdesign`);
      }
      else{
        Swal.fire("Please login to start shopping.");
        navigate('/profile');
      }
    };
  return (
    <>
      <div>
        <HomeHeader />
      </div>
      <div
        className="about-box d-flex  h-50 flex-column align-items-center "
        style={{ position: "relative" }}
      >
        <div className="first-background p-5  mb-4 d-flex text-white ">
          <h1 className="mt-4 aboutustext">CONTACT US</h1>
        </div>
        <p
          className=" w-50 home-contactustext "
          style={{ textAlign: "start", marginLeft: "-23%" }}
        >
          Home - Contact Us
        </p>
        <img src={contactusimageone} alt="contactus" className="imagetoptwo"></img>
      </div>
      <h2
        className="heading-textcontact"
        style={{ textAlign: "center", marginTop: "70px" }}
      >
        Keep in touch <span style={{ color: "blue" }}>with us</span>
      </h2>
      <div className="container w-75">
      <p  className='contactparatext mt-lg-0 mt-1'   >
        We're talking about clean beauty gift sets, of course - and we've got a bouquet of beauties for yourself or someone you love
      </p>
      </div>
      
      <div style={{marginTop:"60px",marginBottom:"60px"}}>
      <SimpleMap />
      </div>
      <div className="contactus-box w-100  bg-white p-5 d-flex justify-content-center align-items-center">
      <div className="address-box d-flex flex-center justify-content-center align-items-center flex-column">
        <div className="row gap-3 w-100 justify-content-center addressboxrow p-5">
          <div className="col-lg-3 col-12 call-box text-center p-4 mt-5 " style={{backgroundColor:"#eaa606"}}>
            <div className="w-100 d-flex align-item-center justify-content-center">
            <div className="locationround" style={{backgroundColor:"#eaa606"}}>
            <div className="locationinnerround d-flex justify-content-center align-items-center">

            <BsFillTelephoneFill className="telephonesizing" style={{color:"white"}} />
            </div>
            </div>
            </div>
            <h2 className="mt-2 mb-2 contactuscalltext" >CALL US AT</h2>
            <p className="addressboxpara">+91 96000 52220</p>
            <p className="addressboxpara mb-4">+91 98843 52220</p>
          </div>
          <div className="col-lg-3 col-12 call-box text-center p-4 mt-5" style={{backgroundColor:"#0060c7"}}>
          <div className="w-100 d-flex align-item-center justify-content-center">
          <div className="locationround" style={{backgroundColor:"#0060c7"}}>
            <div className="locationinnerround d-flex justify-content-center align-items-center" style={{backgroundColor:"white"}}>

            <FaLocationDot className="telephonesizing" />
            </div>
            </div>
            </div>
          <h2 className="mt-2 mb-2" style={{fontSize:"22px",color:"#eaa606"}}>VISIT US AT</h2>
          <p className="addressboxpara">14/15 || Floor,Gandhi Nagar, Karambayam, Porur, Chennai-600166</p>
          </div>
          <div className="col-lg-3 col-12 call-box text-center p-4 mt-5 " style={{backgroundColor:"#eaa606"}}>
          <div className="w-100 d-flex align-items-center justify-content-center">
          <div className="locationround" style={{backgroundColor:"#eaa606"}}>
            <div className="locationinnerround d-flex justify-content-center align-items-center">

            <MdEmail className="telephonesizing" style={{color:"white"}}/>
            </div>
            </div>
            </div>
          <h2 className="mt-2 mb-2" style={{fontSize:"22px",color:"white"}}>MAIL US AT</h2>
          <p className="addressboxpara text-break">info@soinggroupofcompanies.com</p>
          <p className="addressboxpara text-break">hr@soinggroupofcompanies.com</p>
          </div>

          

        </div>
        <div className="row d-flex flex-column align-item-cemter justify-content-center mt-3 address-textbox">
          <p style={{color:"white"}}>FULL ENQUIRY</p>
          <h1 className="contactustext" style={{ margin: "0px" }}>
            Any Questions?
          </h1>
          <p className="contactusparatext w-100 text-center" style={{color:"white"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. , oribus inventori doloremque alias ipsam aliquid quisquam, nostrum incidunt debitis error nemo, animi corrupti reprehenderit optio doloribus minima accusantium! Quos voluptas qui aspernatur!</p>
          <form>
                  {/* First Row: First Name & Last Name */}
                  <div className="row mb-lg-4 mb-1  ">
                    <div className="col-md-6 p-2 ">
                      <input
                        type="text"
                        className="form-control rounded-pill enquiry-box"
                        placeholder="Name"
                        
                      />
                    </div>
                    <div className="col-md-6 p-2 ">
                      <input
                        type="text"
                        className="form-control rounded-pill enquiry-box"
                        placeholder="Email Address"
                        
                      />
                    </div>
                  </div>

                  {/* Second Row: Email or Phone */}
                  <div className="row mb-lg-4 mb-1">
                    <div className="col-md-6 p-2">
                      <input
                        type="text"
                        className="form-control rounded-pill enquiry-box"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="col-md-6 p-2">
                      <input
                        type="text"
                        className="form-control rounded-pill enquiry-box"
                        placeholder="Your phone"
                      />
                    </div>
                  </div>

                  {/* Third Row: Message Box */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <textarea
                        className="form-control rounded-4"
                        rows="4"
                        placeholder="Message"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      className="btn btn-light rounded-pill py-2 px-5 mb-3 send-btn"
                      style={{ backgroundColor: "#034e9f",color:"white" }}
                    >
                      
                      SEND
                    </button>
                  </div>
                </form>
        </div>
      </div>
      </div>

      <div className="enjoyupone p-5 ">
              <div className="row">
                <div className="col-12 enjoyup-text " style={{ paddingBottom:"6%",paddingTop:"6%"}}>
                  <h2
                    className="heading-text"
                    style={{ textAlign: "left", marginTop: "0" }}
                  >
                    Bring your ideas to
                  </h2>
                  <h2
                    className="heading-text"
                    style={{ textAlign: "left", marginTop: "0" }}
                  >
                    life in minute!
                  </h2>
                  <p className="keepmovingtext" >
                    T-shirts that keep you moving
                  </p>
                  <div className="row d-flex mt-4 ">
                    <div className="col" style={{ textAlign: "left" }}>
                      <button
                        className=" btn rounded-pill  px-4 py-2 get-started-today  "
                        style={{ textAlign: "none" }}
                        onClick={newcheck}
                      >
                        GET STARTED TODAY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            <div className="toolsbox container-fluid mt-3 py-3 ">
        <div className="row w-100">
        <div className="easycustomize col-lg-3 col-12 ">
          <img src={glow} alt="profile" className="toolsicons" ></img>
          <div className="d-flex flex-column text-lg-start text-center item-center">
            <p className="easytext "
            >
              {" "}
              Easy to create and
            </p>
            <p className="easytexttwo"> customize</p>
          </div>
        </div>
       
        <div className="easycustomize col-lg-3 col-12 ">
        <img src={leaf} alt="profile" className="toolsicons" ></img>
          <div className="d-flex flex-column text-lg-start text-center">
            <p
              className="easytext"
            >
              {" "}
              Eco-conscious, high-
            </p>
            <p className="easytexttwo" >
              quality prints
            </p>
          </div>
        </div>
        <div className="easycustomize col-lg-3 col-12 ">
        <img src={fastshipping} alt="profile" className="toolsicons" ></img>
          <div className="d-flex flex-column text-lg-start text-center">
            <p
              className="easytext"
            >
              {" "}
              Fast and free standard
            </p>
            <p className="easytexttwo">shipping</p>
          </div>
        </div>
        <div className="easycustomize col-lg-3 col-12 ">
        <img src={customerhappy} alt="profile" className="toolsicons" ></img>
          <div className="d-flex flex-column text-lg-start text-center">
            <p
              className="easytext"
            >
              {" "}
              Customer happiness
            </p>
            <p className="easytexttwo">guarantee</p>
          </div>
        </div>
        </div>
      </div>
                  <div className="bg-primary p-5">
                    <div className="container">
  <div className="row d-flex justify-content-center align-items-center">
    
    {/* Text Column */}
    <div className="col-12 col-lg-9 text-center text-lg-start mb-4 mb-lg-0">
      <h2 className="text-white fw-bold mb-3 getfreetext">
        Get Free T-shirt Printing?
      </h2>
      <p className="mb-1 text-white getfreetextpara">
        Like readable English. Many desktop publishing packages and web page editors
      </p>
      <p className="mb-0 text-white getfreetextpara">
        Guarantee Many desktop publishing packages and web page editors
      </p>
    </div>

    {/* Button Column */}
    <div className="col-12 col-lg-3 text-center text-lg-end">
      <button
        className="btn btn-light px-4 py-2 fw-semibold"
        style={{ border: "none" }}
      >
        Contact Now
      </button>
    </div>
    
  </div>
  </div>
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

export default Contactus;
