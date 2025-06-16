import React, { useRef, useState } from 'react';
import "./Shopcontent.css"
import HomeHeader from '../Layout/HomeHeader'
import aboutus from "../images/about-us1.png";
import bluef from "../images/blue-f.png"
import shopimage from "../images/shopimage.png"
import { useNavigate } from 'react-router-dom';
// import bluef from "../images/blue-f.png"
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css'; 
import './Profile.css'
import axios from 'axios';


import { Button, Checkbox, Form, Input } from 'antd';

const Shopcontent = () => {

  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [form] = Form.useForm();
  const [mobile, setMobile] = useState('');
  const [isMobileValid, setIsMobileValid] = useState(false);
  


  const handleMobileChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setMobile(onlyDigits);
    form.setFieldsValue({ mobile: onlyDigits });
  
    // Update validity state
    setIsMobileValid(onlyDigits.length === 10);
  };

  const sendOTP = async () => {
    console.log("sendOTP called");
    try {
      const response = await axios.post(
        'https://gts.tsitcloud.com/api/auth/send-customer-otp',
        { mobile }, // request body
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log("API response:", response.data);
  
      if (response.status === 200) {
        alert('OTP sent successfully');
      } else {
        alert(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        alert(error.response.data.message || 'Failed to send OTP');
      } else {
        console.error("Network or other error:", error.message);
        alert('An error occurred while sending OTP');
      }
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join(''); // Combine OTP digits into a single string
  
    try {
      const response = await axios.post(
        'https://gts.tsitcloud.com/api/auth/verify-customer-otp', // Replace with your actual URL
        {
          mobile,
          otp: otpCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log("Verify OTP response:", response.data);
  
      if (response.status === 200) {
        const token=response.data.token;
        const customer = response.data.customer;
        const customerId = customer?._id;

        console.log('Customer ID stored:', customerId);
        if(token){
          localStorage.setItem('authToken', token);

          console.log('Token stored:', token);
        }
        if (customerId) {
          localStorage.setItem('customerId', customerId);
          console.log('Customer ID stored:', customerId);
        }
        alert('OTP verified successfully');
        navigate('/product');
        // You can redirect or do next step here
      } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('customerId');
        alert(response.data.message || 'OTP verification failed');
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('customerId');
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert(error.response.data.message || 'OTP verification failed');
      } else {
        console.error("Request error:", error.message);
        alert('Network error while verifying OTP');
      }
    }
  };
  
  

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

 
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
  
      if (otp[index] === '') {
        // If current is empty, move focus back
        if (index > 0) {
          inputRefs.current[index - 1].focus();
          newOtp[index - 1] = '';
        }
      } else {
        // If current is not empty, just clear it
        newOtp[index] = '';
      }
  
      setOtp(newOtp);
    }
  };



  return (
    <>
<div>
    <HomeHeader />
</div>

<div className='login d-flex flex-column align-items-center text-white'>
      <div className='row d-flex align-items-center flex-column'>
        <div className='col-5'>
          <img src={bluef} className='shop-cenlogo' alt='logo' />
        </div>
        <div className='col-5 fw-bold fs-2'>
          LOGIN
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row d-flex align-items-center mt-1'>
          <div className='col-lg-6 d-flex flex-column border-right-dotted mobile-number-box'>
            <Form layout="vertical" style={{ width: '100%' }}
            requiredMark={false}>
              <Form.Item  label={<div className="form-label-center fs-5" style={{color:"white"}}>Mobile Number</div>}
              name="mobile" rules={[{ required: true, message: "Please enter your mobile number" }]}>
                <Input
                  type="text"
                  maxLength={10}
                  onChange={handleMobileChange}
                  className="mobilnumber-box rounded-5 custom-disabled-btn"
                  placeholder="Enter the number"
                />
              </Form.Item>
              <div className="mt-5">
                <Button
                  type="primary"
                  className=" mobilenumber-boxone rounded-5 py-lg-4 py-md-4 py-sm-2 custom-disabled-btn"
                  block
                  disabled={!isMobileValid}
                  onClick={sendOTP}
                >
                  SENT OTP
                </Button>
              </div>
            </Form>
          </div>

          <div className='col-lg-6 d-flex flex-column otp-verify-box'>
            <Form layout="vertical" style={{ width: '100%' }}>
              <Form.Item
               label={<div className="form-label-center fs-5" style={{color:"white"}}>Enter OTP</div>}
                name="otp"
                hasFeedback
                validateStatus={otp.join('').length === 6 ? '' : ''} // Validate OTP length for success or error
              >
               <div className="d-flex justify-content-center mt-2 otp-box">
  {[0, 1, 2, 3,4,5].map((_, index) => (
    <Input
      key={index}
      type="text"
      maxLength="1"
       style={{
    textAlign: 'center',
   
  }}
      className="otp-input"
      placeholder="*"
      value={otp[index]}
      onChange={(e) => handleInputChange(e, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      ref={(el) => (inputRefs.current[index] = el)}
    />
  ))}
</div>
              </Form.Item>

              

              <div className="mt-5">
                <Button
                  type="primary"
                  className=" mobilenumber-boxone rounded-5 fw-bold py-lg-4 py-md-4 py-sm-2 custom-disabled-btn"
                  block
                  onClick={handleSubmit}
                  disabled={otp.join('').length !== 6}
                >
                  SUBMIT
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5 fs-5 mb-5">
        You don't have an account?
        <Link to="/register" className="text-warning fw-semibold text-decoration-none">
          Register
        </Link>
      </div>
    </div>
    </>
  )
}

export default Shopcontent