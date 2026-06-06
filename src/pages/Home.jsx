
import { useState, useEffect } from "react";
import data from "../data";
import ProductCard from "../ProductCard";
import Cart from "./Cart";
function Home() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [email, setEmail] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [showCart, setShowCart] = useState(false);

    const addToCart = (product) => {
        const existing = cartItems.find(
            (item) => item.id === product.id
        );

        if (existing) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems([
                ...cartItems,
                { ...product, quantity: 1 }
            ]);
        }
    };

    const removeFromCart = (index) => {
        const updated = cartItems.filter((_, i) => i !== index);
        setCartItems(updated);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const increaseQuantity = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };
    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    useEffect(() => {
        setCartCount(cartItems.length);
    }, [cartItems]);

    const filteredProducts = data.filter(
        (product) =>
            (category === "All" ||
                product.category === category) &&
            product.name
                .toLowerCase()
                .includes(search.toLowerCase())
    );


    return (
        <>
            
                {showCart && (
                    <Cart
                        cartItems={cartItems}
                        setShowCart={setShowCart}
                        removeFromCart={removeFromCart}
                        clearCart={clearCart}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                    />
                )}
                {/* Paste all current website code here */}
                <div className="app">
                    {/* Navbar */}

                    <nav className="navbar">
                        <div className="logo">
                            💎 <span>TechStore</span>
                        </div>

                        <ul className="nav-links">
                            <li>
                                <a href="#products">
                                    Products
                                </a>
                            </li>

                            <li>
                                <a href="#features">
                                    Features
                                </a>
                            </li>

                            <li>
                                <a href="#reviews">
                                    Reviews
                                </a>
                            </li>
                        </ul>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />

                        <div className="nav-buttons">
                            <button
                                className="cart-btn"
                                onClick={() => setShowCart(true)}
                            >
                                Cart ({cartItems.length})
                            </button>
                        </div>
                    </nav>

                    {/* Hero */}

                    <section className="hero">
                        <span className="hero-badge">
                            🚀 NEXT GEN TECH
                        </span>

                        <h1>
                            Discover Premium
                            <br />
                            Gadgets & Devices
                        </h1>

                        <p>
                            Built for speed,
                            performance and
                            innovation.
                        </p>

                        <div className="hero-buttons">
                            <button
                                onClick={() =>
                                    document
                                        .getElementById(
                                            "products"
                                        )
                                        .scrollIntoView({
                                            behavior: "smooth",
                                        })
                                }
                            >
                                Shop Now
                            </button>

                            <button>
                                Explore
                            </button>
                        </div>
                    </section>

                    {/* Stats */}

                    <section className="stats">
                        <div className="stat-card">
                            <h2>50K+</h2>
                            <p>Customers</p>
                        </div>

                        <div className="stat-card">
                            <h2>500+</h2>
                            <p>Products</p>
                        </div>

                        <div className="stat-card">
                            <h2>4.9 ⭐</h2>
                            <p>Rating</p>
                        </div>

                        <div className="stat-card">
                            <h2>24/7</h2>
                            <p>Support</p>
                        </div>
                    </section>

                    {/* Categories */}

                    <section className="categories">
                        <button
                            onClick={() =>
                                setCategory("All")
                            }
                        >
                            All
                        </button>

                        <button
                            onClick={() =>
                                setCategory("Phones")
                            }
                        >
                            Phones
                        </button>

                        <button
                            onClick={() =>
                                setCategory("Laptops")
                            }
                        >
                            Laptops
                        </button>

                        <button
                            onClick={() =>
                                setCategory(
                                    "Accessories"
                                )
                            }
                        >
                            Accessories
                        </button>
                    </section>

                    {/* Products */}

                    <section
                        id="products"
                        className="products-section"
                    >
                        <h2>Featured Products</h2>

                        <div className="product-grid">
                            {filteredProducts.map(
                                (product) => (
                                    <ProductCard
                                        key={product.id}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        product={product}
                                        originalPrice={product.originalPrice}
                                        discount={product.discount}
                                        rating={product.rating}
                                        isBestSeller={
                                            product.isBestSeller}
                                        addToCart={() => addToCart(product)}
                                    />
                                )
                            )}
                        </div>
                    </section>

                    {/* Features */}

                    <section
                        id="features"
                        className="features"
                    >
                        <h2>
                            Why Choose TechStore?
                        </h2>

                        <div className="features-grid">
                            <div className="feature-card">
                                <h3>
                                    🚚 Free Delivery
                                </h3>
                                <p>
                                    Fast shipping across
                                    India.
                                </p>
                            </div>

                            <div className="feature-card">
                                <h3>
                                    🔒 Secure Payments
                                </h3>
                                <p>
                                    100% safe checkout.
                                </p>
                            </div>

                            <div className="feature-card">
                                <h3>
                                    ⭐ Premium Quality
                                </h3>
                                <p>
                                    Top rated gadgets.
                                </p>
                            </div>

                            <div className="feature-card">
                                <h3>📞 Support</h3>
                                <p>
                                    Available 24/7.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Reviews */}

                    <section
                        id="reviews"
                        className="testimonials"
                    >
                        <h2>
                            Customer Reviews
                        </h2>

                        <div className="testimonial-grid">
                            <div className="testimonial-card">
                                <p>
                                    Amazing products and
                                    fast delivery.
                                </p>
                                <h4>
                                    ★★★★★
                                </h4>
                            </div>

                            <div className="testimonial-card">
                                <p>
                                    Quality exceeded my
                                    expectations.
                                </p>
                                <h4>
                                    ★★★★★
                                </h4>
                            </div>

                            <div className="testimonial-card">
                                <p>
                                    Best shopping
                                    experience.
                                </p>
                                <h4>
                                    ★★★★★
                                </h4>
                            </div>
                        </div>
                    </section>

                    {/* Newsletter */}

                    <section className="newsletter">
                        <h2>
                            Get Exclusive Deals
                        </h2>

                        <p>
                            Subscribe for offers and
                            product updates.
                        </p>

                        <div className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                onClick={() => {
                                    alert(
                                        `Subscribed: ${email}`
                                    );
                                    setEmail("");
                                }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </section>

                    {/* Footer */}

                    <footer className="footer">
                        <h3>💎 TechStore</h3>

                        <p>
                            Premium gadgets,
                            laptops, smartphones
                            and accessories.
                        </p>

                        <div className="footer-links">
                            <span>Products</span>
                            <span>Support</span>
                            <span>Reviews</span>
                            <span>Contact</span>
                        </div>

                        <p className="copyright">
                            © 2026 TechStore. All
                            rights reserved.
                        </p>
                    </footer>
                </div>
            </>
            );
}

            export default Home;