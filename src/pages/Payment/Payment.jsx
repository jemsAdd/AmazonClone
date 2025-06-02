import React, { useContext } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import classes from './payment.module.css';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard';

import { useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';

function Payment() {
  const [{ user, basket }] = useContext(DataContext);

  // Calculate total items and price
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const totalPrice = basket?.reduce((amount, item) => item.price * item.amount + amount, 0);

  const stripe = useStripe();
   const elements = useElements();
  
  return (
    <LayOut>
      {/* Payment Page */}
      <div className={classes.payment__header}>Checkout ({totalItem})</div>

      <section className={classes.payment}>
        {/* Delivery Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 woodmere dr</div>
            <div>Reston, VA</div>
          </div>
        </div>
        <hr />

        {/* Review Items */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} renderAdd={false} />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment Section */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              {/* Placeholder for Stripe card form */}
              <CardElement />
              
              <div className={classes.payment__price}>
                <span style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  fontWeight: "bold"
                }}>
                  <p>Total Order</p>
                  <CurrencyFormat amount={totalPrice} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;



