import React, { useState } from "react";
import HomeHeader from "../Layout/HomeHeader";
import "./Aboutcontent.css";
import { LiaCheckCircle } from "react-icons/lia";
import qualityshirt from "../images/Premium-Quality.png";
import outstandquality from "../images/Outstanding-Quality1.png";
import secpayment from "../images/Secure-payment1.png";
import cussizestyle from "../images/Custom-SIze-STyle.png";
import shipworldwide from "../images/Shipping-worldwide.png";
import noordermin from "../images/No-order-minimum.png";
import highspeed from "../images/High-Speed-Service.png";
import freetemplate from "../images/Free-Templates.png";
import { TbBrandElastic } from "react-icons/tb";
import { SiAirbnb } from "react-icons/si";
import tshirt from "../images/yourstyle.png";
import yourprintone from "../images/yourprint.png";
import quantity from "../images/yourquantity.jpg";
import payment from "../images/payment.jpg";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import profileone from "../images/Profileone.jpg"
import profiletwo  from "../images/profiletwo.jpg"
import profilethree from "../images/Profilethree.jpg"
import profilefour from "../images/Profilefour.jpg"
import profilefive from "../images/Profilefive.jpg"
import profilesix from "../images/profilesix.jpg"
import profilrseven from "../images/profileseven.jpg"
import profileeight from "../images/profileeight.jpg"
import profilenine from "../images/profilenine.jpg"
import profileten from "../images/profileten.jpg"
import groupimage from "../images/groupimagehome.png"
import Footer from "../Layout/Footer";
import aboutus from "../images/about-us1.png";
import { FaFacebook } from "react-icons/fa";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import aboutustwo from "../images/Aboutus2.png";
import playbutton from "../images/play-button2.png"
import Swal from "sweetalert2";


const sliderSettingsicons = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


const Aboutcontent = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const buycheck = () =>{
    const token = localStorage.getItem('authToken');
    window.scrollTo(0, 0);
    if (token) {
      // User is authenticated
     
      navigate(`/product`);
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
          <h1 className="mt-4 aboutustext">ABOUT US</h1>
        </div>
        <p
          className=" w-50 home-contactustext"
          style={{ textAlign: "start", marginLeft: "-23%" }}
        >
          Home - About Us
        </p>
        <img src={aboutus} alt="aboutus" className="imagetop"></img>
      </div>

      <div className="design-box container mt-5 ">
        <div className="row  ">
          <div className="  col-lg-6  col-md-12 ps-2  design-text d-flex flex-column justify-content-between text-start">
            <p
              style={{ color: "#a2a2a2", marginLeft: "6px", fontSize: "20px" }}
            >
              Who are we
            </p>
            <h1 className="heading-text m-0">Create Stunning Print</h1>

            <h1 className="m-0 text-start">
              <span className="heading-text">for </span>
              <span className="heading-text-two" style={{ margin: "0px" ,color:'#007fff' }}>
              
                Your Business
              </span>
            </h1>
            <p
              className=" mt-3 fs-lg-4  mb-0 mobile-text "
              style={{ color: "#a2a2a2"}}
            >
              T-Shirt Printing for Everyone.<span> Get a head start with</span>
            </p>
            <p
              className=" fs-lg-4  mt-0 mobile-text "
              style={{ color: "#a2a2a2" }}
            >
              free design templates you can customize in a few clicks
            </p>
            <div className="text-start ms-0">
            <p
              className="text-secondary mt-2 mb-2 "
              style={{ color: "#a2a2a2" }}
            >
              <LiaCheckCircle className="circle-check" /> Top quality prints
              using the latest technology
            </p>
            <p
              className="text-secondary  "
              style={{ color: "#a2a2a2" }}
            >
              <LiaCheckCircle className="circle-check" /> Mix and match
              colors,sizes,and designs
            </p>
            </div>
            <button className="start-btd-new mt-3  fs-5" onClick={buycheck}>GET STARTED</button>
          </div>

          <div className=" col-lg-6 col-md-12   justify-content-end position-relative hide-on-768 ">
            <img src={groupimage} alt="Image 1" className="image" width="100%" />
            {/* <img src={designimage} alt="Image 1" className="image-2" /> */}
          </div>
        </div>
      </div>
      
      <div className="container d-flex align-items-center justify-content-center">
      <div className="w-75 allfeaturestext" >
        <text  className="offerboxparatext " style={{ color: "#a2a2a2" }}>
          All the features you need
        </text>
        <h1
          className="heading-textfontfix"
          
        >
          What Makes <span style={{ color: "#007fff" }}>GroupTshirt</span>
        </h1>
        <h1 className="heading-textfontfix " style={{ margin: "0",marginBottom:"10px" }}>
          <span style={{ color: "#eeae0c" }}>Custom T-Shirts Different</span>
        </h1>
        <text className="offerboxparatext offertext-fix" style={{ color: "#a2a2a2"}}>
          T-Shirt Printing for Everyone. Get a head start wiyh free design
          templates you can customize in a few clicks.
        </text>
      </div>
      </div>
      <div className="quality-box">
              <div className="servicesbox">
                <div className="custom-row row justify-content-between gx-0 gy-4 ">
                  <div className="box col-lg-3 col-12">
                    <div className="box-innersize">
                      <img
                        src={qualityshirt}
                        alt="Premium Quality"
                        className=" img-fluid box-image"
                        style={{}}
                      />
                      <h2 className="bortexthead">Premium quality shirts</h2>
                      <p className="bortextone">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum, quo! Deserunt
                      </p>
                    </div>
                  </div>
                  <div className="box col-lg-3 col-12">
                    <div className="box-innersize">
                      <img
                        src={outstandquality}
                        alt="Premium Quality"
                        className="box-image img-fluid "
                        style={{}}
                      />
                      <h2 className="bortexthead">Outstanding quality</h2>
                      <p className="bortextone">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum, quo! Deserunt
                      </p>
                    </div>
                  </div>
                  <div className="box col-lg-3 col-12">
                    <div className="box-innersize">
                      <img
                        src={secpayment}
                        alt="Premium Quality"
                        className="box-image"
                        style={{}}
                      />
                      <h2 className="bortexthead">Secure payment</h2>
                      <p className="bortextone">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum, quo! Deserunt
                      </p>
                    </div>
                  </div>
                  <div className="box col-lg-3 col-12">
                    <div className="box-innersize">
                      <img
                        src={cussizestyle}
                        alt="Premium Quality"
                        className="box-image"
                        style={{}}
                      />
                      <h2 className="bortexthead">Custom size & style</h2>
                      <p className="bortextone">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum, quo! Deserunt
                      </p>
                    </div>
                  </div>
                </div>
                <div className="custom-row row justify-content-between gx-0 gy-4 customrowtwo ">
                  <div className="box col-lg-3 col-12">
                    <div className="box-innersize">
                      <img
                        src={shipworldwide}
                        alt="Premium Quality"
                        className="box-image"
                        style={{}}
                      />
                      <h2 className="bortexthead">Shipping Worldwide</h2>
                      <p className="bortextone">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum, quo! Deserunt
                      </p>
                    </div>
                  </div>
                  <div className="box col-lg-3 col-12">
                    <div className="box-innersize">
                      <img
                        src={noordermin}
                        alt="Premium Quality"
                        className="box-image"
                        style={{}}
                      />
                      <h2 className="bortexthead">No order minimums</h2>
                      <p className="bortextone">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum, quo! Deserunt
                      </p>
                    </div>
                  </div>
                  <div className="box col-lg-3 col-12">
                    <div className="box-innersize">
                      <img
                        src={highspeed}
                        alt="Premium Quality"
                        className="box-image"
                        style={{}}
                      />
                      <h2 className="bortexthead">High Speed Services</h2>
                      <p className="bortextone">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum, quo! Deserunt
                      </p>
                    </div>
                  </div>
                  <div className="box col-lg-3 col-12">
                    <div className="box-innersize">
                      <img
                        src={freetemplate}
                        alt="Premium Quality"
                        className="box-image"
                        style={{}}
                      />
                      <h2 className="bortexthead">Free templates</h2>
                      <p className="bortextone">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum, quo! Deserunt
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container py-0 my-5">
          <div className="row verifyimagebox ">
            
            <div className="col-lg-6 text-center position-relative">
              <div className="verify-photo-box  ">
                <img
                  src={require("../images/Girl-image.png")}
                  alt="logo"
                  className=" verify-photo-img position-absolute"
                />
              </div>
            </div>

            
            <div className="col-lg-6 text-lg-start text-center ">
              <div className="verify-photo-text w-100 p-lg-0 p-3">
                <h2
  className="heading-text fs-1 text-lg-start text-center"
  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
>
  Ok, Let's See <span style={{ color: '#007fff' }}>GroupTshirt</span>
</h2>
                <h2 className="heading-text text-lg-start text-center fs-1">In Numbers</h2>
                <p
                  className="text-left text-lg-start text-center mt-2 verifytextfontfix"
                  
                >
                  Creates a scrolling text or image effect within a webpage. It
                  allows content to move horizontally or vertically across the
                  screen, providing a simple way to add dynamic movement to
                  elements. Although this tag is deprecated.
                </p>
                <div className="row mt-lg-4 mt-1 d-flex  justify-content-between g-3 g-md-4">
                  <div className="col-lg-3 col-12 d-flex flex-column align-items-center  ms-lg-4 ms-0">
                    <div className="first-box bg-warning  p-3">
                      <h4
                        className="text-primary fw-bold designboxhead text-center"
                        style={{ fontSize: "38px" }}
                      >
                        $50M
                      </h4>
                      <div className="text-center">
                      <span
                        className="text-dark designboxpara designtextboxtext "
                       
                      >
                        printing <br /> sumesh
                      </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-12 d-flex flex-column align-items-center ">
                    <div className="first-box bg-primary text-white  p-3">
                      <h4
                        className="fw-bold designboxhead text-center"
                        style={{ fontSize: "38px" }}
                      >
                        32M +
                      </h4>
                      <div className="text-center">
                      <span
                        className="designboxpara designtextboxtext"
                        
                      >
                        Items trusted
                        <br />
                        to deliver
                      </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-12 d-flex flex-column align-items-center  ">
                    <div className="first-box bg-warning  p-3">
                      <h4
                        className="text-primary fw-bold designboxhead text-center"
                        style={{ fontSize: "38px" }}
                      >
                        70M +
                      </h4>
                      <div className="text-center">
                      <span
                        className="text-dark designboxpara designtextboxtext"
                        
                      >
                        sold by customers <br /> through grouptshirt
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
              <div className="we-work-box">
          <div className="we-workboswidthfix">
          <h1 className="heading-textone mt-lg-0 mt-5 mb-lg-0 mb-2">
            How we
            <span style={{ color: "#007fff" }}> work </span>
          </h1>
         

          <p className="howweworktext"
            
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, quo!
            Deserunt it is still useful to understand its functionality
          </p>
         
          <div className="container-fluid d-flex flex-column align-items-center mt-lg-4 mt-0">
            <div className="your-style row d-flex flex-wrap justify-content-center align-items-center  mt-lg-4 mt-0 rounded">
              <div className="your-print col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center mb-3 gap-2 ">
                <div className="your-tshirt">
                  <img
                    src={tshirt}
                    alt="tshirt"
                    style={{
                      width: "111px",
                      height: "111px",
                      borderRadius: "50%",
                      border: "2px solid black",
                    }}
                  ></img>
                </div>
                
                <h3 className="yourstyle-box ">Your Style </h3>
                
                </div>
              
              <div className="your-print col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center mb-3 your-printtwo gap-2">
                <div className="your-tshirt">
                  <img
                    src={yourprintone}
                    alt="tshirt"
                    style={{
                      width: "111px",
                      height: "111px",
                      borderRadius: "50%",
                      border: "2px solid black",
                    }}
                  ></img>
                </div>
                  
                <h3
                  className="yourstyle-box"
                  style={{ backgroundColor: "#ffd401", color: "blue" }}
                >
                  Your Print
                </h3>
                
                
              </div>
              <div className="your-print col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center mb-3 your-printone gap-2">
                <div className="your-tshirt">
                  <img
                    src={quantity}
                    alt="tshirt"
                    style={{
                      width: "111px",
                      height: "111px",
                      borderRadius: "50%",
                      border: "2px solid black",
                    }}
                  ></img>
                </div>
                <h3
                  className="yourstyle-box"
                  style={{ backgroundColor: "#ffd401", color: "blue" }}
                >
                  Quantity
                </h3>
              </div>
              <div className="your-print col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center mb-3 your-printone gap-2">
                <div className="your-tshirt">
                  <img
                    src={payment}
                    alt="tshirt"
                    style={{
                      width: "111px",
                      height: "111px",
                      borderRadius: "50%",
                      border: "2px solid black",
                    }}
                  ></img>
                </div>
                <h3
                  className="yourstyle-box"
                  style={{ backgroundColor: "#ffd401", color: "blue" }}
                >
                  Payment
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
            </div>

           
      <p className="wegottext"
        
        >
          "We've got custom T-shirts in a range of fits and sizes, so"
        </p>
        <span className="wegottext" style={{marginTop:"0px"}} >
          everyon can wear your brand or message"
        </span>
     
      <div className="container-fluid d-flex justify-content-center">
      <div className="toolsbox mt-5 mb-5">
      <Slider {...sliderSettingsicons}>
        {[
          { icon: <TbBrandElastic />, label: "Elastic" },
          { icon: <SiAirbnb />, label: "Airbnb" },
          { icon: <SiAirbnb />, label: "Airtable" },
          { icon: <SiAirbnb />, label: "Framer" },
          { icon: <SiAirbnb />, label: "Freshworks" },
          { icon: <SiAirbnb />, label: "Gitlab" },
        ].map((item, index) => (
          <div key={index} className="d-flex justify-content-center align-items-center bg-white p-2">
            {item.icon}
            <span className="ms-2 elastix-text fs-3">{item.label}</span>
          </div>
        ))}
      </Slider>
    </div>
    </div>
      <div className="letstalk-box container-fluid   ">
        <div className="row  lettalk">
       
          <div className="col-12 col-lg-5  py-2   px-5">
            <div className=" d-flex flex-column justify-content-center">
              <h5
                className="heading-text"
                style={{ textAlign: "center", color: "#034e9f" }}
              >
                Let's talk
              </h5>
              <p style={{ textAlign: "center" }}>
                Printed and shipped on demand!{" "}
              </p>
              <form>
                
                <div className="row mb-lg-4 mb-0 mt-1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                
                <div className="row mb-lg-4 mb-0 mt-1">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      placeholder="Email or Phone Number"
                    />
                  </div>
                </div>

               
                <div className="row mb-3 mt-lg-3 mt-1 ">
                  <div className="col-12">
                    <textarea
                      className="form-control rounded-4"
                      rows="4"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center mt-4 mb-3">
                  <button
                    className="btn btn-light rounded-pill py-2 px-5 submit-btn"
                    style={{ backgroundColor: "#034e9f" }}
                  >
                    {" "}
                    SUBMIT{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-lg-7 lettalkimagecont position-relative ">
            <div className="  ">
             
              <img src={aboutustwo} alt="About Us" className="letstalkimage position-absolute " />
            </div>
          </div>
        </div>
      </div>
      <p  className="mt-5" style={{ marginBottom: "0", color: "#949494"}}>Our Team</p>
      <h2
        className="heading-text"
        style={{ textAlign: "center", marginTop: "0" }}
      >
        Meet the <span style={{ color: "blue" }}>GroupTshirt</span> team
      </h2>
      <div className="container  t-shirtprinttextwidthfix ">
      <p className="mt-2 t-shirtprinttextfix" style={{ color: "#949494" }} >
        T-Shirt Printing for Everyone. Get a head start with free design
        templates you can customize in a few clicks
      </p>
      </div>
      <div className="jionour-team d-flex flex-column align-items-center mt-5 mb-5 ">
        {/* First Row */}
        <div className="d-flex justify-content-center flex-wrap gap-5 mb-4 pt-5">
          {[
            { name: "John Doe", role: "Designer", img: profileone },
            { name: "Jane Smith", role: "Developer", img: profiletwo },
            { name: "Michael Lee", role: "Marketing", img: profilethree },
            { name: "Sarah Brown", role: "Manager", img: profilefour },
            { name: "Chris Wilson", role: "HR", img: profilefive  },
            { name: "Emma Taylor", role: "UI/UX", img: profilesix },
            { name: "Daniel Martinez", role: "Finance", img: profilrseven },
            { name: "Olivia Anderson", role: "Support", img: profileeight },
            { name: "William Thomas", role: "SEO", img: profilenine },
            { name: "Sophia Harris", role: "Sales", img: profileten },
          ].map((member, index) => (
            <div
              key={index}
              className="profile-box text-center d-flex flex-column align-items-center justify-content-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={member.img} alt={member.name} className="profile-img" />
              {hoveredIndex === index ? (
                <div className="social-icons d-flex gap-4">
                  <FaFacebook />
                  <FaTwitter />
                  <FaInstagram />
                </div>
              ) : (
                <div className="info">
                  <h5>{member.name}</h5>
                  <p>{member.role}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="btn rounded-pill join-our-team pb-2">
          JOIN OUR TEAM
        </button>
      </div>

      <div className="enjoyupone p-5 " style={{ marginTop: "100px" }}>
        <div className="row ">
          <div className="col-lg-8 col-md-12 ms-7 enjoyup-text align-items-start  ">
            
            <h2
              className="heading-textenjoyup"
              style={{ textAlign: "left", marginTop: "0" }}
            >
              Enjoy up your vacations in
            </h2>
            
            
            <h2
              className="heading-textenjoyup"
              style={{ textAlign: "left", marginTop: "0" }}
            >
              the <span style={{ color: "white" }}>best T-shirts</span>
            </h2>
            <p  className="enjoyupmarginfix">
              T-shirts that keep you moving
              <div className="row d-flex justify-content-start mt-4 gap-2 gap-md-3">
  <div className="col-6 col-md-3 mt-2">
    <button
      className="btn btn-lg rounded-pill shopnow-btn responsive-btn w-100 py-2 px-4"
      onClick={buycheck}
    >
      SHOP NOW
    </button>
  </div>
  <div className="col-6 col-md-3 mt-2">
    <button
      className="btn btn-lg rounded-pill contactus-btn responsive-btn w-100 py-2 px-4"
      onClick={() => {
        window.scrollTo(0, 0);
        navigate('/contactus');
      }}
    >
      CONTACT US
    </button>
  </div>
</div>

            </p>
          </div>
          <div className="col-lg-4 col-12 playbuttonouterbox d-flex justify-content-start align-items-center">
            <img src={playbutton} alt="Play Button" className="playbutton" />
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

export default Aboutcontent;
