import { createContext, useState } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const savedWishlist = localStorage.getItem("wishlist");

  const [wishlistItems, setWishlistItems] = useState(
    savedWishlist ? JSON.parse(savedWishlist) : []
  );

  const saveWishlist = (items) => {
    setWishlistItems(items);
    localStorage.setItem("wishlist", JSON.stringify(items));
  };

  const addToWishlist = (product) => {
    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (!exists) {
      saveWishlist([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== productId
    );

    saveWishlist(updatedWishlist);
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;