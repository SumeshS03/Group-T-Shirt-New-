import React, { useState, useEffect } from "react";
import { addNewAddress } from "../ApiFunctions/CustomerAdress";

const CustomerDetailAddModal = ({ show, onClose,onAddressAdded }) => {

  const initialFormData = {
  name: "",
  mobile: "",
  addressLine1: "",
  city: "",
  state: "",
  postalCode: "",
};

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    addressName: "",
    customAddressName: "",
  });


  

  // ✅ Update form values
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save updates back to localStorage
const handleSave = async () => {
  try {
    // Decide the final addressName
    const finalFormData = {
      ...formData,
      addressName:
        formData.addressName === "Other"
          ? formData.customAddressName // if Other, use custom input
          : formData.addressName,      // else use selected value
    };

    console.log("Saving Address:", finalFormData);

    const response = await addNewAddress(finalFormData);
    console.log("Address added:", response);

    // Notify parent component (if exists)
    if (typeof onAddressAdded === "function") {
      onAddressAdded(response.data); // response.data is the new address
    }

    // Reset form
    setFormData({
      name: "",
      mobile: "",
      addressLine1: "",
      city: "",
      state: "",
      postalCode: "",
      addressName: "",
      customAddressName: "",
    });

    // Close modal or form
    onClose();
  } catch (error) {
    console.error("Failed to add new address:", error);
    alert("Failed to save address. Please try again.");
  }
};




  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0">
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form className="p-2">


             {/* Address Name */}

             <div className="mb-3">
  <label className="form-label fw-bold text-start d-block">
    <i className="bi bi-house me-2"></i> Address Type
  </label>
  <select
    name="addressName"
    className="form-select form-control rounded-4 shadow-sm"
    value={formData.addressName}
    onChange={handleChange}
  >
    <option value="">Select Address Type</option>
    <option value="Home">Home</option>
    <option value="Office">Office</option>
     <option value="Other">Other</option>
  </select>
</div>


{formData.addressName === "Other" && (
  <input
    type="text"
    name="customAddressName"
    className="form-control rounded-4 shadow-sm mt-2 mb-3"
    placeholder="Enter custom address name"
    value={formData.customAddressName}
    onChange={handleChange}
  />
)}




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
                  placeholder="Enter 10-digit number"
                />
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-geo-alt me-2"></i> Address
                </label>
                <input
                  name="addressLine1"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  placeholder="Enter full address"
                ></input>
              </div>

              {/* city */}
              <div className="mb-3">
                <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-geo-alt me-2"></i> City
                </label>
                <input
                  name="city"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter Your City"
                ></input>
              </div>


              {/* state */}
              <div className="mb-3">
                <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-geo-alt me-2"></i> State
                </label>
                <input
                  name="state"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter Your State"
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-geo-alt me-2"></i> Pincode
                </label>
                <input
                  name="postalCode"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Enter PinCode"
                ></input>
              </div>


            </form>
          </div>

          {/* Save button inside body */}
          <div className="px-3 pb-3">
            <button
              type="button"
              className="btn btn-primary w-100 rounded-4"
              onClick={handleSave}
            >
              Save Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailAddModal;
