import React, { useState, useEffect } from "react";
import { getcustomeraddressbyid,updateUserAddress } from "../ApiFunctions/CustomerAdress";

const CustomerDetailEditModal = ({ show, onClose, addressId, onSave }) => {
  const initialFormData = {
    name: "",
    mobile: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    addressName: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // ✅ Fetch address data when modal opens
useEffect(() => {
  const fetchAddress = async () => {
    if (!addressId || !show) return; // only fetch when modal is shown
    try {
      const data = await getcustomeraddressbyid(addressId);
      setFormData(data.data); // populate form with latest data
    } catch (error) {
      console.error("Failed to fetch address:", error);
    }
  };

  fetchAddress();
}, [addressId, show]); // ✅ include show


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


// inside CustomerDetailEditModal
const handleSave = async () => {
  try {
    const response = await updateUserAddress(addressId, formData);
    console.log("Address updated:", response);

    // Pass only the updated address object to parent
    onSave(response.data); // <-- use .data

    setFormData(initialFormData);
    onClose();
  } catch (error) {
    console.error("Failed to save address:", error);
    alert("Failed to save address. Please try again.");
  }
};








  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0">
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form className="p-2">



             {/* addressName */}

              <div className="mb-3">
                <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-house me-2"></i> Address Name
                </label>
                <input
                  type="text"
                  name="addressName"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.addressName}
                  onChange={handleChange}
                  placeholder="Enter address name (e.g., Home, Office)"
                />
              </div>


              {/* Name */}
              <div className="mb-3">
                 <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-person me-2"></i> Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>
              {/* Mobile */}
              <div className="mb-3">
                <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-telephone me-2"></i> Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  maxLength="10"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                />
              </div>
              {/* Address */}
              <div className="mb-3">
                <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-geo-alt me-2"></i> Address
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  placeholder="Enter address"
                />
              </div>
              {/* City */}
              <div className="mb-3">
                <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-geo-alt me-2"></i> City
                </label>
                <input
                  type="text"
                  name="city"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </div>
              {/* State */}
              <div className="mb-3">
                 <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-geo-alt me-2"></i> State
                </label>
                <input
                  type="text"
                  name="state"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </div>
              {/* Postal Code */}
              <div className="mb-3">
                <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-geo-alt me-2"></i> Pincode
                </label>
                <input
                  type="text"
                  name="postalCode"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                />
              </div>
            </form>
          </div>

          <div className="px-3 pb-3">
            <button className="btn btn-primary w-100 rounded-4" onClick={handleSave}>
              Save Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailEditModal;
