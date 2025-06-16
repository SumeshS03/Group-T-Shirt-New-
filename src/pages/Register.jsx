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
import { Button, Form, Input, Radio } from 'antd';
import "./Register.css"
import axios from 'axios';







const Register = () => {
    const [form] = Form.useForm();
const [formLayout, setFormLayout] = useState('horizontal');
const [isFormValid, setIsFormValid] = useState(false);

const handleSubmit = async (values)=>{
    const formData = {
        name: values.name,
        mobile: values.mobile,
        email: values.email,
        address: values.address,
      };
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTA1ZjNmOTc3Mzc1ODkzNzFkODI5YSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NjQzODQ0NSwiZXhwIjoxNzQ2NTI0ODQ1fQ.EzmLAyGFaueiZgk1BQkPGdfMH0MsFqkLV8Quf1FKjT0";
      try {
        const response = await axios.post('https://gts.tsitcloud.com/api/customers/register', formData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
        );
        const resData = response.data;
        if (response.status === 200) {
          if (resData.message === "Already Registered") {
            alert("Already registered");
          } else {
            alert("Register successful");
          }
        } else {
          alert(resData.message || "Register successful");
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred while submitting data.");
        }
        console.error('Error submitting data:', error);
      }

};

// const handleSubmit = () => {
//     const formData = form.getFieldsValue(); // Get form data
//     console.log('Form Data:', formData); // Log form data to the console
//   };

  const handleFieldsChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some((field) => field.errors.length > 0);

    const hasEmpty = !form.isFieldsTouched(true) || form.getFieldsValue(true) === undefined;

    setIsFormValid(!hasErrors && !hasEmpty);
  };
  return (
   <>
   <div>
    <HomeHeader />
</div>
<div className="login d-flex flex-column align-items-center text-white ">
<Form
  layout="vertical"
  requiredMark={false}
  form={form}
  onValuesChange={handleFieldsChange}
  onFinish={handleSubmit}
  style={{ maxWidth: formLayout === 'inline' ? 'none' : 400, width: '100%' }}
  className="custom-form w-lg-100 w-75"
>
  <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
    <Input placeholder="Enter your name"
    className='py-2'
    onChange={(e) => {
        const value = e.target.value;
        const lettersOnly = value.replace(/[^a-zA-Z\s]/g, ""); // allows letters and spaces
        form.setFieldsValue({ name: lettersOnly });
      }} />
  </Form.Item>

  <Form.Item label="Mobile Number" name="mobile" rules={[
    { required: true, message: "Please enter your mobile number" },
    {
      pattern: /^[0-9]{10}$/,
      message: "Mobile number must be exactly 10 digits",
    },
  ]}>
    <Input placeholder="Enter Mobile Number" 
    className='py-2'
    maxLength={10}
    onChange={(e) => {
        const onlyDigits = e.target.value.replace(/\D/g, ""); // remove non-digit characters
        form.setFieldsValue({ mobile: onlyDigits });
      }}/>
  </Form.Item>

  <Form.Item label="E-mail" name="email" rules={[
    { required: true, message: "Please enter your email address" },
    {
      type: "email",
      message: "Please enter a valid email address",
    },
  ]}>
    <Input placeholder="Enter E-mail"
    className='py-2' />
  </Form.Item>

  <Form.Item label="Address"  name="address" rules={[
    { required: true, message: "Please enter your address" },
    {
      min: 10,
      message: "Address should be at least 10 characters long",
    },
  ]}>
    <textarea className='w-100 py-2 rounded-2' placeholder="Enter Address" />
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit" className='mt-4 custom-disabled-button' disabled={!isFormValid} >
      Submit
    </Button>
  </Form.Item>
</Form>
<div className='row justify-content-center mt-lg-1 mt-4 responsive-text'>
You already have a account?
  <Link to="/profile" className="text-warning fw-semibold text-decoration-none mb-5">
    Login here.
  </Link>
</div>

    </div>
 </>
  )
}

export default Register