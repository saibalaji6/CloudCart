import { Link } from "react-router-dom";

function PaymentCancel() {
  return (
    <div className="checkout-page">
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. No amount was charged.</p>

      <Link to="/checkout">
        <button>Back to Checkout</button>
      </Link>
    </div>
  );
}

export default PaymentCancel;