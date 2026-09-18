import { ShoppingBag, Github, Linkedin, Mail, MapPin } from "lucide-react";
import "./Footer.css";

function Footer({ go }) {
    return (
        <footer className="footer glass">
            <div className="footer-top">
                <div className="footer-brand">
                    <span className="brand-mark"><ShoppingBag size={22} /></span>
                    <div>
                        <strong>CampusKart</strong>
                        <small>Midnight Archive - Student Marketplace</small>
                    </div>
                </div>

                <div className="footer-links">
                    <div>
                        <h4>Explore</h4>
                        <button onClick={() => go("home")}>Home</button>
                        <button onClick={() => go("shop")}>Shop</button>
                        <button onClick={() => go("sell")}>Sell</button>
                    </div>
                    <div>
                        <h4>Support</h4>
                        <button>Help Center</button>
                        <button>Safe Trade</button>
                        <button>Contact Us</button>
                    </div>
                    <div>
                        <h4>Campus</h4>
                        <p><MapPin size={14} /> Bhojasar, Rajasthan</p>
                        <p><Mail size={14} /> support@campuskart.com</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© 2026 CampusKart • Built for students, by students</span>
                <div className="footer-social">
                    <a href="https://github.com" target="_blank"><Github size={18} /></a>
                    <a href="https://linkedin.com" target="_blank"><Linkedin size={18} /></a>
                    <a href="mailto:support@campuskart.com"><Mail size={18} /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;