import "./footer.css";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className="ck-footer">
            <div className="ck-footer-inner">
                <div className="brand" >
                    <span className="brand-mark">
                        <ShoppingBag size={22} />
                    </span>
                    <div>
                        <span>
                            <strong>CampusKart</strong>
                            <small>Midnight Archive</small>
                        </span>
                        <p className="ck-copy">© 2026 CampusKart • Built for students, by students</p>
                    </div>
                </div>

                <div className="ck-footer-col">
                    <h4>Explore</h4>
                    <span onClick={() => navigate("/")}>Home</span>
                    <span onClick={() => navigate("/shop")}>Shop</span>
                    <span onClick={() => navigate("/sell")}>Sell</span>
                </div>

                <div className="ck-footer-col">
                    <h4>Support</h4>
                    <span>Help Center</span>
                    <span>Safe Trade</span>
                    <span>Contact Us</span>
                </div>

                <div className="ck-footer-col">
                    <h4>Campus</h4>
                    <p>📍 Bhojasar, Rajasthan</p>
                    <p>✉️ support@campuskart.com</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;