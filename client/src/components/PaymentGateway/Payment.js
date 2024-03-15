import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey)); 
    });
  }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
          // Required properties for your payment service
          amount: 30000, // Replace with your actual total amount
          currency: "eur", // Replace with your desired currency code (e.g., "eur", "jpy")    
          // Optional properties depending on your service and needs
          description: "Your product or service description",
        }),
    }).then(async (result) => {

      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    }).catch(err => console.log("Error in payment component",err));
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
