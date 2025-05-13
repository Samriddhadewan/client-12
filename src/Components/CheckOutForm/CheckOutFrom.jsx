import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckOutFrom = ({request}) => {
  console.log(request)
  const navigate = useNavigate();
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", {price: request?.fees})
    .then(res=>{
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    })
  },[axiosSecure, request?.fees]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError(" ");
    }


    // confirm card payment 
    const {paymentIntent ,error:confirmErr} = await stripe.confirmCardPayment(clientSecret,{
      payment_method : {
        card: card,
        billing_details:{
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous"
        }
      }
    })

    if(confirmErr){
      console.log("confirm error")
    }
    else{
      console.log(paymentIntent)
      if(paymentIntent.status === "succeeded"){
        setTransactionId(paymentIntent?.id);
        const paymentData = {
          camp_id : request?.camp_id,
          paid_amount: request?.fees,
          participant_email:user?.email,
          participant_name:user?.displayName,
          camp_name: request?.camp_name,
          transaction_id:paymentIntent?.id,
        }
        axiosSecure.post("/payment", paymentData)
        .then(res=>{
          if(res.data.insertedId){
            toast.success("successfully Paid to the camp");
            navigate("/dashboard/manageRequests")
          }
        })
      }
    }


  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn btn-primary" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && <p className="text-green-400">Your transaction Id is{transactionId}</p>}
    </form>
  );
};

export default CheckOutFrom;
