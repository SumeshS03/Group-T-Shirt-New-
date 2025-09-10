import { Modal, Button } from 'react-bootstrap';
import './Ratemodal.css';

const CollareCottonColorModal = ({ show, formData, setFormData, handleClose }) => {


    const handleColorSelect = (color, id) => {
    setFormData((prev) => ({
      ...prev,
      color,
      colorid: id,
    }));
  };

     const coloroption = [
    { id: 1, color: "#c9b9ac" },
    { id: 2, color: "#be532f" },
    { id: 3, color: "#d2e3f6" },
    { id: 4, color: "#2b4349" },
    { id: 5, color: "#9f202c" },
    { id: 6, color: "#1e2432" },
    { id: 7, color: "#441c32" },
    { id: 8, color: "#161d23" },
    { id: 9, color: "#bc7525" },
    { id: 10, color: "#c99b3c" },
    { id: 11, color: "#7da9c4" },
    { id: 12, color: "#284287" },
    { id: 13, color: "#cd9d75" },
    { id: 14, color: "#697585" },
    { id: 15, color: "#98a9bd" },
    { id: 16, color: "#3f5165" },
  ];
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
                        width: '40px',
                        height: '40px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      title={item.color}
                      onClick={() => handleColorSelect(item.color, item.id)}
                    />
                  </div>
                ))}
              </div>
              <div className="row d-flex justify-content-center align-items-center">
                <span className="text-success fw-bold">Selected Color:</span>
                <div
                  className="selectedcolorbox"
                  style={{
                    backgroundColor: formData.color,
                    width: '60px',
                    height: '30px',
                    border: '1px solid #ccc',
                    marginTop: '8px',
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

export default CollareCottonColorModal