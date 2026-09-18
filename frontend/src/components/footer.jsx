import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h3>CampusKart</h3>
                    <p>Midnight Archive - Student Marketplace</p>
                    <p className="footer-tagline">© 2025 CampusKart • Built for students, by students</p>
                </div>

                <div className="footer-links">
                    <div>
                        <h4>Explore</h4>
                        <a>Home</a>
                        <a>Shop</a>
                        <a>Sell</a>
                    </div>
                    <div>
                        <h4>Support</h4>
                        <a>Help Center</a>
                        <a>Safe Trade</a>
                        <a>Contact Us</a>
                    </div>
                    <div>
                        <h4>Campus</h4>
                        <p>📍 Bhojasar, Rajasthan</p>
                        <p>✉️ support@campuskart.com</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;