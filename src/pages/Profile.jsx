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
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

const { Title } = Typography;

const Shopcontent = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [mobile, setMobile] = useState('');
  const [isMobileValid, setIsMobileValid] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


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
       setSuccess("OTP Sent Successfully ✅");
        setError(""); // clear error
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.data.message || "Failed to send OTP ❌");
        setSuccess("");
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.response?.data?.message || "An error occurred while sending OTP ❌");
      setSuccess("");
      setTimeout(() => setError(""), 3000);
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

        if (token) localStorage.setItem("authToken", token);
        if (customerId) localStorage.setItem("customerId", customerId);
        if (customer) localStorage.setItem("customer", JSON.stringify(customer));

        // ✅ Show success alert
        setSuccess("OTP verified successfully ✅");
        setError("");
        setTimeout(() => {
          setSuccess("");
          navigate("/product"); // redirect after alert
        }, 2000);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("customerId");

        // ❌ Show error alert
        setError(response.data.message || "OTP verification failed ❌");
        setSuccess("");
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("customerId");
      console.error("OTP verification error:", error);

      // ❌ Show network error alert
      setError(error.response?.data?.message || "Network error while verifying OTP ❌");
      setSuccess("");
      setTimeout(() => setError(""), 3000);
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
      {/* ✅ Alert fixed at the top */}
      {/* ✅ Alerts fixed at the top */}
      {success && (
        <div
          style={{
            position: "fixed",
            top: 50,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            width: "90%",
            maxWidth: "600px",
          }}
        >
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {success}
          </Alert>
        </div>
      )}
      {error && (
        <div
          style={{
            position: "fixed",
            top: 50,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            width: "90%",
            maxWidth: "600px",
          }}
        >
          <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
            {error}
          </Alert>
        </div>
      )}
      </div>
    </>
  );
};

export default Shopcontent;
