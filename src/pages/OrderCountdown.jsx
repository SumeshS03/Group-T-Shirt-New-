import { useState, useEffect } from "react";

const OrderCountdown = ({ createdAt, orderStatus, onExpire, orderId }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!createdAt || orderStatus !== "Pending") return;

    const startTime = new Date(createdAt).getTime();
    const countdownEnd = startTime + 76 * 60 * 60 * 1000; // 76 hours in ms

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = countdownEnd - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);

        // ✅ Notify parent to cancel the order
        if (typeof onExpire === "function") {
          onExpire(orderId);
        }
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt, orderStatus, onExpire, orderId]);

  return (
    <span className="text-danger fs-6 px-2">
      {orderStatus === "Pending" ? `Order Cancelled in ${timeLeft} left` : "Order Cancelled"}
    </span>
  );
};

export default OrderCountdown;
