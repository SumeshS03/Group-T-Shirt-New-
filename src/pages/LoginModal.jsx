import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { sentOtp, verifyotp } from "../ApiFunctions/userlogin";

const LoginModal = ({ show, handleClose }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // ✅ Clear inputs helper
  const resetForm = () => {
    setMobile("");
    setOtp("");
    setOtpSent(false);
  };

  // ✅ Send OTP to backend
  const handleSendOtp = async () => {
    if (mobile.length === 10) {
      try {
        const res = await sentOtp({ mobile });
        console.log("OTP sent response:", res);
        setOtpSent(true);
      } catch (err) {
        console.error("Error sending OTP:", err);
        alert("Failed to send OTP, please try again.");
        resetForm(); // clear on failure
      }
    } else {
      alert("Please enter a valid 10-digit mobile number");
      resetForm(); // clear invalid input
    }
  };

  // ✅ Verify OTP with backend
  const handleVerifyOtp = async () => {
    try {
      const res = await verifyotp({ mobile, otp });
      console.log("OTP verification response:", res);

      if (res.message === "OTP verified successfully") {
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("customer", JSON.stringify(res.customer));
        localStorage.setItem("customerId", res.customer._id);

        resetForm(); // clear inputs
        handleClose(); // close modal
      } else {
        alert("Invalid OTP, please try again");
        resetForm(); // clear inputs
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert("OTP verification failed.");
      resetForm(); // clear inputs
    }
  };

  return (
    <Modal show={show} onHide={() => { handleClose(); resetForm(); }} centered contentClassName="rounded-4 shadow-lg">
      {/* Header */}
      <Modal.Header closeButton className="border-0 justify-content-center">
        <Modal.Title className="w-100 text-center fw-bold fs-4 text-primary">
          User Login
        </Modal.Title>
      </Modal.Header>

      {/* Body */}
      <Modal.Body>
        <Form className="px-2">
          {/* Mobile number input */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold" style={{ color: '#0d6efd' }}>
              Mobile Number
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your mobile"
              className="rounded-4 shadow-sm"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={otpSent}
            />
          </Form.Group>

          {/* OTP input */}
          {otpSent && (
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold" style={{ color: '#0d6efd' }}>
                Enter OTP
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                className="rounded-4 shadow-sm"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
          )}

          {/* Action Button */}
          {!otpSent ? (
            <Button
              variant="outline-primary"
              onClick={handleSendOtp}
              className="w-100 py-2 rounded-4 fw-semibold"
            >
              Send OTP
            </Button>
          ) : (
            <Button
              variant="outline-success"
              onClick={handleVerifyOtp}
              className="w-100 py-2 rounded-4 fw-semibold"
            >
              Verify OTP
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
