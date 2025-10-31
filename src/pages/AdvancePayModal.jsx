import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AdvancePayModal = ({ show, handleClose, orderDetail, orderId }) => {
  const [matchedOrder, setMatchedOrder] = useState(null);
  const [selectedPercent, setSelectedPercent] = useState("");
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  // 👉 Find correct order when modal opens
  useEffect(() => {
    if (show && orderDetail && orderId) {
      const matched =
        Array.isArray(orderDetail)
          ? orderDetail.find((item) => item._id === orderId)
          : orderDetail._id === orderId
          ? orderDetail
          : null;

      if (matched) {
        setMatchedOrder(matched);
      } else {
        setMatchedOrder(null);
      }
    }
  }, [show, orderDetail, orderId]);

  // 👉 Reset selection and amount when modal closes
  useEffect(() => {
    if (!show) {
      setSelectedPercent("");
      setCalculatedAmount(0);
      setMatchedOrder(null);
    }
  }, [show]);

  // 👉 Handle selection (50% or 70%)
  const handleSelectChange = (e) => {
    const value = Number(e.target.value);
    setSelectedPercent(value);
    setCalculatedAmount(((matchedOrder?.grandTotal || 0) * value) / 100);
  };

  // 👉 Handle pay button click
  const handlePayAdvance = () => {
    if (!selectedPercent) {
      alert("Please select a payment percentage before proceeding.");
      return;
    }

    // Example only — integrate your payment logic here
    alert(`Proceeding to pay ₹${calculatedAmount.toFixed(2)} (${selectedPercent}%)`);

    // Clear selection afterward
    setSelectedPercent("");
    setCalculatedAmount(0);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Advance Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="container text-center">
          <h6 className="text-secondary mb-3">Order Details</h6>
          <div className="card shadow-sm p-3">
            {matchedOrder ? (
              <>
                <p className="mb-1">
                  <strong>Order ID:</strong> {matchedOrder.orderId}
                </p>
                {/* <p className="mb-1">
                  <strong>Customer:</strong> {matchedOrder.customerId?.name}
                </p> */}
                <p className="mb-3">
                  <strong>Grand Total:</strong> ₹{matchedOrder.grandTotal}
                </p>

                <div className="d-flex flex-column align-items-center">
                  <label htmlFor="percentSelect" className="mb-2 fw-semibold">
                    Select Advance Percentage
                  </label>

                  <select
                    id="percentSelect"
                    className="form-select w-50 mb-3"
                    value={selectedPercent}
                    onChange={handleSelectChange}
                  >
                    <option value="">-- Choose Percentage --</option>
                    <option value="50">
                      50% Pay: ₹{((matchedOrder.grandTotal || 0) * 0.5).toFixed(2)}
                    </option>
                    <option value="70">
                      70% Pay: ₹{((matchedOrder.grandTotal || 0) * 0.7).toFixed(2)}
                    </option>
                  </select>

                  {selectedPercent && (
                    <div className="alert alert-info w-50 py-2 mb-3">
                      You’ll pay: ₹{calculatedAmount.toFixed(2)}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="text-danger">No matching order found.</p>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="justify-content-between">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={handlePayAdvance}
          disabled={!selectedPercent}
        >
          Pay Advance
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdvancePayModal;
