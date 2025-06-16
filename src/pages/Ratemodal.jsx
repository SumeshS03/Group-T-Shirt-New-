import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Ratemodal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Discount Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
  <table className="table table-bordered text-center">
    <thead className="thead-dark">
      <tr>
        <th>Quantity</th>
        <th>Discount (in rupees) from MRP</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1 - 10</td>
        <td>₹0</td>
      </tr>
      <tr>
        <td>11 - 20</td>
        <td>₹8</td>
      </tr>
      <tr>
        <td>21 - 30</td>
        <td>₹16</td>
      </tr>
      <tr>
        <td>31 - 40</td>
        <td>₹24</td>
      </tr>
      <tr>
        <td>41 - 50</td>
        <td>₹32</td>
      </tr>
      <tr>
        <td>51 - 60</td>
        <td>₹40</td>
      </tr>
      <tr>
        <td>61 - 70</td>
        <td>₹48</td>
      </tr>
      <tr>
        <td>71 - 80</td>
        <td>₹56</td>
      </tr>
      <tr>
        <td>81 - 90</td>
        <td>₹64</td>
      </tr>
      <tr>
        <td>91 - 100</td>
        <td>₹72</td>
      </tr>
      <tr>
        <td>101 - 200</td>
        <td>₹79</td>
      </tr>
      <tr>
        <td>201 - 300</td>
        <td>₹86</td>
      </tr>
      <tr>
        <td>301 - 40</td>
        <td>₹93</td>
      </tr>
    </tbody>
  </table>
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
