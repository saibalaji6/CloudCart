import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");

  useEffect(() => {
    api
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      const matchesRating =
        minRating === "" || product.rating >= Number(minRating);

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOption("");
    setMaxPrice("");
    setMinRating("");
  };

  return (
    <div className="products-page">
      <h1>Products</h1>

      <div className="filter-panel">
        <input
          type="text"
          placeholder="Search products..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Gaming">Gaming</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        >
          <option value="">Minimum Rating</option>
          <option value="4.5">4.5+</option>
          <option value="4">4+</option>
          <option value="3">3+</option>
        </select>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
          <option value="name">Name: A-Z</option>
        </select>

        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <p>{filteredProducts.length} product(s) found</p>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;