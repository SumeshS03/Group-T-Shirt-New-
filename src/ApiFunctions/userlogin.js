import axios from "axios";


const BASE_URL =process.env.REACT_APP_API_BASE_URL;


export const sentOtp = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/send-customer-otp`,
      formData, // ✅ body data here
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // ✅ return useful response
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error; // rethrow so caller can handle
  }
};


export const verifyotp = async (formData) =>{
    try{
        const response = await axios.post(
            `${BASE_URL}/auth/verify-customer-otp`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch(error){
        console.error("Error sending VerifyOTP:", error);
        throw error;
    }
}