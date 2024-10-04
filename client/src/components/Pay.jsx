
import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useHistory } from "react-router"

const StripeKey = "pk_test_51Q624iRrwERZ54J8tuLum6IK0hbbyqHLGMHlVkint5FiYE7aHa9i8GaE6bhe4KzBqcF5dVVdVvLp4QKpNuFqUU0400Af0xhzE0"

const Pay = () => {
  const [hover, setHover] = useState(false);
  const [stripeToken, setStripeToken] = useState("null");
  const history = useHistory();


  const onToken = (token) => {
    setStripeToken(token);
  }

  useEffect(()=>{
    const makeRequest = async () => {
      try{
        const res = await axios.post(
          "http://localhost:3000//api/checkout/payment",
          {
            tokenId : stripeToken.id,
            amount : 2000,
          }
        );
        console.log(res.data);
        
      }catch(err){
        console.log(err);
      }
    }
    stripeToken && makeRequest();
  },[stripeToken]);

  return (
    <StripeCheckout
      name='Dezcom'
      image='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser-avatar_6596121&psig=AOvVaw36f25kOQTimHF2qnLYKiB7&ust=1728113101364000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNDelpGZ9IgDFQAAAAAdAAAAABAE'
      billingAddress
      shippingAddress
      description='Total is €200'
      amount={1000}
      token={onToken}
      stripeKey={StripeKey}
    >
      <button
      className={`px-6 py-3 border-2 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out 
          ${hover ? 'bg-white text-gray-900 shadow-lg' : 'bg-gray-900 text-white border-gray-600'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      >
          Pay
      </button>
    </StripeCheckout>
  );
};

export default Pay;
