import React,{ useState } from "react";
import HomeHeader from "../Layout/HomeHeader";
import "./Homecontent.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCircleArrowRight } from "react-icons/fa6";
import { SiAirbnb } from "react-icons/si";
import { TbBrandElastic } from "react-icons/tb";
import qualityshirt from "../images/Premium-Quality.png";
import secpayment from "../images/Secure-payment1.png";
import cussizestyle from "../images/Custom-SIze-STyle.png";
import shipworldwide from "../images/Shipping-worldwide.png";
import noordermin from "../images/No-order-minimum.png";
import highspeed from "../images/High-Speed-Service.png";
import freetemplate from "../images/Free-Templates.png";
import outstandquality from "../images/Outstanding-Quality1.png";
import grouptshirtone from "../images/grouptshirtone.png";
import grouptshirttwo from "../images/grouptshirttwo.png";
import grouptshirtthree from "../images/grouptshirtthree.png";
import grouptshirtfour from "../images//grouptshirtfour.png";
import grouptshirtfive from "../images/grouptshirtfive.png";
import groupimage from "../images/groupimagehome.png"
import worldwideshipping from "../images/worldwide shipping.png";
import returnicon from "../images/return icon.png";
import onlinesupport from "../images/3.png";
import flexiblepayment from "../images/flexible payment.png";
import { LiaCheckCircle } from "react-icons/lia";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import readystock from "../images/blue-rectangle.png"
import newdesign from "../images/blue-rect3.png"
import boyimage from "../images/boy-image.png"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../Layout/Footer'
import Rating from '../Layout/Rating'
import HowToOrder from "./HowToOrder";
import Swal from "sweetalert2";
import HowToOrderModal from "./HowToOrderModal";



const Homecontent = () => {
  
  const navigate = useNavigate();
  const [showHowToOrder, setShowHowToOrder] = useState(false);


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

  

  const settingsone = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div>
        <HomeHeader />
      </div>

      

      <div className="home-feed">
        <div className="createstyleflex">
          <div className="get-started">
            <h1 className="unique-style">
              <span
                className="heading-text"
                
              >
                Easy To Order{" "}
              </span>
              <ReactTyped
                className="heading-text"
                strings={["Door Step Delivery"]}
                style={{
                  color: "#007fff",
                }}
                typeSpeed={100} // Speed of typing
                backSpeed={50} // Speed of deleting
                loop
              />
            </h1>

            <p className="print-shirt">
              For all your Bulk Customized T-Shirt Requirments 
            </p>
            
  <button className="start-btd fs-5" onClick={buycheck}>Order Now</button>
  
            
          </div>
          
  
        </div>

        <div className="d-flex gap-3 mt-1 mb-5 button-flex">
          <button
  className="btn btn-primary px-4 py-2 fs-5 rounded-pill shadow-sm fw-semibold hover-scale"
  onClick={() => setShowHowToOrder(true)}
>
  <i className="bi bi-info-circle me-2"></i> How to Order
</button>

        </div>

      <Slider   {...settingsone}>
  <div>
    <img src={grouptshirtone} alt="Group T-shirt 1" className="slider-image" />
  </div>
  <div>
    <img src={grouptshirttwo} alt="Group T-shirt 2" className="slider-image" />
  </div>
  <div>
    <img src={grouptshirtthree} alt="Group T-shirt 3" className="slider-image" />
  </div>
  <div>
    <img src={grouptshirtfour} alt="Group T-shirt 4" className="slider-image" />
  </div>
  <div>
    <img src={grouptshirtfive} alt="Group T-shirt 5" className="slider-image" />
  </div>
</Slider>


    


      </div>



      <div className="offset-text">
        <marquee className="marqueetext"
          
        >
          OFFSET PRINTING <span style={{ color: "blue" }}>*</span> WELCOME TO
          GROUPTSHIRT <span style={{ color: "blue" }}>*</span> DESIGN YOUR OWN
        </marquee>
      </div>





      <div className="design-box container ">
        <div className="row  ">
          <div className="  col-lg-6  col-md-12 ps-2  design-text d-flex flex-column justify-content text-start">
           
            <h1 className="heading-text m-0 mt-lg-5 mt-4">Create Stunning Print</h1>

            <h1 className="m-0 text-start">
              <span className="heading-text">for </span>
              <span className="heading-text-two" style={{ margin: "0px" ,color:'#007fff' }}>
              
                Your Business
              </span>
            </h1>
            <p
              className=" mt-5 fs-lg-4  mb-0 mobile-text "
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
              className="text-secondary mt-5 mb-2 "
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
            {/* <button className="start-btd-new mt-3  fs-5" onClick={buycheck}>GET STARTED</button> */}
          </div>

          <div className=" col-lg-6 col-md-12   justify-content-end position-relative hide-on-768 ">
            <img src={groupimage} alt="groupone" className="image" />
          </div>
        </div>
      </div>





      
      <div className="container-fluid p-0">
        <div className="offer-box  d-flex row w-100 py-5 px-lg-0 px-5 justify-content-center m-0 " >


          <div className="col-lg-6 p-lg-0 ">
            <div className="shopnow d-flex flex-wrap justify-content-center position-relative">
              <div className="shopnow-one text-center col-md-6 col-12 d-flex flex-column justify-content-center align-items-center" >
                <h1 className="text-white fw-bold m-0 shopnowpercentage h3">Last Minute</h1>
                <h1 className="text-white fw-bold m-0 shopnowpercentage h3">Need?</h1>
                <p className="text-white m-0 shopnowparatext">Choose from our</p>
                <p className="text-white m-0 shopnowparatext fw-bold">Ready Stock</p>
                <button
                  className="start-btd-1 mt-lg-4 mt-1 mb-4"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/stock');
                  }}
                >
                  SHOP NOW
                </button>
              </div>


              <div className="col-md-6 col-12 d-flex justify-content-center readyimages">
                <img className="shopnow-image" src={readystock} alt="logo" />
              </div>
            </div>
          </div>


          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center">
            <div className="explore row d-flex align-items-center justify-content-center position-relative">
              <div className="col-6 readyimages">
                <img className="explore-image" src={newdesign} alt="logo" />
              </div>
              <div className="explore-gapfix col-12 col-md-6 text-center d-flex flex-column align-items-center">
                <h1 className="text-white fw-bold m-0 shopnowpercentage h3">Want a different</h1>
                <h1 className="text-white fw-bold m-0 shopnowpercentage h3">design</h1>
                <p className="text-white m-0 shopnowparatext">Upload design of</p>
                <p className="text-white m-0 shopnowparatext">your choice</p>
                <button
                  className="start-btd-1 mt-lg-4 mt-1 mb-4"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/newdesign');
                  }}
                >
                  EXPLORE
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>










      <div className="container d-flex align-items-center justify-content-center">
      <div className="w-75 allfeaturestext" >
        {/* <text  className="offerboxparatext " style={{ color: "#a2a2a2" }}>
          All the features you need
        </text> */}
        <h1
          className="heading-textfontfix"
          
        >
          What Makes <span style={{ color: "#007fff" }}>GroupTshirt</span>
        </h1>
        <h1 className="heading-textfontfix " style={{ margin: "0",marginBottom:"10px" }}>
          <span style={{ color: "#eeae0c" }}>Different</span>
        </h1>
        <text className="offerboxparatext offertext-fix" style={{ color: "#a2a2a2"}}>
          Get a head start with free design
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
            <div className="box col-lg-3 col-12 ">
              <div className="box-innersize mt-lg-0 mt-sm-2">
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
        {/* <div className="we-work-box">
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
      </div> */}
     
      </div>


       {/* <HowToOrder /> */}
      <Rating></Rating>

      <div className="mailbox  mt-4">
        <div className="mailbox-divider container-fluid d-flex justify-content-center ">
          <div className="row  mailbox-widthfix   ps-md-1 ps-4">

            <div className="text-divider col-lg-6 d-flex flex-column align-items-start justify-content-center mb-4">
              <h1
                className="heading-text  mt-4 text-white ms-lg-0 "
               
              >
                Don't Miss Out
              </h1>
              <h1
                className="heading-text ms-lg-0 "
                style={{
                  marginTop: "0",
                  marginBottom: "0px",
                  
                }}
              >
                <span style={{ color: "white"}}>On </span>
                <span style={{ color: "#007fff"}}>
                  Special Offer
                </span>
              </h1>
              <p className="register-text ms-0 mt-2 text-start  ">
                Register to receive news about the latest, savings combos,
                discount codes...
              </p>
              <div className="combos-divider">
                <div className="combos">01</div>
                <text  className="savingscombostext">
                  Savings combos
                </text>
              </div>
              <div className="combos-divider">
                <div className="combos">02</div>
                <text  className="savingscombostext">
                  Savings combos
                </text>
              </div>
              <div className="combos-divider">
                <div className="combos">03</div>
                <text  className="savingscombostext">
                  Savings combos
                </text>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="mailbox-mailinput p-3"
                  
                />
                <FaCircleArrowRight
                className="mailbox-arrow"
                  
                />
              </div>
            </div>

            <div className="col-12 col-lg-6 position-relative">
                          <div className=" d-flex justify-content-center align-items-end mt-3  image-bottomfix ">
                            <img
                              src={boyimage}
                              
                              alt="About Us"
                              className="letstalkimageone position-absolute"
                            />
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
        <div className="toolsbox mt-5">
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
      <div className="shipping container-fluid mt-3">
        <div class="row shippingrow  py-5 justify-content-center text-center">
          
          <div className="shippingdivider col-lg-3 d-flex flex-column align-items-center">
            <img
            className="shippingimagefix"
              src={worldwideshipping}
              alt="worldwide shipping"
            ></img>

            <text 
            className="shippingtextfix"
              
            >
              Worldwide shipping
            </text>
            <text className="shippingtextfixone">Get free shipping over $65.</text>
          </div>
          <div className="shippingdivider col-lg-3 d-flex flex-column align-items-center">
            <img
              src={returnicon}
              alt="return icon"
              className="shippingimagefix"
            ></img>
            <text
              className="shippingtextfix"
            >
              Returns
            </text>
            <text className="shippingtextfixone">Within 30 days for an exchange</text>
          </div>
          <div className="shippingdivider col-lg-3 d-flex flex-column align-items-center">
            <img
              src={onlinesupport}
              alt="online support"
              className="shippingimagefix"
            ></img>

            <text
             className="shippingtextfix"
            >
              Online Support
            </text>
            <text className="shippingtextfixone">Top notch customer service.</text>
          </div>
          <div className="shippingdivider col-lg-3 d-flex flex-column align-items-center">
            <img
              src={flexiblepayment}
              alt="flexible payment"
              className="shippingimagefix"
            ></img>
            <text
              className="shippingtextfix"
            >
              Flexible Payment 
            </text>
            <text className="shippingtextfixone">Pay with Multiple Credit Cards </text>
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

      <HowToOrderModal
  show={showHowToOrder}
  handleClose={() => setShowHowToOrder(false)}
/>

    </>
  );
};

export default Homecontent;
