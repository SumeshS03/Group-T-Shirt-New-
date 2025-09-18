import axios from "axios";

const BASE_URL =process.env.REACT_APP_API_BASE_URL;

export const stockdetailcustomer = async () =>{
    try{
    const customerId = localStorage.getItem("customerId");
    const token = localStorage.getItem("authToken");

    if (!customerId || !token) {
      console.warn("Missing customerId or token in localStorage");
      return null;
    }

    const response = await axios.post(
        `${BASE_URL}stockOrder/get-by-customer`,{customerId},
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );
    console.log("Fetched stockdetail:", response.data);
    return response.data;
    }
    catch (error) {
    console.error("Error fetching product:", error);
    throw error; 
  }
}

export const stockdetailbystockid = async(id) =>{
  try{
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${BASE_URL}stockOrder/get-by-orderid`,
      { orderId: id },
      {
         headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("fetall product detail by stock id:",response.data);
    return response.data;


  }catch(error){
    console.error("Error fetching product:", error);
    throw error; 
  }
}