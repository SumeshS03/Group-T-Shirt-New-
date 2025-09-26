import axios, { Axios } from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const update = async (formData) => {
  const id = localStorage.getItem("customerId"); // 👈 use customerId instead of categoryId?
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.put(
      `${BASE_URL}customers/update/${id}`, // API endpoint
      formData, // 👈 send formData directly
      {
        headers: {
          Authorization: `Bearer ${token}`, // pass token
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Profile updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};