import { useEffect, useState } from "react";

function CountdownTimer({ createdAt, onExpire, orderId, advancePaid }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const createdTime = new Date(createdAt);
    const expiryTime = new Date(createdTime.getTime() + 76 * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = expiryTime - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(timer);

        // ✅ Only auto-cancel if advance not paid
        if (advancePaid === 0 && onExpire) {
          onExpire(orderId);
        }
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s left`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [createdAt, orderId, advancePaid, onExpire]);

  return (
    <span className="p-2 text-danger fs-6">
      Order Cancelled in {timeLeft}
    </span>
  );
}


export default CountdownTimer;
