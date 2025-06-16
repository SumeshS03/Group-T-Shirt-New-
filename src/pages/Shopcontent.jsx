import React, { useRef, useState } from 'react';
import "./Shopcontent.css"
import HomeHeader from '../Layout/HomeHeader'
import aboutus from "../images/about-us1.png";
import bluef from "../images/blue-f.png"
import shopimage from "../images/shopimage.png"
import { useNavigate } from 'react-router-dom';
// import bluef from "../images/blue-f.png"
import { Link } from 'react-router-dom';


const Shopcontent = () => {

  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [mobileError, setMobileError] = useState("");
  const [otpSentMessage, setOtpSentMessage] = useState("");

  // const handleInputChange = (e, index) => {
  //   const value = e.target.value;

  //   if (!/^[0-9]?$/.test(value)) return; 

  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);

  //   if (value && index < inputRefs.current.length - 1) {
  //     inputRefs.current[index + 1].focus();
  //   }
  // };

  // const handleSubmit = () => {
  //   const enteredOtp = otp.join('');
  
  //   if (enteredOtp.length < 4) {
  //     setShowAlert(true);
  //     setAlertMessage('Please enter OTP'); 
  //     setTimeout(() => setShowAlert(false), 3000);
  //     return;
  //   }
  
  //   if (enteredOtp === '1234') {
  //     navigate('/product');
  //   } else {
  //     setShowAlert(true);
  //     setAlertMessage('Re-enter your OTP');
  //     setTimeout(() => setShowAlert(false), 3000);
  //   }
  // };

  // const handleKeyDown = (e, index) => {
  //   if (e.key === 'Backspace') {
  //     const newOtp = [...otp];
  
  //     if (otp[index] === '') {
  //       // If current is empty, move focus back
  //       if (index > 0) {
  //         inputRefs.current[index - 1].focus();
  //         newOtp[index - 1] = '';
  //       }
  //     } else {
  //       // If current is not empty, just clear it
  //       newOtp[index] = '';
  //     }
  
  //     setOtp(newOtp);
  //   }
  // };

  
  const [mobile, setMobile] = useState("");
  
 
  const [otpSent, setOtpSent] = useState(false);
  

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);

    // Validate mobile number (ensure it's a 10-digit number)
    if (value.length < 10) {
      setMobileError("Mobile number must be 10 digits.");
      setOtpSentMessage("");
    } else if (!/^[0-9]+$/.test(value)) {
      setMobileError("Mobile number must contain only digits.");
      setOtpSentMessage("");
    } else {
      setMobileError(""); // Clear error if valid
      if (value.length === 10) {
        setOtpSentMessage("OTP has been sent to your mobile number.");
      }
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  

  const handleSendOtp = () => {
    if (!mobileError && mobile.length === 10) {
      setOtpSentMessage("OTP has been sent to your mobile number.");
    } else {
      setOtpSentMessage(""); // Clear message if not valid
    }
  };
  const handleSubmit = () => {
    if (otpSent) {
      if (otp.join("").length === 4) {
        setAlertMessage("OTP verified successfully!");
        setShowAlert(true);
      } else {
        setAlertMessage("Please enter a valid OTP.");
        setShowAlert(true);
      }
    }
  };
  const validateMobile = () => {
    // Validate that mobile number is exactly 10 digits
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key !== "Backspace" && otp[index] && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };



  return (
    <>
<div>
    <HomeHeader />
</div>

      {/* <div className='login d-flex flex-column  align-items-center text-white  '>
        <div className='row d-flex align-items-center flex-column'>
          <div className='col-5' >
          <img src={bluef} className='shop-cenlogo' alt='logo'></img>
          </div>
          <div className='col-5 fw-bold fs-2'>
            LOGIN
          </div>
        
        </div>
        <div className='container-fluid'>
        <div className='row d-flex align-items-center mt-1  '>
          <div className='col-lg-6  d-flex flex-column border-right-dotted mobile-number-box  '>
            <div>
            <label className='form-label shopotp-text' >Mobile Number</label>
            <input
    type='text'
    id='mobile'
    className='mobilnumber-box rounded-5'
    placeholder='Enter the number'
  />
  </div>
  <div className='mt-5'>
            
           <button className=' btn btn-primary mobilnumber-box rounded-5 fw-bold' >SENT OTP</button>
  </div>
          </div>
          <div className='col-lg-6 d-flex flex-column otp-verify-box   '>
            <div>
            <label className='form-label shopotp-text' >Enter OTP</label>
            <div className='d-flex  justify-content-center mt-2 otp-box'>
            {[0, 1, 2, 3].map((_, index) => (
    <input
      key={index}
      type='text'
      maxLength='1'
      className='otp-input'
      placeholder='*'
      value={otp[index]} // make sure input is controlled
  onChange={(e) => handleInputChange(e, index)}
  onKeyDown={(e) => handleKeyDown(e, index)}
  ref={(el) => (inputRefs.current[index] = el)}
    />
  ))}
  </div>
  {showAlert && (
  <div className='custom-alert mt-3'>
    {alertMessage}
  </div>
)}
  </div>
  <div className='mt-5'>
            
            <button className=' btn btn-primary mobilnumber-box rounded-5 fw-bold' onClick={handleSubmit} >SUBMIT</button>
   </div>
          </div>
        </div>
        </div>
          
      </div> */}
       <div className="login d-flex flex-column align-items-center text-white">
      <div className="row d-flex align-items-center flex-column">
        <div className="col-5">
          <img src={bluef} className="shop-cenlogo" alt="logo" />
        </div>
        <div className="col-5 fw-bold fs-2">LOGIN</div>
      </div>
      <div className="container-fluid">
        <div className="row d-flex align-items-center mt-1">
          {/* Mobile Number Input */}
          <div className="col-lg-6 d-flex flex-column border-right-dotted mobile-number-box">
  <div>
    <label className="form-label shopotp-text">Mobile Number</label>
    <input
      type="text"
      id="mobile"
      className="mobilnumber-box rounded-5"
      placeholder="Enter the number"
      value={mobile}
      onChange={handleMobileChange}
      maxLength={10}
    />
  </div>

  {/* Show error message below input */}
  {mobileError && <div className="text-danger mt-2">{mobileError}</div>}

  <div className="mt-5">
    <button
      className="btn btn-primary mobilnumber-box rounded-5 fw-bold"
      onClick={handleSendOtp}
      
    >
      SEND OTP
    </button>
  </div>

  {/* ✅ Show OTP Sent Message in Green below the button */}
  {!mobileError && otpSentMessage && (
    <div className="text-success mt-2 fw-semibold">{otpSentMessage}</div>
  )}
</div>


          {/* OTP Verification */}
          <div className="col-lg-6 d-flex flex-column otp-verify-box">
            <div>
              <label className="form-label shopotp-text">Enter OTP</label>
              <div className="d-flex justify-content-center mt-2 otp-box">
                {[0, 1, 2, 3].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    placeholder="*"
                    value={otp[index]}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
            </div>
            {showAlert && (
              <div className="custom-alert mt-3">{alertMessage}</div>
            )}
            <div className="mt-5">
              <button
                className="btn btn-primary mobilnumber-box rounded-5 fw-bold"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        <div className='row justify-content-center mt-5 fs-5'>
  You don't have an account?
  <Link to="/register" className="text-warning fw-semibold text-decoration-none">
    Register
  </Link>
</div>
      </div>
      

    </div>
    
    </>
  )
}

export default Shopcontent