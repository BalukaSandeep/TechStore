import { useState, useEffect } from "react";
import data from "../data";
import ProductCard from "../ProductCard";
import Cart from "./Cart";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    if (exists) setWishlist(wishlist.filter((id) => id !== product.id));
    else setWishlist([...wishlist, product.id]);
  };

  const filteredProducts = data.filter(
    (product) =>
      (category === "All" || product.category === category) &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {showCart && (
        <Cart
          cartItems={cartItems}
          setShowCart={setShowCart}
          removeFromCart={(index) => setCartItems(cartItems.filter((_, i) => i !== index))}
          clearCart={() => setCartItems([])}
          increaseQuantity={(id) =>
            setCartItems(cartItems.map((it) => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it)))
          }
          decreaseQuantity={(id) =>
            setCartItems(
              cartItems
                .map((it) => (it.id === id ? { ...it, quantity: it.quantity - 1 } : it))
                .filter((it) => it.quantity > 0)
            )
          }
        />
      )}

      <div className="app">
        <nav className="navbar">
          <div className="logo">💎 <span>TechStore</span></div>

          <ul className="nav-links">
            <li><a href="#products">Products</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#reviews">Reviews</a></li>
          </ul>

          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="nav-buttons">
            <button
              className={"nav-action wishlist-small " + (wishlist.length > 0 ? "active" : "")}
              onClick={() => setShowWishlist(true)}
              aria-label="Open wishlist"
              title={`Wishlist (${wishlist.length})`}
            >
              <span className="label">Wishlist</span>
              <span className="count" aria-hidden>{wishlist.length}</span>
            </button>

            <button className="nav-action cart-btn" onClick={() => setShowCart(true)} aria-label="Open cart">
              <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M6 6h15l-1.68 9.39A2 2 0 0 1 17.36 17H9.6a2 2 0 0 1-1.98-1.7L6 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="20" r="1" fill="currentColor" />
                <circle cx="18" cy="20" r="1" fill="currentColor" />
              </svg>
              <span className="label">Cart</span>
              <span className="count" aria-hidden>{cartItems.length}</span>
            </button>
          </div>
        </nav>

        {showWishlist && (
          <div className="wishlist-overlay">
            <div className="wishlist-panel">
              <div className="wishlist-header">
                <h3>Your Wishlist</h3>
                <button className="close-btn" onClick={() => setShowWishlist(false)}>Close</button>
              </div>

              <div className="wishlist-list">
                {wishlist.length === 0 ? (
                  <p>No items in wishlist.</p>
                ) : (
                  wishlist.map((id) => {
                    const prod = data.find((p) => p.id === id);
                    return prod ? (
                      <div key={id} className="wishlist-item">
                        <img src={prod.image} alt={prod.name} />
                        <div>
                          <strong>{prod.name}</strong>
                          <div>₹ {prod.price}</div>
                        </div>
                      </div>
                    ) : null;
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hero */}
        <section className="hero">
          <span className="hero-badge">🚀 NEXT GEN TECH</span>
          <h1>
            Discover Premium
            <br />
            Gadgets & Devices
          </h1>
          <p>Built for speed, performance and innovation.</p>
          <div className="hero-buttons">
            <button onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}>Shop Now</button>
            <button>Explore</button>
          </div>
        </section>

        {/* Stats */}
        <section className="stats">
          <div className="stat-card"><h2>50K+</h2><p>Customers</p></div>
          <div className="stat-card"><h2>500+</h2><p>Products</p></div>
          <div className="stat-card"><h2>4.9 ⭐</h2><p>Rating</p></div>
          <div className="stat-card"><h2>24/7</h2><p>Support</p></div>
        </section>

        {/* Categories */}
        <section className="categories">
          <button onClick={() => setCategory("All")}>All</button>
          <button onClick={() => setCategory("Phones")}>Phones</button>
          <button onClick={() => setCategory("Laptops")}>Laptops</button>
          <button onClick={() => setCategory("Accessories")}>Accessories</button>
        </section>

        {/* Products */}
        <section id="products" className="products-section">
          <h2>Featured Products</h2>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                product={product}
                originalPrice={product.originalPrice}
                discount={product.discount}
                rating={product.rating}
                isBestSeller={product.isBestSeller}
                addToCart={() => addToCart(product)}
                isWishlisted={wishlist.includes(product.id)}
                toggleWishlist={() => toggleWishlist(product)}
              />
            ))}
          </div>
        </section>

        {/* Features, Reviews, Newsletter, Footer (kept concise) */}
        <section id="features" className="features">
          <h2>Why Choose TechStore?</h2>
          <div className="features-grid">
            <div className="feature-card"><h3>🚚 Free Delivery</h3><p>Fast shipping across India.</p></div>
            <div className="feature-card"><h3>🔒 Secure Payments</h3><p>100% safe checkout.</p></div>
            <div className="feature-card"><h3>⭐ Premium Quality</h3><p>Top rated gadgets.</p></div>
            <div className="feature-card"><h3>📞 Support</h3><p>Available 24/7.</p></div>
          </div>
        </section>

        <section id="reviews" className="testimonials">
          <h2>Customer Reviews</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card"><p>Amazing products and fast delivery.</p><h4>★★★★★</h4></div>
            <div className="testimonial-card"><p>Quality exceeded my expectations.</p><h4>★★★★★</h4></div>
            <div className="testimonial-card"><p>Best shopping experience.</p><h4>★★★★★</h4></div>
          </div>
        </section>

        <section className="newsletter">
          <h2>Get Exclusive Deals</h2>
          <p>Subscribe for offers and product updates.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={() => { alert(`Subscribed: ${email}`); setEmail(""); }}>Subscribe</button>
          </div>
        </section>

        <footer className="footer">
          <h3>💎 TechStore</h3>
          <p>Premium gadgets, laptops, smartphones and accessories.</p>
          <div className="footer-links"><span>Products</span><span>Support</span><span>Reviews</span><span>Contact</span></div>
          <p className="copyright">© 2026 TechStore. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default Home;
