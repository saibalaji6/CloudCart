import { createContext, useState } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const savedWishlist = localStorage.getItem("wishlist");

  const [wishlist, setWishlist] = useState(
    savedWishlist ? JSON.parse(savedWishlist) : []
  );

  const addToWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (!exists) {
      const updatedWishlist = [...wishlist, product];

      setWishlist(updatedWishlist);

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;