import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Ratemodal.css'

const Ratemodal = ({ show, handleClose, formData, setFormData }) => {
  

  const handleColorSelect = (color,id) => {
    setFormData((prev) => ({
    ...prev,
    color: color,
    colorid: id, 
  }));
  };


 const coloroption=[
  { id: 1, color: "#d5cfcf" },
  { id: 2, color: "#1f2c38" },
  { id: 3, color:"#171415"},
  { id: 4, color:"#1a5b4c"},
  { id: 5, color:"#d1adb7"},
  { id: 6, color:"#ead153"},
  { id: 7, color:"#878382"},
  { id: 8, color:"#22222c"},
  { id: 9, color:"#542a35"},
  { id: 10, color:"#12776d"},
  { id: 11, color:"#efa1c2"},
  { id: 12, color:"#f2c245"},
  { id: 13, color:"#a49fa3"},
  { id: 14, color:"#171f50"},
  { id: 15, color:"#83b6c1"},
  { id: 16, color:"#126e56"},
  { id: 17, color:"#be2762"},
  { id: 18, color:"#e9d177"},
  { id: 19, color:"#555354"},
  { id: 20, color:"#1a3677"},
  { id: 21, color:"#57c4d9"},
  { id: 22, color:"#10504b"},
  { id: 23, color:"#e75938"},
  { id: 24, color:"#efcd65"},
  { id: 25, color:"#353336"},
  { id: 26, color:"#4a214f"},
  { id: 27, color:"#1276ae"},
  { id: 28, color:"#aba835"},
  { id: 29, color:"#d74c3c"},
  { id: 30, color:"#d99b28"},
  { id: 31, color:"#3d3d49"},
  { id: 32, color:"#452246"},
  { id: 33, color:"#6e85ae"},
  { id: 34, color:"#2c9c4c"},
  { id: 35, color:"#d1324d"},
  { id: 36, color:"#bc9454"},
  { id: 37, color:"#864351"},
  { id: 38, color:"#363435"},
  { id: 39, color:"#6884b9"},
  { id: 40, color:"#0b4e28"},
  { id: 41, color:"#a7132b"},
  { id: 42, color:"#dbd3d3"},
  { id: 43, color:"#3c2431"},
  { id: 44, color:"#322a2a"},
  { id: 45, color:"#084b84"},
  { id: 46, color:"#28382e"},
  { id: 47, color:"#5c141b"},
  { id: 48, color:"#b2986c"},
  { id: 49, color:"#1b191c"},
  { id: 50, color:"#8d7e79"},
  { id: 51, color:"#2d2c28"},
  { id: 52, color:"#3f322a"},
  { id: 53, color:"#88182e"},
  { id: 54, color:"#5f1c2d"},

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
                className="col-2 mb-3 d-flex justify-content-center"
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
  );
};

export default Ratemodal;
