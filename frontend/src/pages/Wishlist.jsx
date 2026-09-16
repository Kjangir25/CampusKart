import { Heart, ShoppingBag } from "lucide-react";
import ProductCard from "../components/ProductCard";
import "./Wishlist.css";

function Wishlist({
    wishlist,
    go,
    addToCart,
    toggleWishlist,
    isWishlisted
}) {
    return (
        <div className="page wishlist-page">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">Items you want to remember</span>
                    <h1>Wishlist</h1>
                    <p>{wishlist.length} saved items from the campus marketplace.</p>
                </div>
            </div>

            {wishlist.length ? (
                <div className="products-grid">
                    {wishlist.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            go={go}
                            addToCart={addToCart}
                            toggleWishlist={toggleWishlist}
                            isWishlisted={isWishlisted}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-results card">
                    <Heart size={38} />
                    <h2>Your wishlist is empty</h2>
                    <p>Tap the heart on any product to save it for later.</p>
                    <button className="primary-button" onClick={() => go("shop")}>
                        <ShoppingBag size={17} />
                        Explore Products
                    </button>
                </div>
            )}
        </div>
    );
}

export default Wishlist;