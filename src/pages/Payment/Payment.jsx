// /* eslint-disable no-unused-vars */
// import React, { useContext } from 'react';
// import LayOut from '../../components/LayOut/LayOut';
// import classes from './payment.module.css';
// import { DataContext } from '../../components/DataProvider/DataProvider';
// import ProductCard from '../../components/Product/ProductCard';
// import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
// import { useStripe, useElements } from "@stripe/react-stripe-js";


// function Payment() {
//   const [{ user, basket }] = useContext(DataContext);

//   // Calculate total items and price
//   const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
//   const totalPrice = basket?.reduce((amount, item) => item.price * item.amount + amount, 0);

//    // eslint-disable-next-line no-undef
//    const [cardError, setCardError] = useState(null);
//   const stripe = useStripe();
//    const elements = useElements();
  
//     const handleChange = (e) => {
//     // console.log(e)
//     e?.error?.message?  setCardError(e?.error?.message):setCardError("")
//   };
//   return (
//     <LayOut>
//       {/* Payment Page */}
//       <div className={classes.payment__header}>Checkout ({totalItem})</div>

//       <section className={classes.payment}>
//         {/* Delivery Address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>123 woodmere dr</div>
//             <div>Reston, VA</div>
//           </div>
//         </div>
//         <hr />

//         {/* Review Items */}
//         <div className={classes.flex}>
//           <h3>Review items and delivery</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard key={item.id} product={item} flex={true} renderAdd={false} />
//             ))}
//           </div>
//         </div>
//         <hr />

//         {/* Payment Section */}
//         <div className={classes.flex}>
//           <h3>Payment Method</h3>
//           <div className={classes.payment__card__container}>
//             <div className={classes.payment__details}>
//               {/* Placeholder for Stripe card form */}
//               <CardElement />
              
//               <div className={classes.payment__price}>
//                 <span style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   gap: "10px",
//                   fontWeight: "bold"
//                 }}>
//                   <p>Total Order</p>
//                   <CurrencyFormat amount={totalPrice} />
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Payment;


import React ,{useContext,useState}from "react";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
 import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const totalPrice = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

   const stripe = useStripe();
   const elements = useElements();
   const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e)
    e?.error?.message?  setCardError(e?.error?.message):setCardError("")
  };
  const handlePayment = async(e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${totalPrice * 100}`,
      });
      console.log("payment page", response.data);
      const clientSecret = response.data?.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empty the basket
      dispatch({
        type: Type.EMPTY_BASKET,
      });
      // console.log(confirmation)
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed A new order" } });
    } catch (error) {
      console.log("error ####", error);
      setProcessing(false);
    }
  }

  return (
    <LayOut>
      {/* payment page */}
      <div className={classes.payment__header}>checkout ({totalItem})</div>

      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 woodmere dr</div>
            <div>Reston, VA</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery </h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} renderAdd={false} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods </h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>

                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap:"10Px",
                        fontWeight: "bold",
                      }}
                    >
                      <p>Total Order</p> |{" "}
                      <CurrencyFormat amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={15} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
