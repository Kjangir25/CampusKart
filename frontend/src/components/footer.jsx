import "./footer.css";

const Footer = () => {
    return (
        <footer className="ck-footer">
            <div className="ck-footer-inner">
                <div className="ck-footer-brand">
                    <div className="ck-footer-logo">📦</div>
                    <div>
                        <h3>CampusKart</h3>
                        <span>Midnight Archive - Student Marketplace</span>
                        <p className="ck-copy">© 2026 CampusKart • Built for students, by students</p>
                    </div>
                </div>

                <div className="ck-footer-col">
                    <h4>Explore</h4>
                    <span>Home</span>
                    <span>Shop</span>
                    <span>Sell</span>
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