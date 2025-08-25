import axios from "axios";


const BASE_URL =process.env.REACT_APP_API_BASE_URL;



export const getproductdetail = async () => {
  try {
    const customerId = localStorage.getItem("customerId");
    const token = localStorage.getItem("authToken");

    if (!customerId || !token) {
      console.warn("Missing customerId or token in localStorage");
      return null;
    }

    const response = await axios.get(
      `${BASE_URL}/cartItems/list/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Fetched product:", response.data);
    return response.data; // ✅ return so caller can use it
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // ✅ re-throw so caller can handle
  }
};


export const deleteproductbyid = async (id) => {
  try {
    const customerId = localStorage.getItem("customerId");
    const token = localStorage.getItem("authToken");

    if (!customerId || !token) {
      console.warn("Missing customerId or token in localStorage");
      return null;
    }

    const response = await axios.post(
      `${BASE_URL}/cartItems/delete`,
      {
        customerId: customerId,
        cartItemId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Deleted product:", response.data);
    return response.data; // ✅ return response so caller can use it
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};



export const addproducttopayment = async (cartdetail) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/order/create`,
      cartdetail,   // 🟢 this is the body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in addproducttopayment:", error);
    throw error;
  } finally{
    try {
      
      const products = await getproductdetail();

      if (products && Array.isArray(products)) {
        
        products.forEach((item) => {
          console.log("Cart Item ID:", item._id);
          const id = item._id;
          deleteproductbyid(id);
        });
      } else {
        console.warn("No products found after payment.");
      }
    } catch (err) {
      console.error("Error fetching product details in finally:", err);
    }
  }
};


export const getOrderProduct = async () => {
  try {
    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
      throw new Error("Customer ID not found in localStorage");
    }

    const response = await axios.post(
      `${BASE_URL}/order/get-by-customer`,
      { customerId }, // request body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    
    return response.data;
  } catch (error) {
    console.error("Error in getOrderProduct detail:", error);
    throw error;
  }
};


export const viewdetails = async (id) =>{

  try{
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      throw new Error("Customer ID not found in localStorage");
    }

    const response = await axios.post(
      `${BASE_URL}/order/get-by-orderid`,
      { customerId : customerId,
        orderId : id,
       }, // request body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    
    return response.data;

  }
  catch (error){
    console.error("Error in getOrderProduct detail:", error);
    throw error;
  }

}

