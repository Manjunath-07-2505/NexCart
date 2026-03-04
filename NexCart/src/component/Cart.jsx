import React, { useEffect, useState } from "react";
import "./Cart.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const token = localStorage.getItem("token");

  // ✅ Fetch Cart Items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:9090/api/cart/items",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();

        console.log("FULL CART RESPONSE:", data);

        const items = data?.cart?.products || [];

        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      }
    };

    fetchCartItems();
  }, [token]);

  // ✅ Calculate Subtotal Safely
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const price =
        Number(item.product?.price) ||
        Number(item.price_per_unit) ||
        Number(item.price) ||
        0;

      const quantity = Number(item.quantity) || 0;

      return sum + price * quantity;
    }, 0);

    setSubtotal(total);
  }, [cartItems]);

  // ✅ Remove Item (Fixed DELETE)
  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(
        "http://localhost:9090/api/cart/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Remove from UI instantly
      setCartItems((prev) =>
        prev.filter(
          (item) =>
            item.product?.product_id !== productId
        )
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => {
            const product = item.product || {};

            const price =
              Number(product.price) ||
              Number(item.price_per_unit) ||
              Number(item.price) ||
              0;

            const quantity = Number(item.quantity) || 0;

            const name =
              product.name || item.name || "Product";

            const image =
              product.imageUrl
                ? `http://localhost:9090/uploads/${product.imageUrl}`
                : "https://via.placeholder.com/80";

            const itemSubtotal = price * quantity;

            return (
              <div key={index} className="cart-card">
                <img
                  src={image}
                  alt={name}
                  className="cart-image"
                />

                <div className="cart-details">
                  <h4>{name}</h4>
                  <p>₹ {price}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Subtotal: ₹ {itemSubtotal}</p>
                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleRemoveItem(
                      product.product_id
                    )
                  }
                >
                  🗑
                </button>
              </div>
            );
          })}

          <div className="cart-summary">
            <div className="row">
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>

            <div className="row">
              <span>Delivery</span>
              <span>₹ 30</span>
            </div>

            <div className="row total">
              <span>Total</span>
              <span>₹ {subtotal + 30}</span>
            </div>

            <button className="pay-btn">
              Pay ₹ {subtotal + 30}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;