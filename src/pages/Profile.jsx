import React, { useState } from 'react';
import "./Shopcontent.css";
import HomeHeader from '../Layout/HomeHeader';
import bluef from "../images/blue-f.png";
import { useNavigate, Link } from 'react-router-dom';
import 'antd/dist/reset.css';
import './Profile.css';
import axios from 'axios';
import { Button, Form, Input, Typography } from 'antd';
import Swal from 'sweetalert2';

const { Title } = Typography;

const Shopcontent = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [mobile, setMobile] = useState('');
  const [isMobileValid, setIsMobileValid] = useState(false);
  const navigate = useNavigate();

  const handleMobileChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setMobile(onlyDigits);
    form.setFieldsValue({ mobile: onlyDigits });
    setIsMobileValid(onlyDigits.length === 10);
  };


  //sent otp api

  const sendOTP = async () => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
   
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/auth/send-customer-otp`,
        { mobile },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "'OTP sent successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message || 'Failed to send OTP',
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || 'An error occurred while sending OTP',
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    finally {
    setLoading(false); // re-enable button after request finishes
  }
  };

  const handleSubmit = async () => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/verify-customer-otp`,
        {
          mobile,
          otp,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        const { token, customer } = response.data;
        const customerId = customer?._id;
        // console.log("customer detail:", response.data);

        if (token) localStorage.setItem('authToken', token);
        if (customerId) localStorage.setItem('customerId', customerId);
        if (customer) localStorage.setItem('customer', JSON.stringify(customer));

        Swal.fire({
          title: "Success",
          text: "OTP verified successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate('/product');
      } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('customerId');
        Swal.fire({
          title: "Error",
          text: response.data.message || 'OTP verification failed',
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('customerId');
      console.error("OTP verification error:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || 'Network error while verifying OTP',
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  return (
    <>
      <HomeHeader />

      <div className='login d-flex flex-column align-items-center text-white'>
        <div className='row d-flex align-items-center flex-column'>
          <div className='col-5'>
            <img src={bluef} className='shop-cenlogo' alt='logo' />
          </div>
          <div className='col-5 fw-bold fs-2'>LOGIN</div>
        </div>

        <div className='container-fluid'>
          <div className="row align-items-stretch mt-1">

  {/* Mobile Input */}
  <div className="col-lg-6 d-flex flex-column border-right-dotted mobile-number-box h-100">
    <Form layout="vertical" requiredMark={false} className="h-100 d-flex flex-column justify-content-between">
      <Form.Item
        label={<div className="form-label-center fs-5" style={{ color: "white" }}>Mobile Number</div>}
        name="mobile"
        rules={[{ required: true, message: "Please enter your mobile number" }]}
      >
        <Input
          type="text"
          maxLength={10}
          onChange={handleMobileChange}
          className="mobilnumber-box py-lg-3 py-md-3 py-sm-1 rounded-5 custom-disabled-btn"
          placeholder="Enter the number"
        />
      </Form.Item>
      <div className="mt-5">
        <Button
          type="primary"
          className="mobilenumber-boxone rounded-5 py-lg-4 py-md-4 py-sm-2 custom-disabled-btn"
          block
          disabled={!isMobileValid || loading}
          onClick={sendOTP}
        >
        {loading ? "Sending..." : "SEND OTP"}
        </Button>
      </div>
    </Form>
  </div>

  {/* OTP Input */}
  <div className="col-lg-6 d-flex flex-column otp-verify-box h-100">
    <Form
  layout="vertical"
  requiredMark={false}
  className="h-100 d-flex flex-column justify-content-between"
>
  <Form.Item
    label={
      <div className="form-label-center fs-5" style={{ color: "white" }}>
        Enter OTP
      </div>
    }
    name="otp"
  >
    <Input.OTP
      length={6}
      formatter={(str) => str.toUpperCase()}
      onChange={handleOtpChange}
      value={otp}
      className="otp-box"
    />
  </Form.Item>

  <div className="mt-5">
    <Button
      type="primary"
      className="mobilenumber-boxone rounded-5 fw-bold py-lg-4 py-md-4 py-sm-2 custom-disabled-btn"
      block
      
      onClick={handleSubmit}
      disabled={otp.length !== 6 }
    >
      SUBMIT
    </Button>
  </div>
</Form>

  </div>
</div>

        </div>

        {/* Register Link */}
        <div className="row justify-content-center mt-5 fs-5 mb-5">
          You don't have an account?
          <Link to="/register" className="text-warning fw-semibold text-decoration-none">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Shopcontent;
