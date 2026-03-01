import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(response.data.products);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const addToCart = (id) => {
    alert(`Product ${id} added to cart`);
  };

  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>
      <h2>Welcome {user?.name}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.product_id}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <h4>{product.name}</h4>
            <p style={{ color: "green", fontWeight: "bold" }}>
              ₹ {product.price}
            </p>

            <button
              onClick={() => addToCart(product.product_id)}
              style={{
                background: "#0d6efd",
                color: "white",
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;