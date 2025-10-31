import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const handlePayment = async (id, amount) => {
  const res = await loadRazorpay(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
    Swal.fire("Error", "Razorpay SDK failed to load. Are you online?", "error");
    return;
  }

  try {
    // 1. Call backend to create Razorpay order
    console.log("Creating Razorpay order...");
    const { data: orderData } = await axios.post(
      `${BASE_URL}/payment/razorpay/order`,
      {
        orderId: id,
        advanceAmount: amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    const { razorpayOrderId, amount, currency, key, orderId } = orderData;

    console.log("orderData", orderData);

    // 2. Configure Razorpay checkout
    const options = {
      key,
      amount,
      currency,
      name: "GroupTshirts",
      description: "Custom T-shirt Order",
      order_id: razorpayOrderId, // Razorpay's order id
      handler: async function (response) {
        try {
          // 3. Call backend to verify payment
          const { data: verifyRes } = await axios.post(
            `${BASE_URL}/payment/razorpay/verify`,
            {
              orderId, // our own order id (app’s)
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );

          console.log("verifyRes.success", verifyRes);

          if (verifyRes.message === "Payment verified and order updated") {
            Swal.fire("Success", "✅ Payment Successful!", "success").then(
              () => {
                window.location.reload(); // reload only after OK is clicked
              }
            );
          } else {
            Swal.fire("Error", "❌ Payment Verification Failed!", "error");
          }
        } catch (err) {
          console.error("Verification error:", err);
          Swal.fire("Error", "❌ Error verifying payment", "error");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Order creation error:", err);
    Swal.fire("Error", "❌ Failed to create Razorpay order", "error");
  }
};
