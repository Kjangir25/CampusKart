import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  Cpu,
  Headphones,
  Laptop,
  PenLine,
  Shirt,
  Sofa,
  Sparkles,
  ShieldCheck,
  Zap
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const categories = [
  { name: "Books", icon: BookOpen, color: "blue" },
  { name: "Electronics", icon: Cpu, color: "cyan" },
  { name: "Furniture", icon: Sofa, color: "violet" },
  { name: "Clothing", icon: Shirt, color: "pink" },
  { name: "Stationery", icon: PenLine, color: "green" }
];

function Home({
  products,
  go,
  addToCart,
  toggleWishlist,
  isWishlisted,
  setSelectedCategory // NAYA PROP
}) {
  const handleCategoryClick = (categoryName) => {
    if (setSelectedCategory) {
      setSelectedCategory(categoryName);
    }
    go("shop");
  };

  return (
    <div className="page home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={15} />
            Campus verified marketplace
          </span>
          <h1>Buy & Sell on Campus,<span>One Click Away.</span></h1>
          <p>Affordable books, electronics, essentials and more, traded by students, for students.</p>
          <div className="hero-buttons">
            <button className="primary-button" onClick={() => go("shop")}>Browse Marketplace <ArrowRight size={18} /></button>
            <button className="secondary-button" onClick={() => go("sell")}>List an Item <span>+</span></button>
          </div>
          <div className="trust-row">
            <span><BadgeCheck size={17} /> Verified Students</span>
            <span><ShieldCheck size={17} /> Secure Campus Deals</span>
            <span><Zap size={17} /> 1000+ Active Students</span>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-glow" />
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-laptop"><Laptop size={92} strokeWidth={1.2} /></div>
          <div className="floating-book book-one"><BookOpen size={42} /></div>
          <div className="floating-book book-two"><BookOpen size={34} /></div>
          <div className="floating-headphones"><Headphones size={56} /></div>
        </div>
      </section>

      <section className="stats-strip glass">
        <div><strong>127</strong><span>Active Listings</span></div>
        <div><strong>24</strong><span>Campus Communities</span></div>
        <div><strong>4.9/5</strong><span>Student Rating</span></div>
        <div><strong>100%</strong><span>Campus Focused</span></div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div><span className="eyebrow">Explore the campus market</span><h2>Shop by Category</h2></div>
          <button className="text-button" onClick={() => { if (setSelectedCategory) setSelectedCategory('All'); go("shop"); }}>View all <ChevronRight size={17} /></button>
        </div>

        <div className="category-grid">
          {categories.map(({ name, icon: Icon, color }) => (
            <button
              key={name}
              className={`category-card ${color}`}
              onClick={() => handleCategoryClick(name)}
            >
              <span className="category-icon"><Icon size={26} /></span>
              <span>{name}</span>
              <small>Explore listings</small>
            </button>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div><span className="eyebrow">Popular near you</span><h2>Best Sellers</h2></div>
          <button className="text-button" onClick={() => go("shop")}>Browse all <ChevronRight size={17} /></button>
        </div>
        <div className="products-grid home-products-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} go={go} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} />
          ))}
        </div>
      </section>

      <section className="sell-banner card">
        <div><span className="eyebrow">Have something to sell?</span><h2>Turn unused stuff into campus cash.</h2><p>List your item in under two minutes and reach students around you.</p></div>
        <button className="primary-button" onClick={() => go("sell")}>Start Selling <ArrowRight size={18} /></button>
      </section>
    </div>
  );
}
export default Home;