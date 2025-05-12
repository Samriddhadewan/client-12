import SectionTitle from "../../SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutFrom from "../../CheckOutForm/CheckOutFrom";
import { useLocation, } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const location = useLocation();
  const request = location.state?.request;

  return (
    <div className="px-4">
      <SectionTitle
        subHeading="Pay for the camp"
        heading="PAY NOW"
      ></SectionTitle>
      <div>
        <Elements  stripe={stripePromise}>
          <CheckOutFrom  request={request}/>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
