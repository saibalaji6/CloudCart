import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const imagePath = product.imageUrl;

  return (
    <div className="product-card">
      <img src={imagePath} alt={product.name} />

      <Link to={`/product/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>

      <p>{product.description}</p>

      <p className="rating">⭐ {product.rating}</p>

      <h4>${product.price}</h4>

      <button onClick={() => addToCart(product)}>Add to Cart</button>

      <button onClick={() => addToWishlist(product)}>❤️ Wishlist</button>
    </div>
  );
}

export default ProductCard;