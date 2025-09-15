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
      `${BASE_URL}/stockCart/getByCustomer`,
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