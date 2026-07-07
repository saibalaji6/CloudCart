import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <h2>Your wishlist is empty</h2>
          <p>Save products you like and come back to them later.</p>
          <Link to="/products">
            <button>Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => {
            const cartItem = cartItems.find(
              (cartProduct) => cartProduct.id === item.id
            );

            return (
              <div className="wishlist-card" key={item.id}>
                <button
                  className="wishlist-heart active"
                  onClick={() => {
                    removeFromWishlist(item.id);
                    toast.info(`${item.name} removed from wishlist`);
                  }}
                >
                  ♥
                </button>

                <Link to={`/product/${item.id}`}>
                  <img
                    src={`/images/${item.imageUrl}`}
                    alt={item.name}
                    className="wishlist-image"
                  />
                </Link>

                <Link to={`/product/${item.id}`} className="wishlist-name">
                  {item.name}
                </Link>

                <p className="wishlist-desc">{item.description}</p>

                <p className="wishlist-rating">⭐ {item.rating}</p>

                <h2 className="wishlist-price">${item.price}</h2>

                {cartItem ? (
                  <div className="product-qty-control">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                ) : (
                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    + Add
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;