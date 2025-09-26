import React, { useState, useEffect } from "react";
import {getuseraddressdetail,deleteuseraddress} from "../ApiFunctions/CustomerAdress"
import { MdDelete, MdEdit } from "react-icons/md";
import CustomerDetailAddModal from "./CustomerDetailAddModal";
import CustomerAdressEditModal from "./CustomerAdressEditModal";

const ProfileAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [show, setShow] = useState(false);
    const [editAddress, setEditAddress] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

// fetch customer address
      useEffect(() => {
        const fetchAddresses = async () => {
          try {
            const data = await getuseraddressdetail(); 
            console.log("Fetched Addresses:", data.data);   
            setAddresses(data.data);
                                   
          } catch (error) {
            console.error("Error fetching addresses:", error);
          }
        };
    
        fetchAddresses(); // call async function
      }, []);

// Callback to add new address immediately
  const handleNewAddress = (newAddr) => {
  // Add new address to addresses list
  setAddresses((prev) => [...prev, newAddr]);
    setShow(false); // close modal
};



const handleAddressEdit = (addr) => {
  setEditAddress(addr);   // store the address to edit
  setShowEditModal(true); // open modal
};

  const handleAddressDelete = async (id) => {
  try {
    // Confirm deletion with the user
    const confirmDelete = window.confirm("Are you sure you want to delete this address?");
    if (!confirmDelete) return;

    // Call API to delete
    const response = await deleteuseraddress(id);
    console.log("Deleted address:", response);

    // Update local state to remove address immediately from UI
    setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    
    // If the deleted address was selected, reset selectedAddress
    if (selectedAddress === id) setSelectedAddress(null);

  } catch (error) {
    console.error("Failed to delete address:", error);
    alert("Failed to delete address. Please try again.");
  }
};

  return (
    <div>
        <h4 className="mb-4 text-center">Edit Address</h4>
        <div className="d-flex flex-column gap-3 mb-4"
        style={{
    minHeight: "366px", 
    overflowY: "auto",   
  }}
        >
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="p-3 border rounded-3 position-relative d-flex justify-content-between align-items-start"
            >
              {/* Address Info */}
             <div style={{ flex: 1 }}>
  {/* Address Type Tag at Top-Start */}
  <div
    className="address-card p-2 mb-3 text-start"
    style={{
      backgroundColor: "#f5f5f5", // light gray background
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)", // subtle shadow
      borderRadius: "10px", // rounded corners
      fontWeight: "500",
      color: "#333",
      width: "fit-content", // keeps box compact but aligned to start
    }}
  >
    {addr.addressName}
  </div>

  {/* Address Details */}
  <div className="text-start"><strong>Name:</strong> {addr.name}</div>
  <div className="text-start"><strong>Mobile:</strong> {addr.mobile}</div>
  <div className="text-start">
    <strong>Address:</strong> {addr.addressLine1}, {addr.city}, {addr.state}
  </div>
  <div className="text-start"><strong>Pincode:</strong> {addr.postalCode}</div>
</div>




          
              {/* Action Icons */}
              <div className="d-flex flex-column gap-2 ms-3">
                <MdEdit
                  className="rounded-circle text-primary"
                  size={20}
                  style={{ cursor: "pointer" }}
                   onClick={(e) => {
    e.stopPropagation(); // prevent selecting the address
    handleAddressEdit(addr._id);
  }}
                  
                />
          
                {/* Delete Icon */}
                <MdDelete
                  className="rounded-circle text-danger"
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
    e.stopPropagation(); 
    handleAddressDelete(addr._id);
  }}
                />
              </div>
          
              
            </div>
          ))} 
        </div>
        <div className="d-grid">
              <button className="btn btn-primary"
              onClick={() => setShow(true)}
              >
                Add Address
              </button>
            </div>
            <CustomerDetailAddModal
        show={show}
        onClose={() => setShow(false)}
        onAddressAdded={handleNewAddress} // ✅ Pass callback
      ></CustomerDetailAddModal>
      <CustomerAdressEditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        addressId={editAddress}
        onSave={(updatedAddr) => {
          setAddresses((prev) =>
            prev.map((a) => (a._id === updatedAddr._id ? updatedAddr : a))
          );
          setShowEditModal(false);
        }}
      />
    </div>
    
            
  )
}

export default ProfileAddress