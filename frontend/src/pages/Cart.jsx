import { ArrowLeft, CheckCircle2, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import "./Cart.css";

function Cart({ cart, updateQuantity, removeFromCart, go }) {
    const [checkedOut, setCheckedOut] = useState(false);

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const pickupFee = cart.length ? 0 : 0;
    const total = subtotal + pickupFee;

    if (checkedOut) {
        return (
            <div className="page success-page">
                <div className="success-card card">
                    <CheckCircle2 size={58} />
                    <h1>Order request placed</h1>
                    <p>
                        The seller will contact you to confirm your safe campus pickup.
                    </p>
                    <button className="primary-button" onClick={() => go("home")}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page cart-page">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">Your saved campus purchases</span>
                    <h1>Shopping Cart</h1>
                </div>
            </div>

            {!cart.length ? (
                <div className="empty-results card">
                    <ShoppingBag size={38} />
                    <h2>Your cart is empty</h2>
                    <p>Add products from the marketplace to see them here.</p>
                    <button className="primary-button" onClick={() => go("shop")}>
                        Browse Marketplace
                    </button>
                </div>
            ) : (
                <div className="cart-layout">
                    <section className="cart-items card">
                        {cart.map((item) => (
                            <article className="cart-item" key={item.id}>
                                <img src={item.img} alt={item.title} />
                                <div className="cart-item-info">
                                    <span className="product-category">{item.category}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.condition} · {item.branch}</p>
                                    <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                                </div>

                                <div className="quantity-control">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                        <Minus size={14} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <button
                                    className="remove-item"
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={17} />
                                </button>
                            </article>
                        ))}
                    </section>

                    <aside className="order-summary card">
                        <h2>Order Summary</h2>
                        <div>
                            <span>Subtotal</span>
                            <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
                        </div>
                        <div>
                            <span>Campus pickup</span>
                            <strong className="free">Free</strong>
                        </div>
                        <hr />
                        <div className="total-row">
                            <span>Total</span>
                            <strong>₹{total.toLocaleString("en-IN")}</strong>
                        </div>

                        <button className="primary-button checkout-button" onClick={() => setCheckedOut(true)}>
                            Checkout
                        </button>

                        <p className="safe-note">
                            <ShieldCheck size={15} />
                            Secure student-to-student checkout
                        </p>
                    </aside>
                </div>
            )}
        </div>
    );
}

export default Cart;