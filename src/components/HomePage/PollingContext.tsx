import React, { createContext, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface PollingContextType {
  startPolling: (phone: string, orderCode: string) => void;
}

const PollingContext = createContext<PollingContextType | null>(null);

export const usePolling = () => {
  const context = useContext(PollingContext);
  if (!context) {
    throw new Error("usePolling must be used within a PollingProvider");
  }
  return context;
};

export const PollingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const pollPaymentStatus = async (phone: string, orderCode: string) => {
    try {
      const response = await fetch(
        `https://homehunt.somee.com/api/transaction/check-order?userPhone=${phone}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ orderCode }),
        }
      );

      if (!response.ok) {
        throw new Error(`Polling API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Polling result:", data);

      const status = data?.data?.paymentInfo?.status;
      if (status === "PAID" || status === "CANCELLED") {
        clearInterval(pollingRef.current!);
        pollingRef.current = null;
        console.log("Polling stopped:", status);

        // Clear saved state
        localStorage.removeItem("pollingData");

        if (status === "PAID") {
          alert("Payment completed successfully!");
        } else if (status === "CANCELLED") {
          alert("Payment was cancelled.");
        }
      } else {
        console.log("Payment still in progress. Retrying...");
      }
    } catch (error) {
      console.error("Error while polling:", error);
    }
  };

  const startPolling = (phone: string, orderCode: string) => {
    // Save polling data to localStorage
    localStorage.setItem("pollingData", JSON.stringify({ phone, orderCode }));

    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(
      () => pollPaymentStatus(phone, orderCode),
      10000
    );
    console.log("Polling started for orderCode:", orderCode);
  };

  useEffect(() => {
    // Check for saved polling data on app load
    const savedData = localStorage.getItem("pollingData");
    if (savedData) {
      const { phone, orderCode } = JSON.parse(savedData);
      console.log("Resuming polling for saved orderCode:", orderCode);
      startPolling(phone, orderCode);
    }
  }, []);

  return (
    <PollingContext.Provider value={{ startPolling }}>
      {children}
    </PollingContext.Provider>
  );
};
