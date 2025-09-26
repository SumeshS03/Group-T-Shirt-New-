import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const cancelProduct = async (orderId) => {
    const token = localStorage.getItem("authToken")
  try {
    const response = await axios.post(`${BASE_URL}order/cancel`, 
        {orderId: orderId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } // send orderId in request body
    );
    return response.data; // return the response to caller
  } catch (error) {
    console.error("Error cancelling product:", error);
    throw error; // rethrow so caller can handle it
  }
};


export const cancelstockorder = async (orderId) =>{
  const token = localStorage.getItem("authToken")
  try{
    const response = await axios.post(`${BASE_URL}stockOrder/cancelStockOrder`,
      {orderId: orderId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } // send orderId in request body
    )
    return response.data;
  }catch(error){
    console.error("Error cancelling product:", error);
    throw error; // rethrow so caller can handle it
  }
}