import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // ✅ Import Link
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const HowToOrderModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  // Function to check authentication and navigate accordingly

  const buycheck = () => {
    const token = localStorage.getItem("authToken");
    window.scrollTo(0, 0);
    if (token) {
      // User is authenticated

      navigate(`/product`);
    } else {
      Swal.fire("Please login to start shopping.");
      navigate("/profile");
    }
  };

  const readycheck = () => {
    const token = localStorage.getItem("authToken");
    window.scrollTo(0, 0);
    if (token) {
      // User is authenticated
      navigate(`/stock`);
    } else {
      Swal.fire("Please login to start shopping.");
      navigate("/profile");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>How to Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="fw-bold text-primary mb-3">Order Quantity Below 12</h5>
        <ol className="ps-3 mb-4">
          <li>
            Choose from{" "}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault(); // prevent page jump
                readycheck(); // call your function
              }}
              className="text-decoration-none fw-bold text-primary"
            >
              Ready Stock
            </Link>{" "}
            page (subject to availability).
          </li>
          <li>Upload your logo & specify the placement.</li>
          <li>
            Make full payment and provide billing details (GST if available) &
            shipping address.
          </li>
          <li>We will send you a design. Once approved, we proceed further.</li>
          <li>Your order will be shipped immediately after production.</li>
        </ol>

        <h5 className="fw-bold text-primary mb-3">Order Quantity Above 12</h5>
        <ol className="ps-3">
          <li>
            Choose from a wide range of{" "}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent the page from jumping
                buycheck(); // Call your function
              }}
              className="text-decoration-none fw-bold text-primary"
            >
              Product
            </Link>{" "}
            (MOQ starts from 12).
          </li>
          <li>
            Provide required quantity, logo details, positions, color choices &
            size breakup.
          </li>
          <li>
            Select from the available options and{" "}
            <Link
              to="/cart"
              className="text-decoration-none fw-bold text-primary"
            >
              ADD TO CART
            </Link>{" "}
            .
          </li>
          <li>
            Provide billing details (GST if available) & shipping address.
          </li>
          <li>Make an advance payment.</li>
          <li>
            We will send you a design. After approval, production will begin.
          </li>
          <li>
            Once production is complete, you will be notified to pay the
            balance.
          </li>
          <li>
            Your order will be shipped immediately after payment confirmation.
          </li>
        </ol>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <span className="text-muted small">
          🚚 Fast shipping | 🎨 Custom design support
        </span>
        <Button variant="primary" onClick={handleClose}>
          Got It!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HowToOrderModal;
