import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Checkout() {
  const { cartItems, placeOrder } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
  fullName: "",
  phoneNumber: "",
  address: "",
  paymentMethod: "Stripe",
});

  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.warning("Please login before checkout.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.warning("Your cart is empty.");
      return;
    }

    if (!customer.fullName || !customer.phoneNumber || !customer.address) {
      toast.warning("Please fill all checkout details.");
      return;
    }

    setLoading(true);

    try {
      if (customer.paymentMethod === "Cash On Delivery") {
  await api.post("/api/orders", {
    userEmail: user.email,
    fullName: customer.fullName,
    phoneNumber: customer.phoneNumber,
    address: customer.address,
    paymentMethod: customer.paymentMethod,
    totalPrice: totalPrice,
  });

  placeOrder(customer);
  toast.success("Order placed successfully!");
  setLoading(false);
  navigate("/orders");
  return;
}

      

const response = await api.post("/api/payments/create-checkout-session", {
  totalPrice: totalPrice,
});

window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <h2>Order Summary</h2>

      {cartItems.map((item, index) => (
        <div className="checkout-item" key={index}>
          <span>{item.name}</span>
          <span>
            {item.quantity} × ${item.price}
          </span>
        </div>
      ))}

      <h2>Total: ${totalPrice.toFixed(2)}</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={customer.fullName}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={customer.phoneNumber}
        onChange={handleChange}
      />

      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={customer.address}
        onChange={handleChange}
      />

      <select
  name="paymentMethod"
  value={customer.paymentMethod}
  onChange={handleChange}
>
  <option value="Stripe">Credit / Debit Card (Stripe)</option>
  <option value="Cash On Delivery">Cash On Delivery</option>
</select>

      <button onClick={handlePlaceOrder} disabled={loading}>
        {loading
          ? "Processing..."
          : customer.paymentMethod === "Cash On Delivery"
          ? "Place Order"
          : "Pay with Stripe"}
      </button>
    </div>
  );
}

export default Checkout;