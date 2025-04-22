import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = () => {
  const [success, setSuccess] = useState(false);

  const handleApprove = (orderID) => {
    setSuccess(true);
    console.log("Төлем сәтті аяқталды! Order ID:", orderID);
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AYrGzAFKitQwR53r3vMV9RHt0Wrygn7UQNvhZBEbFkWvj7mAsbl3EKP7gBvePDUX2LQm6C87vSAF2TFm" }}>
      <div>
        <h3>Төлем жасау</h3>
        {success ? (
          <h4>✅ Төлем сәтті өтті!</h4>
        ) : (
            <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: "Aventra Туры - Алматы",
                    amount: {
                      value: "0.10",
                    },
                    payee: {
                      email_address: "seller@example.com",
                    },
                  },
                ],
                payer: {
                  name: {
                    given_name: "Азамат",
                    surname: "Жақсылық",
                  },
                },
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                console.log("Төлем сәтті өтті!", details);
              });
            }}
          />
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
