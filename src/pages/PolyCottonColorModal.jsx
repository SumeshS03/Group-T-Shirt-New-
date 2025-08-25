import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Ratemodal.css'

const PolyCottonColorModal = ({show,handleClose,formData,setFormData}) => {

     const handleColorSelect = (color,id) => {
    setFormData((prev) => ({
    ...prev,
    color: color,
    colorid: id, 
  }));
  };


 const coloroption=[
  { id: 1, color: "#404853" },
  { id: 2, color: "#99d6eb" },
  { id: 3, color:"#48c1ee"},
  { id: 4, color:"#b9622f"},
  { id: 5, color:"#b92c67"},
  { id: 6, color:"#eac3c0"},
  { id: 7, color:"#038496"},
  { id: 8, color:"#133f76"},
  { id: 9, color:"#98b2c1"},
  { id: 10, color:"#4b1f2f"},
  { id: 11, color:"#dac5aa"},
  { id: 12, color:"#3f232f"},
  { id: 13, color:"#37342d"},
  { id: 14, color:"#141e30"},
  { id: 15, color:"#44b3a6"},
  { id: 16, color:"#5bba8a"},
  { id: 17, color:"#20353a"},
  { id: 18, color:"#d19432"},
  { id: 19, color:"#2a56b4"},
  { id: 20, color:"#a7a6a1"},
  { id: 21, color:"#a2d76f"},
  { id: 22, color:"#e5e8ee"},
  { id: 23, color:"#e9d98a"},
  { id: 24, color:"#0482bb"},
 

 ]
  return (
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Choose Color</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                {coloroption.map((item) => (
                  <div
                    key={item.id}
                    className="col-3 mb-3 d-flex justify-content-center"
                  >
                    <div
                      className="colorbox"
                      style={{
                        backgroundColor: item.color,
                        border: formData.color === item.color ? '3px solid #007bff' : '1px solid #ccc',
                         boxShadow: formData.color === item.color
        ? `0 0 8px 3px ${item.color}AA`
        : 'none',
      transition: 'box-shadow 0.3s ease, border 0.3s ease',
                      }}
                      title={item.color}
                      onClick={() => handleColorSelect(item.color, item.id)}
                    />
                  </div>
                ))}
              </div>
              <div className='row d-flex justify-content-center align-items-center'>
                <span className='text-success fw-bold'>Selected Color:</span>
                <div className='selectedcolorbox'
                  style={{
                    backgroundColor: formData.color,
                    
                  }}
                />
              </div>
            </div>
    
            
          </Modal.Body>
    
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
  )
}

export default PolyCottonColorModal