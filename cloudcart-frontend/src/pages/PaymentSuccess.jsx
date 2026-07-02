import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="checkout-page">
      <h1>Payment Successful</h1>
      <p>Your payment was completed successfully.</p>
      <p>Your order confirmation will be processed.</p>

      <Link to="/orders">
        <button>View Orders</button>
      </Link>
    </div>
  );
}

export default PaymentSuccess;