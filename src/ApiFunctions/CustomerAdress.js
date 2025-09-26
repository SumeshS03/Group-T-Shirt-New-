import axios from "axios";

const BASE_URL =process.env.REACT_APP_API_BASE_URL;

export const addNewAddress = async (formData) => {
  try {
    const customerId = localStorage.getItem("customerId");
    const token = localStorage.getItem("authToken");

    // Add customerId to formData
    const payload = { ...formData, customerId };

    const response = await axios.post(`${BASE_URL}customerAddress/add`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // return response data to use in UI
    return response.data;
  } catch (error) {
    console.error("Failed to add new address:", error);
    throw error; // rethrow to handle in UI
  }
};


export const getuseraddressdetail = async () =>{
    try{
        const customerId = localStorage.getItem("customerId");
        const token = localStorage.getItem("authToken");

         const response = await axios.post(`${BASE_URL}customerAddress/getByCustomer`, {customerId:customerId}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("User Address Response:", response.data); // ✅ log the response
    return response.data; // ✅ return data to use in UI

    }catch (error){
    console.error("Failed to add new address:", error);
    throw error; // rethrow to handle in UI

    }
}

export const deleteuseraddress = async (id) =>{
    try{
        const customerId = localStorage.getItem("customerId");
        const token = localStorage.getItem("authToken");

        const response = await axios.post(`${BASE_URL}customerAddress/delete`,{
            customerId:customerId,
            addressId:id},{
                headers: {
        Authorization: `Bearer ${token}`,
      },
            })
            console.log("user address delete:" ,response.data);
            return response.data;

    }catch(error){
    console.error("Failed to add new address:", error);
    throw error; 

    }
}


export const getcustomeraddressbyid = async(id) =>{
    try{
        const customerId = localStorage.getItem("customerId");
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`${BASE_URL}customerAddress/getByAddressId`,{
            customerId:customerId,
            addressId:id},{
                headers: {
        Authorization: `Bearer ${token}`,
      },
            })
            console.log("user address by selected id:" ,response.data);
            return response.data;

    }catch(error){
        console.error("Failed to add new address:", error);
    throw error;

    }
}


// ApiFunctions/CustomerAdress.js
// ApiFunctions/CustomerAdress.js
export const updateUserAddress = async (addressId, updateData) => {
  try {
    const customerId = localStorage.getItem("customerId");
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${BASE_URL}customerAddress/update`,
      {
        customerId: customerId,
        addressId: addressId,
        updateData: updateData, // ✅ wrap inside updateData
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return response data (the updated address object)
    return response.data;
  } catch (error) {
    console.error("Failed to update address:", error);
    throw error;
  }
};



