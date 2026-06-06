function Cart({
  cartItems,
  setShowCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
}) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <button onClick={() => setShowCart(false)}>
        Close
      </button>

      <h2>Cart ({cartItems.length})</h2>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>🛒 Your cart is empty.</p>
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
            alt="Empty cart illustration"
            style={{
              width: "100%",
              maxWidth: "280px",
              marginTop: "20px",
              borderRadius: "16px",
            }}
          />
        </div>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "15px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <button onClick={() => decreaseQuantity(item.id)}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQuantity(item.id)}>
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(index)}
              style={{
                marginTop: "10px",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <h2>Total: ₹{total}</h2>
    </div>
  );
}

export default Cart;