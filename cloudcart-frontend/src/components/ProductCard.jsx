import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <div className="product-card">
      <button
        className={`wishlist-heart ${isWishlisted ? "active" : ""}`}
        onClick={handleWishlist}
      >
        {isWishlisted ? "❤️" : "♡"}
      </button>

      <img src={`/images/${product.imageUrl}`} alt={product.name} />

      <Link to={`/product/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>

      <p>{product.description}</p>

      <p className="rating">⭐ {product.rating}</p>

      <h4>${product.price}</h4>

      {cartItem ? (
        <div className="product-qty-control">
          <button onClick={() => decreaseQuantity(product.id)}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={() => increaseQuantity(product.id)}>+</button>
        </div>
      ) : (
        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;