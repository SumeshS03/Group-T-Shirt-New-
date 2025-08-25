import React, { useState, useEffect } from "react";

const CustomerDetailEditModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  // ✅ Load customer details from localStorage when modal opens
  useEffect(() => {
    if (show) {
      const storedCustomer = localStorage.getItem("customer");
      if (storedCustomer) {
        setFormData(JSON.parse(storedCustomer));
      }
    }
  }, [show]);

  // ✅ Update form values
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save updates back to localStorage
  const handleSave = () => {
    localStorage.setItem("customer", JSON.stringify(formData));
    console.log("Updated Customer:", formData);
    onClose();
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

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-bold text-start d-block">
                  <i className="bi bi-envelope me-2"></i> E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
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
                <textarea
                  name="address"
                  rows="3"
                  className="form-control rounded-4 shadow-sm"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full address"
                ></textarea>
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
              Save Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailEditModal;
