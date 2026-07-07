import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const { wishlistItems } = useContext(WishlistContext);
  
  


  return (
    <nav>
      <h2>CloudCart</h2>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
        <Link to="/wishlist">Wishlist ({wishlistItems.length})</Link>
        <li><Link to="/orders">Orders</Link></li>

        {user?.role === "ADMIN" && (
          <>
            <li><Link to="/admin">Admin Dashboard</Link></li>
            <li><Link to="/admin/orders">Manage Orders</Link></li>
          </>
        )}

        {user ? (
          <>
            <li>👋 {user.email}</li>
            <li onClick={logout} style={{ cursor: "pointer" }}>Logout</li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;