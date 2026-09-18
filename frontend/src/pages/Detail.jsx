import { ArrowLeft, Heart, MessageCircle, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import "./Detail.css";

function Detail({
    product,
    go,
    addToCart,
    toggleWishlist,
    isWishlisted
}) {
    return (
        <div className="page detail-page">
            <button className="back-button" onClick={() => go("shop")}>
                <ArrowLeft size={17} /> Back to marketplace
            </button>

            <div className="detail-layout">
                <div className="detail-gallery card">
                    <img src={product.img} alt={product.title} />
                    <div className="gallery-thumbs">
                        <img src={product.img} alt="" />
                        <img src={product.img} alt="" />
                        <img src={product.img} alt="" />
                    </div>
                </div>

                <div className="detail-info">
                    <div className="detail-topline">
                        <span className="badge">{product.condition}</span>
                        <span className="detail-category">{product.category}</span>
                    </div>

                    <h1>{product.title}</h1>

                    <div className="detail-rating">
                        <Star size={17} fill="currentColor" />
                        <strong>{product.rating}</strong>
                        <span>Verified student rating</span>
                    </div>

                    <div className="detail-price">
                        ₹{product.price.toLocaleString("en-IN")}
                    </div>

                    <div className="seller-card glass">
                        <span className="seller-large-avatar">
                            {product.seller.charAt(0)}
                        </span>
                        <div>
                            <strong>{product.seller}</strong>
                            <span>
                                <ShieldCheck size={14} /> Verified seller
                            </span>
                        </div>
                        {/* FIX 1 - product pass kiya */}
                        <button onClick={() => go("chat", product)}>
                            <MessageCircle size={17} />
                            Chat
                        </button>
                    </div>

                    <div className="detail-specs">
                        <div>
                            <span>Condition</span>
                            <strong>{product.condition}</strong>
                        </div>
                        <div>
                            <span>Branch</span>
                            <strong>{product.branch}</strong>
                        </div>
                        <div>
                            <span>Pickup</span>
                            <strong>On Campus</strong>
                        </div>
                    </div>

                    <div className="detail-description">
                        <h3>About this item</h3>
                        <p>
                            Well-maintained item listed by a verified student. Safe campus
                            meetup and direct student-to-student communication available.
                            Inspect the item before completing the exchange.
                        </p>
                    </div>

                    <div className="detail-actions">
                        <button
                            className="primary-button"
                            onClick={() => addToCart(product)}
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>

                        <button
                            className={`wishlist-detail-button ${isWishlisted(product.id) ? "liked" : ""}`}
                            onClick={() => toggleWishlist(product)}
                        >
                            <Heart size={19} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                            {isWishlisted(product.id) ? "Saved" : "Wishlist"}
                        </button>

                        {/* FIX 2 - yaha bhi product pass kiya */}
                        <button className="chat-seller-button" onClick={() => go("chat", product)}>
                            <MessageCircle size={18} />
                            Chat with Seller
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;