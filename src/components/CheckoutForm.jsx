import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({
  productName,
  productAmount,
  insuranceAmount,
  deliveryAmount,
  totalAmount,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (null === elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);

      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/payment`,
      {
        productName: productName,
        amountInCents: Math.round(totalAmount * 100),
      }
    );

    const clientSecret = response.data.client_secret;

    const stripeResponse = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: document.location.href,
      },
      redirect: "if_required",
    });

    if (stripeResponse.error) {
      setErrorMessage(stripeResponse.error.message);
    }

    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }

    setIsLoading(false);
  };

  return completed ? (
    <p>Paiement effectué</p>
  ) : (
    <>
      <div className="payment-block">
        <h1>Résumé de la commande</h1>
        <div>
          <ul className="amounts">
            <li>
              Commande{" "}
              <span>{productAmount.toFixed(2).replace(".", ",")} €</span>
            </li>
            <li>
              Frais protection acheteurs{" "}
              <span>{insuranceAmount.toFixed(2).replace(".", ",")} €</span>
            </li>
            <li>
              Frais de port{" "}
              <span>{deliveryAmount.toFixed(2).replace(".", ",")} €</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="total-amount amounts">
            <li>
              Total <span>{totalAmount.toFixed(2).replace(".", ",")} €</span>
            </li>
          </ul>
        </div>
        <p>
          Il ne vous reste plus qu'un étape pour vous offrir{" "}
          <strong>{productName}</strong>. Vous allez payer{" "}
          <strong>{totalAmount.toFixed(2).replace(".", ",")} €</strong> (frais
          de protection et frais de port inclus).
        </p>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button type="submit" disabled={isLoading}>
            Pay
          </button>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
