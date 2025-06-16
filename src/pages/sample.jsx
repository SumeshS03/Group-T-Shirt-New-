import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const ShirtCustomizationForm = () => {
  const sizes = [
    { label: 'S', chest: '36' },
    { label: 'M', chest: '38' },
    { label: 'L', chest: '40' },
    { label: 'XL', chest: '42' },
    { label: 'XXL', chest: '44' },
    { label: 'XXXL', chest: '46' },
    { label: 'XXXXL', chest: '48' },
    { label: 'XXXXXL', chest: '50' },
  ];

  const [enteredQty, setEnteredQty] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [logoCount, setLogoCount] = useState(1);
  const [pocketRequired, setPocketRequired] = useState('no');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [color, setColor] = useState('#000000');
  const [selectedCotton, setSelectedCotton] = useState('');
  const [selectedPolyester, setSelectedPolyester] = useState('');
  const [selectedPolyCotton, setSelectedPolyCotton] = useState('');
  const [remark, setRemark] = useState("");
  const [halfSleeve, setHalfSleeve] = useState({});
  const [fullSleeve, setFullSleeve] = useState({});
  const [totalHalf, setTotalHalf] = useState(0);
  const [totalFull, setTotalFull] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
   const [isMaterialSelected, setIsMaterialSelected] = useState(false);
  const [logos, setLogos] = useState([{ type: '', position: '', image: null }]);

  const qtyInputRef = useRef(null);
  const formRef = useRef(null);

  const handleInputChange = (type, size, value) => {
    const numericValue = parseInt(value) || 0;
    if (type === 'half') {
      setHalfSleeve((prev) => ({ ...prev, [size]: numericValue }));
    } else {
      setFullSleeve((prev) => ({ ...prev, [size]: numericValue }));
    }
  };

  useEffect(() => {
    const totalHalfCount = Object.values(halfSleeve).reduce((acc, val) => acc + val, 0);
    const totalFullCount = Object.values(fullSleeve).reduce((acc, val) => acc + val, 0);
    const total = totalHalfCount + totalFullCount;
    
    setTotalHalf(totalHalfCount);
    setTotalFull(totalFullCount);
    setGrandTotal(total);
  }, [halfSleeve, fullSleeve]);


  const handleSubmit = (event) => {
    event.preventDefault();


    if (!isMaterialSelected) {
      alert("Please select a material type");
      return;
    }
    
    if (formRef.current.checkValidity()) {
      const formData = new FormData(event.target);
      console.log([...formData]);
      alert("Form submitted successfully!");
    } else {
      formRef.current.reportValidity();
    }
  };

  const handleLogoCountChange = (e) => {
    const count = parseInt(e.target.value);
    setLogoCount(count);
    const newLogos = Array(count).fill({ type: '', position: '', image: null });
    setLogos(newLogos);
  };

  const handleLogoChange = (index, field, value) => {
    const updatedLogos = [...logos];
    updatedLogos[index][field] = value;
    setLogos(updatedLogos);
  };

  const handleLogoImageUpload = (index, file) => {
    const updatedLogos = [...logos];
    updatedLogos[index].image = URL.createObjectURL(file);
    setLogos(updatedLogos);
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };
   useEffect(() => {
    const isSelected = !!selectedCotton || !!selectedPolyester || !!selectedPolyCotton;
    setIsMaterialSelected(isSelected);
  }, [selectedCotton, selectedPolyester, selectedPolyCotton]);

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="container mt-5">
        <div className="row mb-4">
          <label className="fs-6 fw-bold col-lg-2 mb-md-3">Enter Quantity required:</label>
          <div className="col-lg-2">
            <input
              type="number"
              min="16"
              className="form-control"
              placeholder="Enter Quantity"
              value={enteredQty}
              onChange={(e) => setEnteredQty(e.target.value)}
              required
            />
          </div>

          <label className="fs-6 fw-bold col-lg-2 mt-lg-0 mb-md-3">Logos to add:</label>
          <div className="col-lg-2">
            <input
              type="number"
              min="1"
              max="4"
              className="form-control"
              value={logoCount}
              onChange={handleLogoCountChange}
              required
            />
          </div>

          <label className="fs-6 fw-bold col-lg-2 mt-lg-0 mt-3 mb-md-3">Pocket Required:</label>
          <div className="col-lg-2">
            <div className="d-flex gap-3">
              <div>
                <input
                  type="radio"
                  id="yes"
                  name="pocketRequired"
                  value="yes"
                  checked={pocketRequired === 'yes'}
                  onChange={(e) => setPocketRequired(e.target.value)}
                  required
                />
                <label htmlFor="yes">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="no"
                  name="pocketRequired"
                  value="no"
                  checked={pocketRequired === 'no'}
                  onChange={(e) => setPocketRequired(e.target.value)}
                  required
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 mb-4">
          <label className="fs-6 fw-bold col-lg-2 text-lg-end mb-md-3">Delivery Date:</label>
          <div className="col-lg-2 mb-md-3">
            <input
              type="date"
              className="form-control"
              value={deliveryDate}
              min={getMinDate()}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
          </div>
          <label className="fs-6 fw-bold col-lg-2 text-lg-end mt-lg-0 mt-3">Choose Colour:</label>
          <div className="col-lg-1 d-flex align-items-lg-start align-items-center justify-content-lg-start justify-content-center mt-lg-0 mt-3">
            <input
              type="color"
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="form-control-color rounded-color"
              required
            />
          </div>
        </div>

        <div className="row mt-2 pt-2 pb-4 chooseoption-box mb-4">
          <div>
            <label className="fs-6 fw-bold text-center mb-3">Material Selection:</label>
          </div>
          <div className="selectmaterial-box row justify-content-evenly">
            <div className="col-lg-2">
              <div className="cotton-dropdown">
                <label className="dropdown-label w-100 fw-bold fs-6 mb-2">Cotton</label>
                <select
                  className="form-select mt-2"
                  value={selectedCotton}
                  onChange={(e) => {
                    setSelectedCotton(e.target.value);
                    setSelectedPolyester('');
                    setSelectedPolyCotton('');
                  }}
                  required
                  disabled={!!selectedPolyester || !!selectedPolyCotton}
                >
                  <option value="">Select option</option>
                  <option value="Combed Cotton">Combed</option>
                  <option value="Ringspun Cotton">Ringspun</option>
                  <option value="Organic Cotton">Organic</option>
                  <option value="Pima Cotton">Pima</option>
                  <option value="Supima Cotton">Supima</option>
                  <option value="Slub Cotton">Slub</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2 mt-lg-0 mt-md-3">
              <div className="cotton-dropdown">
                <label className="dropdown-label w-100 fw-bold fs-6 mb-2">Polyester</label>
                <select
                  className="form-select mt-2"
                  value={selectedPolyester}
                  onChange={(e) => {
                    setSelectedPolyester(e.target.value);
                    setSelectedCotton('');
                    setSelectedPolyCotton('');
                  }}
                  required
                  disabled={!!selectedCotton || !!selectedPolyCotton}
                >
                  <option value="">Select option</option>
                  <option value="Poly-cotton">Poly-cotton</option>
                  <option value="Tri-blend Fabric">Tri-blend Fabric</option>
                  <option value="Microfiber Polyester">Microfiber</option>
                  <option value="Interlock Polyester">Interlock</option>
                  <option value="Moisture-wicking">Moisture-wicking</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2 mt-lg-0 mt-md-3">
              <div className="cotton-dropdown">
                <label className="dropdown-label w-100 fw-bold fs-6 mb-2">Poly Cotton</label>
                <select
                  className="form-select mt-2"
                  value={selectedPolyCotton}
                  onChange={(e) => {
                    setSelectedPolyCotton(e.target.value);
                    setSelectedCotton('');
                    setSelectedPolyester('');
                  }}
                  required
                  disabled={!!selectedCotton || !!selectedPolyester}
                >
                  <option value="">Select option</option>
                  <option value="Ring-Spun Poly-Cotton">Ring-Spun</option>
                  <option value="Combed Poly-Cotton">Combed Poly</option>
                  <option value="Brushed Poly-Cotton">Brushed Poly</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 pt-2 pb-4 chooseoption-box">
          <div>
            <label className="fs-6 fw-bold d-flex align-items-center justify-content-center text-center mb-3">Logo Details:</label>
          </div>
          {logos.map((logo, index) => (
            <div key={index} className="mb-4">
              <div className="row d-flex justify-content-evenly">
                <div className="col-lg-2">
                  <label className="form-label fw-bold">Logo Type</label>
                  <select
                    className="form-select"
                    value={logo.type}
                    onChange={(e) => handleLogoChange(index, 'type', e.target.value)}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="printed">Printed</option>
                    <option value="embroidered">Embroidered</option>
                  </select>
                </div>

                <div className="col-lg-2">
                  <label className="form-label fw-bold">Position</label>
                  <select
                    className="form-select"
                    value={logo.position}
                    onChange={(e) => handleLogoChange(index, 'position', e.target.value)}
                    required
                  >
                    <option value="">Select Position</option>
                    <option value="left Chest">Left Chest</option>
                    <option value="Right Chest">Right Chest</option>
                    <option value="Left Sleeve">Left Sleeve</option>
                    <option value="Right Sleeve">Right Sleeve</option>
                    <option value="Front Center">Front Center</option>
                    <option value="Back Top">Back Top</option>
                    <option value="Back Center">Back Center</option>
                    <option value="On Pocket">On Pocket</option>
                  </select>
                </div>

                <div className="col-lg-2">
                  <label className="form-label fw-bold">Upload Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleLogoImageUpload(index, e.target.files[0])}
                    required
                  />
                </div>
              </div>

              {logo.image && (
                <div className="row mt-2">
                  <div className="col-lg-12 d-flex justify-content-center">
                    <img
                      src={logo.image}
                      alt={`Logo ${index + 1}`}
                      style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                      className="rounded-4 border"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="container mt-5 d-flex justify-content-center align-items-center">
          <div className="custom-scroll-x">
            <table className="table table-bordered text-center w-100">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest</th>
                  <th colSpan="2">Qty</th>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <th>Half Sleeve</th>
                  <th>Full Sleeve</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map(({ label, chest }) => (
                  <tr key={label}>
                    <td className="fw-bold">{label}</td>
                    <td>{chest}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        value={halfSleeve[label] || ''}
                        onChange={(e) => handleInputChange("half", label, e.target.value)}
                        
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        value={fullSleeve[label] || ''}
                        onChange={(e) => handleInputChange("full", label, e.target.value)}
                        
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Half Sleeve Total</label>
                  <input type="text" className="form-control" value={totalHalf} readOnly />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Full Sleeve Total</label>
                  <input type="text" className="form-control" value={totalFull} readOnly />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Grand Total</label>
                  <input 
                    type="text" 
                    id="grandTotalInput"
                    className="form-control" 
                    value={grandTotal} 
                    readOnly
                    required 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <textarea
            className="form-control w-50"
            placeholder="Remark"
            rows="4"
            name="remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg">
            Submit Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShirtCustomizationForm;