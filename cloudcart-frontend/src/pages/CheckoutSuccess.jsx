import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function CheckoutSuccess() {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="checkout-success">
      <h1>Payment Successful</h1>
      <p>Your order has been placed successfully.</p>
      <Link to="/orders">View Orders</Link>
    </div>
  );
}

export default CheckoutSuccess;