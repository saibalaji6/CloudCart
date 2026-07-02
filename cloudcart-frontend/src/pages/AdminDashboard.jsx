import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    rating: "",
    imageUrl: "",
    description: "",
  });

  const fetchProducts = () => {
    api
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (event) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      category: "",
      price: "",
      rating: "",
      imageUrl: "",
      description: "",
    });
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);

    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      rating: product.rating,
      imageUrl: product.imageUrl,
      description: product.description,
    });
  };

  const handleSubmitProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.rating ||
      !newProduct.imageUrl ||
      !newProduct.description
    ) {
      alert("Please fill all product fields");
      return;
    }

    const productData = {
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      rating: Number(newProduct.rating),
      imageUrl: newProduct.imageUrl,
      description: newProduct.description,
    };

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productData);
        alert("Product updated successfully");
      } else {
        await api.post("/products", productData);
        alert("Product added successfully");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

      <div className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={newProduct.rating}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image file name, example: headphones.jpeg"
          value={newProduct.imageUrl}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
        />

        <button onClick={handleSubmitProduct}>
          {editingProduct ? "Update Product" : "Add Product"}
        </button>

        {editingProduct && (
          <button onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </div>

      <h2>Product Management</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>⭐ {product.rating}</td>
              <td>{product.imageUrl}</td>
              <td>
                <button onClick={() => handleEditClick(product)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;