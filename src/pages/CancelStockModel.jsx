import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {cancelstockorder} from '../ApiFunctions/CancelOrders'

const CancelStockModel = ({ show, onHide, orderId,onCancelSuccess }) => {
 



  const handleSubmit = async() => {
    console.log("Cancel Data:", { orderId });
    try{
      const response = await cancelstockorder(orderId);
      // console.log("Cancel Response:", response);
    const message = response.data?.message || response.message;

    if (message === "Order cancelled successfully and stock restored") {
      onCancelSuccess(orderId);
    }
    onHide();
    } catch (error) {
    console.error("Cancel Error:", error);
    // optional: show error message to user here
  }
};



  return (
    <Modal show={show} onHide={onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cancel Order</Modal.Title>
          </Modal.Header>
    
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Order ID</Form.Label>
                <Form.Control type="text" value={orderId} disabled />
              </Form.Group>
    
              {/* <Form.Group className="mb-3">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  placeholder="Enter reason"
                  required
                />
              </Form.Group> */}
            </Form>
          </Modal.Body>
    
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="danger" onClick={handleSubmit}>
              Confirm Cancel
            </Button>
          </Modal.Footer>
        </Modal>
  )
}

export default CancelStockModel