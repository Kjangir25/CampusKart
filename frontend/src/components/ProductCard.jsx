import { Heart, MapPin, Star, ShoppingCart, Trash2 } from "lucide-react";
import "./ProductCard.css";

function ProductCard({ product, go, addToCart, toggleWishlist, isWishlisted, deleteProduct }) {
    return (
        <article className="product-card card">
            <div className="product-image-wrap">
                <img className="product-image" src={product.img || product.image} alt={product.title} />
                <span className="badge condition-badge">{product.condition}</span>
                
                <button className={`heart-button ${isWishlisted(product.id) ? "liked" : ""}`} onClick={() => toggleWishlist(product)}>
                    <Heart size={18} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                </button>

                {deleteProduct && (
                    <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); }} title="Delete">
                        <Trash2 size={16} />
                    </button>
                )}
            </div>

            <div className="product-content">
                <div className="product-category">{product.category}</div>
                <button className="product-title" onClick={() => go("detail", product)}>{product.title}</button>
                
                <div className="product-meta">
                    <span className="price">₹{product.price.toLocaleString("en-IN")}</span>
                    <span className="rating"><Star size={13} fill="currentColor" />{product.rating}</span>
                </div>

                <div className="seller-row">
                    <span className="seller-avatar">{product.seller?.charAt(0)}</span>
                    <span className="seller-name">{product.seller}</span>
                    <span className="distance"><MapPin size={12} />{product.branch}</span>
                </div>

                <div className="product-actions">
                    <button className="view-button" onClick={() => go("detail", product)}>View Item</button>
                    <button className="cart-button" onClick={() => addToCart(product)}><ShoppingCart size={17} /></button>
                </div>
            </div>
        </article>
    );
}
export default ProductCard;