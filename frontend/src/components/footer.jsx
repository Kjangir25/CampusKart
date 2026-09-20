import "./footer.css";
import { ShoppingBag } from "lucide-react";

const Footer = ({go}) => {
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
                    <span onClick={() => go("home")}>Home</span><br></br>
                    <span onClick={() => go("shop")}>Shop</span><br></br>
                    <span onClick={() => go("sell")}>Sell</span>
                </div>

                <div className="ck-footer-col">
                    <h4>Support</h4>
                    <span>Help Center</span><br></br>
                    <span>Safe Trade</span><br></br>
                    <span>Contact Us</span>
                </div>

                <div className="ck-footer-col">
                    <h4>Campus</h4>
                    <p>📍 Jhunjhunu, Rajasthan</p>
                    <p>✉️ support@campuskart.com</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;