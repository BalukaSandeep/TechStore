import "./ProductCard.css";

export default function ProductCard({
  product,
  image,
  name,
  price,
  originalPrice,
  discount,
  rating,
  isBestSeller,
  addToCart,
  isWishlisted,
  toggleWishlist,
}) {
  return (
    <div className="product-card">
      {discount && (
        <span className="discount-badge">
          {discount}
        </span>
      )}

      <div className="image-container">
        <img
          src={image}
          alt={name}
          className="product-image"
        />
        <button
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={toggleWishlist}
          title="Add to wishlist"
        >
          ♥
        </button>
      </div>

      <div className="card-content">
        <h3 className="product-name">
          {name}
        </h3>

        <div className="rating">
          <span className="stars">
            ★★★★★
          </span>

          <span className="rating-value">
            {rating}
          </span>

          {isBestSeller && (
            <span className="bestseller-tag">
              BEST SELLER
            </span>
          )}
        </div>

        <div className="price-row">
          <span className="price">
            ₹ {price}
          </span>

          <span className="original-price">
            ₹{originalPrice}
          </span>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={addToCart}
        >
           Add to Cart
        </button>
      </div>
    </div>
  );
}