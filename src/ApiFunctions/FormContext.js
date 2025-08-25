import React, { createContext, useContext, useState, useEffect } from "react";

// 🔹 Your sleeve default state
const emptySleeveState = {
  xs: 0,
  s: 0,
  m: 0,
  l: 0,
  xl: 0,
  xxl: 0,
};


// 🔹 Define default form data once
const defaultFormData = {
  quantity: "",
  logoCount: "0",
  logos: [],
  color: "",
  collarColor: 'true',
  hasCollarColor: true,
  logoFile: null,
  logoPosition: "",
  logoType: "",
  halftotal: 0,
  fulltotal: 0,
  grandtotal: 0,
  halfSleeve: { ...emptySleeveState },
  fullSleeve: { ...emptySleeveState },
  remark: "",
  cloth: "",
  clothMaterial: "",
  discountPerPiece: 0,
  discountedPrice: 0,
  basePrice: 0,
  deliveryDays: 0,
  estimatedDeliveryDate: "",
  printamount: "",
  emposedamount: "",
  finalAmount: 0,
};



// Step 1: Create Context
const FormContext = createContext();

// Step 2: Provider
export const FormProvider = ({ children }) => {
  // Load from localStorage if exists else default
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("customFormData");
    return saved ? JSON.parse(saved) : defaultFormData;
  });

  // Step 3: Sync changes → localStorage
  useEffect(() => {
    localStorage.setItem("customFormData", JSON.stringify(formData));
  }, [formData]);

  // Step 4: Optional reset function
  const resetForm = () => {
    setFormData(defaultFormData);
    localStorage.removeItem("customFormData");
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

// Step 5: Custom Hook
export const useFormContext = () => useContext(FormContext);
