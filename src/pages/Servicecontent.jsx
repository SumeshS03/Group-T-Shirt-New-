import HomeHeader from "../Layout/HomeHeader";
import "./Servicecontent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import qualityshirt from "../images/Premium-Quality.png";
import outstandquality from "../images/Outstanding-Quality1.png";
import secpayment from "../images/Secure-payment1.png";
import cussizestyle from "../images/Custom-SIze-STyle.png";
import menstshirt from "../images/menst-shirt.jpg";
import serviceimage from "../images/serviceimage.png"
import Footer from '../Layout/Footer'
import servicepagepick from "../images/Service-page2.png"
import servicepageartwork from "../images/Service-page3.png"
import servicepageship from "../images/Service-page4.png"
import glow from "../images/Service-page-8.png"
import leaf from "../images/service-page9.png"
import fastshipping from "../images/fastshipping.png"
import customerhappy from "../images/customerhappy.png"
import videoimage from "../images/service-page1.png"
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import Slider from "react-slick";
import { MdArrowRightAlt } from "react-icons/md";
import Swal from "sweetalert2";


const Servicecontent = () => {

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "2.5%", // This gives space between slides (5% total gap)
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        centerPadding: "5%",
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        centerPadding: "10%",
      },
    },
  ],
};

const navigate = useNavigate();
  const buycheck = () =>{
    const token = localStorage.getItem('authToken');
    window.scrollTo(0,0);
    if (token) {
      // User is authenticated
     
      navigate(`/product`);
    }
    else{
      Swal.fire("Please login to start shopping.");
      navigate('/profile');

    }

  };
  const newcheck = () =>{
    window.scrollTo(0,0);
    navigate(`/newdesign`);
  }

  return (
    
    <>
      <div>
        <HomeHeader />
      </div>
      <div className="about-box d-flex  h-50 flex-column align-items-center">
        <div className="first-background p-5 bg-primary mb-4 d-flex text-white ">
          <h1 className="mt-4 aboutustext">SERVICE</h1>
        </div>
        <p
          className=" w-50  home-contactustext "
          style={{ textAlign: "start", marginLeft: "-23%" }}
        >
          Home - Service
        </p>
        <img src={serviceimage} alt="serviceimage" className="imagetopthree"></img>
      </div>
      <p style={{ marginBottom: "0", color: "#949494", marginTop: "70px" }}>
        ALL THE FEATURES YOU NEED{" "}
      </p>
      <h2
        className="heading-text"
        style={{ textAlign: "center", marginTop: "0" }}
      >
        Fast and <span style={{ color: "#007fff" }}>Quality service</span>
      </h2>
      <div className="container">
      <p className="tshirtprintingeveryone" style={{ color: "#949494" }}>
        T-Shirt Printing for Everyone. Get a head start wiyh free design
        templates you can customize in a few clicks
      </p>
      </div>

      <div className="quality-box">
              <div className="servicesbox">

              
                <div className=" custom-row row justify-content-between gx-0 gy-4">
                  <div className="box col-lg-3 col-12  ">
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
                  <div className="box col-lg-3 col-12  ">
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
                  <div className="box col-lg-3 col-12 ">
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
                
                
              </div>
              
              
            </div>
      


<div className="container-fluid browse-all py-5 mt-5 d-flex flex-column align-items-center">
<div className="row w-100 serviceprofilemarginfix ">
    <div className="col-12 text-center">
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
        <h2
          className="photoboxheader mb-0"
          style={{ fontFamily: "bevan", color: "#eeae0c" }}
        >
          <span>T-shirt printing </span>
          <span style={{ color: "blue" }}>made easy.</span>
        </h2>
        <button className="btn rounded-pill browse-btn mt-lg-3 mt-0 px-4 py-2  fs-6 fs-md-5" onClick={buycheck}>
  Browse all
</button>

      </div>
    </div>
  </div>

  <div className="row w-100 mt-3">
    <div className="col-12 text-center">
      <p className="tshirtprintingeverytwo" style={{ color: "white" }}>
        Let us show you how your product comes to life
      </p>
    </div>
  </div>
 <div className="container serviseprofile-slick">
   <Slider {...settings}>
  <div className="slide-boxone">
    <div className="slide-box">
      <img src={menstshirt} alt="Profile 1" className="slide-image" />
      <p className="slide-text">
       Web Developer <MdArrowRightAlt className="arrow-icon" />
        </p>
    </div>
  </div>
  <div className="slide-boxone">
    <div className="slide-box">
      <img src={menstshirt} alt="Profile 2" className="slide-image" />
      <p className="slide-text">
  Web Developer <MdArrowRightAlt className="arrow-icon" />
</p>
    </div>
  </div>
  <div className="slide-boxone">
    <div className="slide-box">
      <img src={menstshirt} alt="Profile 3" className="slide-image" />
      <p className="slide-text">
        Web Developer <MdArrowRightAlt className="arrow-icon" />
        </p>
    </div>
  </div>
  <div className="slide-boxone">
    <div className="slide-box">
      <img src={menstshirt} alt="Profile 4" className="slide-image" />
      <p className="slide-text">
        Web Developer <MdArrowRightAlt className="arrow-icon" />
        </p>
    </div>
  </div>
  <div className="slide-boxone">
    <div className="slide-box">
      <img src={menstshirt} alt="Profile 5" className="slide-image" />
      <p className="slide-text">
        Web Developer <MdArrowRightAlt className="arrow-icon" />
        </p>
    </div>
  </div>
</Slider>

</div>



</div>

      




      <div className="container  graphic-design">
      <div className=" row verifyimageboxone mt-5 ">
        <div className="col-lg-6 text-center position-relative">
        <div className="verify-photo-box  ">
                <img
                  src={require("../images/Girl-image.png")}
                  alt="logo"
                  className=" verify-photo-servicee "
                />
              </div>
            </div>
        <div className="verify-photo-textone col-lg-6 ">
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <h2 className="heading-textprint ms-3 ">
              We create your prints and
            </h2>
            <h2 className="heading-textprint ms-3" style={{ color: "#015dc0" }}>
              get them where they have to go
            </h2>
          </div>


          <div className="d-flex align-item-center justify-content-center">
          <div className="accordion mt-4" id="accordionExample">
          
            <div className="accordion-item mb-2 ">
              <h1 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button custom-accordion-button rounded-pill"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  style={{ fontSize: "1.4rem" }}
                >
                  Graphic Design Service
                </button>
              </h1>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body text-start">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy
                </div>
              </div>
            </div>

            {/* Accordion Item #2 */}
            <div className="accordion-item mb-2">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed custom-accordion-button rounded-pill"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ fontSize: "1.4rem" }}
                >
                  Premium Branding Options
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body text-start">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy
                </div>
              </div>
            </div>

            {/* Accordion Item #3 */}
            <div className="accordion-item mb-2">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed custom-accordion-button rounded-pill"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  style={{ fontSize: "1.4rem" }}
                >
                  Printing Services
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body text-start">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy
                </div>
              </div>
            </div>

            {/* Accordion Item #4 */}
            <div className="accordion-item mb-2 ">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed custom-accordion-button rounded-pill"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                  style={{ fontSize: "1.4rem" }}
                >
                  POD For Online Stores
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body text-start">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      </div>
      <div className="mt-5 mb-5">
      <h2
        className="mt-5"
        style={{ margin: "0px", fontFamily: "bevan", color: "#eeae0c" }}
      >
        <span className="mb-2">How </span>
        <span className="mb-2" style={{ margin: "0px", color: "blue" }}> It Work</span>
      </h2>
      <div className="container textwidthfixser">
      <p className="my-0 mt-2 worktextser">
        Lorem ipsum dhitecto dolor nihilliquam saepe facere neque odit! Delectus
        provident necessitatibus molestiae eius nihil earum minima dolorem.Lorem ipsum dhitecto dolor nihilliqram minima dolorem.
      </p>
      
      </div>
      </div>

      <div className=" bg-white  d-flex justify-content-center align-items-center ">
        
        <div className="row justify-content-center custom-artwork mt-5 rounded-fill ">
          <div className="col-12 rounded-fill custom-artworkone d-flex flex-column justify-content-center align-items-center position-relative ">
          <div className="row justify-content-center">
          
      <div className="w-20 start-50 video-box ">
              <img className="videoimage rounded-4" alt="videoimage" src={videoimage}></img>
            </div>
            
            </div>
            <div className="container py-5">
            <div className=" d-flex row  justify-center  shipit-you profilecustomart items-center">
              {/* Profile 1 */}
              <div className=" p-3  text-center flex-1  item-center col-lg-4 col-md-12">
              <div className="d-flex justify-content-center align-items-center w-100">
              <div className=" bg-white outterimage-border d-flex justify-content-center align-items-center ">
                  <img
                    className="rounded-full designerprofile "
                    src={servicepagepick}
                    alt="Profile 1"
                  />
                </div>
                </div>
                <div className="w-55">
                <h2 className=" font-semibold pickproductheadtext mb-0" >PICK A PRODUCT</h2>
                <p className="  my-0 pickproducttext " >PRINTED ON 100% QUALITY COTTON FOR A </p>
                <p className="pickproducttext">VIBRANT FINISH AND ALL - DAY COMFORT</p>
                </div>
              </div>

              {/* Profile 2 */}
              <div className=" p-3  text-center flex-1 item-center col-lg-4 col-md-12">
              <div className="d-flex justify-content-center align-items-center w-100">
              <div className=" bg-white outterimage-border d-flex justify-content-center align-items-center ">
                  <img
                    className="rounded-full designerprofile "
                    src={servicepageartwork}
                    alt="Profile 1"
                  />
                </div>
                </div>
                <div className="w-55">
                <h2 className="text-xl font-semibold pickproductheadtext mb-0 ">CUSTOM ARTWORK</h2>
                <p className=" my-0 pickproducttext " style={{color:"#6b6b6b"}}>PRINTED ON 100% QUALITY COTTON FOR A </p>
                <p className="pickproducttext">VIBRANT FINISH AND ALL - DAY COMFORT</p>
                </div>
              </div>

              {/* Profile 3 */}
              <div className=" p-3  text-center flex-1 item-center col-lg-4 col-md-12">
                <div className="d-flex justify-content-center align-items-center w-100">
              <div className=" bg-white outterimage-border d-flex justify-content-center align-items-center ">
                  <img
                    className="rounded-full designerprofile "
                    src={servicepageship}
                    alt="Profile 1"
                  />
                </div>
                </div>
                <div className="w-55">
                <h2 className="text-xl font-semibold pickproductheadtext mb-0">SHIP IT FOR YOU</h2>
                <p className="my-0 pickproducttext" style={{color:"#6b6b6b"}}>PRINTED ON 100% QUALITY COTTON FOR A </p>
                <p className="pickproducttext">VIBRANT FINISH AND ALL - DAY COMFORT</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className="enjoyup p-5 ">
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

export default Servicecontent;
