import { useSelector, useDispatch   } from "react-redux";
import { Link } from "react-router-dom";
import { ProductDetails } from "./";
import { useEffect, useState } from "react";
import { GB_CURRENCY } from "../utils/constants";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  removeFromCart,
  decrementInCart,
  incrementInCart,
} from "../redux/cartSlice";

import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "/";
import CheckoutForm from "./PaymentGateway/CheckoutForm";

// const stripePromise = loadStripe(
//   `pk_test_51OqTT5AlxzmPSqHG2Wm6baOLfx5Rqyxb47tJkodvtMRPA0kroPnYRG9kAZfpDTUuqOPYCUOSM6AoAR3FHftU87SH00i1ZmSMtq`
// );

// const createCheckOutSession = async () => {
//   console.log("createCheckOutSession");
//   const stripe = await stripePromise;

//   // call the backend to checkout...
//   const checkoutSession = await axios.post("/api/create-checkout-session", {
//     // items
//     items: [{ Firstline: "Ahmed" }, { Secondline: "Eslam" }],
//     email: "eslam@gmail.com",
//   });

//   // redirect to checkout page with session id
//   const result = await stripe.redirectToCheckout({
//     sessionId: checkoutSession.data.id,
//   });

//   // if(result.error) alert(result.error.message);
// };


// const [stripePromise, setStripePromise] = useState(null);
// const [clientSecret, setClientSecret] = useState("");

// useEffect(() => {
//   fetch("/config").then(async (r) => {
//     const { publishableKey } = await r.json();
//     setStripePromise(loadStripe(publishableKey));
//   });
// }, []);

// useEffect(() => {
//   fetch("/create-payment-intent", {
//     method: "POST",
//     body: JSON.stringify({}),
//   }).then(async (result) => {
//     var { clientSecret } = await result.json();
//     setClientSecret(clientSecret);
//   });
// }, []);



const Checkout = () => {

  // 
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
    body: JSON.stringify({}),
  }).then(async (result) => {
    var { clientSecret } = await result.json();
    setClientSecret(clientSecret);
  });
}, []);











  const products = useSelector((state) => state.cart.products);
  const itemsNumber = useSelector((state) => state.cart.productsNumber);
  const subtotal = useSelector((state) =>
    state.cart.products.reduce(
      (subtotal, product) => subtotal + product.price * product.quantity,
      0
    )
  );
  const dispatch = useDispatch();

  return (
    <div className="h-screen bg-amazonclone-background">
      <div className="min-w-[1000px] max-w-[1500px] m-auto pt-8">
        <div className="grid grid-cols-8 gap-10">
          {/* Products */}
          <div className="col-span-6 bg-white">
            <div className="text-2xl xl:text-3xl m-4">Shopping Cart</div>
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <div className="grid grid-cols-12 divide-y divide-gray-400 mr-4">
                    <div className="col-span-10 grid grid-cols-8 divide-y divide-gray-400">
                      <div className="col-span-2">
                        <Link to={`/product/${product.id}`}>
                          <img
                            className="p-4 m-auto"
                            src={product.image_small}
                            alt="Checkout product"
                          />
                        </Link>
                      </div>
                      <div className="col-span-6">
                        <div className="font-medium text-black mt-2">
                          <Link to={`/product/${product.id}`}>
                            <ProductDetails product={product} ratings={false} />
                          </Link>
                        </div>
                        <div>
                          <button
                            className="text-sm xl:text-base font-semibold rounded text-blue-500 mt-2 mb-1 cursor-pointer"
                            onClick={() => dispatch(removeFromCart(product.id))}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="grid grid-cols-3 w-20 text-center">
                          <div
                            className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer"
                            onClick={() =>
                              dispatch(decrementInCart(product.id))
                            }
                          >
                            -
                          </div>
                          <div className="text-lg xl:text-xl bg-gray-200">
                            {product.quantity}
                          </div>
                          <div
                            className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer"
                            onClick={() =>
                              dispatch(incrementInCart(product.id))
                            }
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-lg xl:text-xl mt-2 mr-4 font-semibold">
                        {GB_CURRENCY.format(product.price)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="text-lg xl:text-xl text-right mb-4 mr-4">
              Subtotal ({itemsNumber} items):{" "}
              <span className="font-semibold">
                {GB_CURRENCY.format(subtotal)}
              </span>
            </div>
          </div>
          {/* Checkout */}
          <div className="col-span-2 bg-white rounded h-[250px] p-7">
            <div className="text-xs xl:text-sm text-green-800 mb-2">
              Your order qualifies for{" "}
              <span className="font-bold">FREE DELIVERY</span>. Delivery Details
            </div>
            <div className="text-base xl:text-lg mb-4">
              Subtotal ({itemsNumber} items):{" "}
              <span className="font-semibold">
                {GB_CURRENCY.format(subtotal)}
              </span>
            </div>
            <Link to={"/payment"}>
            
            <button className="btn">

              Proceed to Checkout
            </button> 
            </Link>
             
            {/* test */}
            {/* {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )} */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
