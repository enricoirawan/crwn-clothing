import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publisableKey =
    "pk_test_51HMZjjEOkbQOV1MVLWgYXRWmSwRGznksyl55jTr2ljIfKRdnM4evvteXip04PQznLQYobI6i7nWAc3bIMPenTuhn0079V3pP8g";

  const onToken = (token) => {
    console.log(token);
    alert("Payment successfull");
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="CRWN Clothing Ltd"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publisableKey}
    />
  );
};

export default StripeCheckoutButton;
