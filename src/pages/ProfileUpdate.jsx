import React, { useState, useEffect } from "react";
import HomeHeader from "../Layout/HomeHeader";
import Footer from "../Layout/Footer";
import { update } from "../ApiFunctions/Profile"; 
import ProfileAddress from "./ProfileAddress";

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  // ✅ Prefill from localStorage (or API)
  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    if (customer) {
      setFormData({
        name: customer.name || "",
        mobile: customer.mobile || "",
        email: customer.email || "",
        address: customer.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);

    try {
      const res = await update(formData); // call API
      console.log("Profile updated:", res);
      alert("Profile updated successfully!");
      // Optional: update localStorage
      localStorage.setItem("customer", JSON.stringify(formData));
      // ✅ Dispatch custom event so header knows
    window.dispatchEvent(new Event("customerUpdated"));
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <HomeHeader />
      <div className="container-fluid p-5 mt-lg-4 mt-0">
        <div className="container bg-white shadow rounded p-4" >
          <div className="row w-100">
            <div className="col-lg-6">
              <h4 className="mb-4 text-center">Edit Profile</h4>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3 text-start">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            {/* Mobile */}
            <div className="mb-3 text-start">
              <label className="form-label">Mobile</label>
              <input
                type="tel"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
              />
            </div>

            {/* Email */}
            <div className="mb-3 text-start">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            {/* Address */}
            <div className="mb-3 text-start">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
            </div>
            <div className="col-lg-6">
              <ProfileAddress />
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileUpdate;
