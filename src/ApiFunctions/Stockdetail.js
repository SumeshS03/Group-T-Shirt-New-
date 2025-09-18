import axios from "axios";
const BASE_URL =process.env.REACT_APP_API_BASE_URL;

export const getstockdetail = async() =>{
    try{
    const customerId = localStorage.getItem("customerId");
    const token = localStorage.getItem("authToken");

    if (!customerId || !token) {
      console.warn("Missing customerId or token in localStorage");
      return null;
    }
    
    const response = await axios.post(
      `${BASE_URL}stockCart/getByCustomer`,
      { customerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("stock cart product data for customer:", response.data.data);
    return response.data.data; // ✅ return so caller can use it
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // ✅ re-throw so caller can handle
  }
}


export const handleDeleteStock = async (id) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("Missing authToken in localStorage");
      return null;
    }

    const response = await axios.delete(
      `${BASE_URL}stockCart/remove/${id}`, // ✅ fixed missing slash
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Deleted stock cart item:", response.data);
    return response.data; // ✅ return so caller can update UI
  } catch (error) {
    console.error("Error deleting stock item:", error);
    throw error; // ✅ let caller handle error
  }
};