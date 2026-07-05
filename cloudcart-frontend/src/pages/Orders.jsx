import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  if (user?.email) {
    api
      .get(`/api/orders/user/${user.email}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }
}, [user]);

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>Date: {order.orderDate}</p>
            <p>Email: {order.userEmail}</p>
<p>Customer: {order.fullName}</p>
<p>Phone: {order.phoneNumber}</p>
<p>Address: {order.address}</p>
<p>Payment: {order.paymentMethod}</p>
<p>Status: {order.status}</p>

<h3>Total: ${order.totalPrice}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;