import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const INSURANCE_FEE_IN_CENTS = 1_00;
const DELIVERY_FEE_IN_CENTS = 2_00;

const Payment = () => {
  const [offer, setOffer] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setOffer(location.state?.offer);
  });

  if (!offer) {
    return;
  }

  const amountInCents =
    Math.round(offer.product_price * 100) +
    INSURANCE_FEE_IN_CENTS +
    DELIVERY_FEE_IN_CENTS;

  const options = {
    mode: "payment",
    amount: amountInCents,
    currency: "eur",
  };

  return (
    <main id="payment">
      <div className="container">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            productName={offer.product_name}
            productAmount={offer.product_price}
            insuranceAmount={INSURANCE_FEE_IN_CENTS / 100}
            deliveryAmount={DELIVERY_FEE_IN_CENTS / 100}
            totalAmount={amountInCents / 100}
          />
        </Elements>
      </div>
    </main>
  );
};

export default Payment;
