import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

 useEffect(() => {
  api
    .get(`/api/products/${id}`)
    .then((response) => {
      setProduct(response.data);
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
    });

  fetchReviews();
}, [id]);
  const fetchReviews = () => {
    api
      .get(`/reviews/product/${id}`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error(error));
  };

  const handleReviewChange = (event) => {
    setNewReview({
      ...newReview,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitReview = async () => {
    if (!user) {
      alert("Please login to write a review");
      return;
    }

    if (!newReview.comment) {
      alert("Please write a review comment");
      return;
    }

    try {
      await api.post("/reviews", {
        productId: Number(id),
        userEmail: user.email,
        rating: Number(newReview.rating),
        comment: newReview.comment,
      });

      alert("Review added successfully");

      setNewReview({
        rating: 5,
        comment: "",
      });

      fetchReviews();
    } catch (error) {
      console.error(error);
      alert("Failed to add review");
    }
  };

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const imagePath = `/src/assets/images/${product.imageUrl}`;

  return (
    <div className="product-details">
      <img src={imagePath} alt={product.name} />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>⭐ {product.rating}</p>

      <h2>${product.price}</h2>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <hr />

      <h2>Write a Review</h2>

      <select
        name="rating"
        value={newReview.rating}
        onChange={handleReviewChange}
      >
        <option value="5">⭐⭐⭐⭐⭐ 5</option>
        <option value="4">⭐⭐⭐⭐ 4</option>
        <option value="3">⭐⭐⭐ 3</option>
        <option value="2">⭐⭐ 2</option>
        <option value="1">⭐ 1</option>
      </select>

      <textarea
        name="comment"
        placeholder="Write your review..."
        value={newReview.comment}
        onChange={handleReviewChange}
      />

      <button onClick={handleSubmitReview}>
        Submit Review
      </button>

      <h2>Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <p>⭐ {review.rating}</p>
            <p>{review.comment}</p>
            <small>{review.userEmail}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductDetails;