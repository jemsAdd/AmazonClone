// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing/Landing";
// import Payment from "./pages/Payment/Payment";
// import Auth from "./pages/Auth/Auth";
// import Orders from "./pages/Orders/Orders";
// import Cart from "./pages/Cart/Cart"
// import Results from './pages/Results/Results'
// import ProductDetail from './pages/ProductDetail/ProductDetail'

// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51RURT8QqZzwaUJpsuZy0Bro14tNB44fSt5jDQBMByFx3jd0hyUtwtRaX5ZWenqpe2TVm6gI8OR4kOr11oeNnDfa100K74KyzES');
// function Routing() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing/>} />
//         <Route path="/auth" element={<Auth />} />
//         <Route
//           path="/payments"
//           element={
//             <ProtectedRoute msg={"you must login to pay"} redirect="/payments">
//               <Elements stripe={stripePromise}>
//                 <Payment />
//               </Elements>
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/orders" element={<Orders/>} />
//         <Route path="/category/:categoryName" element={<Results/>} />
//         <Route path="/products/:productId" element={<ProductDetail />} />
//         <Route path="/cart" element={<Cart/>} />
//       </Routes>
//     </Router>
//   );
// }

// export default Routing;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Auth from "./pages/Auth/Auth";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51RURT8QqZzwaUJpsuZy0Bro14tNB44fSt5jDQBMByFx3jd0hyUtwtRaX5ZWenqpe2TVm6gI8OR4kOr11oeNnDfa100K74KyzES"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute msg={"you must login to pay"} redirect="/payments">
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        {/* <Route path="/orders" element={<Orders /> }/> */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must login to access your orders"}
              redirect="/orders"
            >
              {/* <Elements stripe={stripePromise}> */}
                <Orders />
              {/* </Elements> */}
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
