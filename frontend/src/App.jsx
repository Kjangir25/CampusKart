import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Detail from "./pages/Detail";
import Sell from "./pages/Sell";
import Chat from "./pages/Chat";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile"; // NAYA ADD KIYA
import "./App.css";

export const productsData = [ /* tera wahi productsData yaha rahega - same as before */
  {
    id: 1,
    title: "Engineering Physics Textbook",
    price: 999,
    category: "Books",
    branch: "CSE",
    condition: "Like New",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85",
    seller: "Aarav Mehta"
  },
  {
    id: 2,
    title: "AirPods Pro 2nd Generation",
    price: 2499,
    category: "Electronics",
    branch: "ECE",
    condition: "Like New",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85",
    seller: "Riya Sharma"
  },
  {
    id: 3,
    title: "Study Table Lamp",
    price: 549,
    category: "Furniture",
    branch: "ME",
    condition: "Used",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    seller: "Kabir Singh"
  },
  {
    id: 4,
    title: "Scientific Calculator FX-991",
    price: 1250,
    category: "Stationery",
    branch: "CE",
    condition: "Like New",
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1616628182506-3f1e7e4e9e1b?auto=format&fit=crop&w=900&q=85",
    seller: "Ananya Rao"
  },
  {
    id: 5,
    title: "Campus Hoodie",
    price: 799,
    category: "Clothing",
    branch: "CSE",
    condition: "New",
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    seller: "Dev Malhotra"
  },
  {
    id: 6,
    title: "DSA Interview Guide",
    price: 699,
    category: "Books",
    branch: "CSE",
    condition: "Used",
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=85",
    seller: "Ishita Jain"
  },
  {
    id: 7,
    title: "Ergonomic Study Chair",
    price: 3200,
    category: "Furniture",
    branch: "ME",
    condition: "Like New",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=900&q=85",
    seller: "Arjun Kapoor"
  },
  {
    id: 8,
    title: "Mechanical Keyboard",
    price: 1899,
    category: "Electronics",
    branch: "ECE",
    condition: "Used",
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85",
    seller: "Maya Verma"
  }
];

const readStorage = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
};

function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All"); // NAYA
  const [cart, setCart] = useState(() => readStorage("campuskart-cart", []));
  const [wishlist, setWishlist] = useState(() => readStorage("campuskart-wish", []));
  const [theme, setTheme] = useState(() => localStorage.getItem("campuskart-theme") || "dark");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(() => readStorage("campuskart-user", { name: "Alex", branch: "CSE", verified: true }));

  useEffect(() => { localStorage.setItem("campuskart-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("campuskart-wish", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("campuskart-theme", theme); document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { localStorage.setItem("campuskart-user", JSON.stringify(user)); }, [user]);

  const go = (nextPage, product = null) => {
    setSelectedProduct(product);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isWishlisted = (id) => wishlist.some((p) => p.id === id);
  const toggleWishlist = (product) => {
    setWishlist((c) => isWishlisted(product.id) ? c.filter((i) => i.id !== product.id) : [...c, product]);
  };
  const addToCart = (product) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === product.id);
      if (ex) return c.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...c, { ...product, quantity: 1 }];
    });
  };
  const updateQuantity = (id, q) => setCart((c) => c.map((i) => i.id === id ? { ...i, quantity: q } : i).filter((i) => i.quantity > 0));
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);

  // CATEGORY + SEARCH DONO KA FILTER
  const visibleProducts = useMemo(() => {
    let filtered = productsData;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (search.trim()) {
      filtered = filtered.filter((p) => `${p.title} ${p.category} ${p.branch}`.toLowerCase().includes(search.toLowerCase()));
    }
    return filtered;
  }, [search, selectedCategory]);

  const renderPage = () => {
    const commonProps = { products: visibleProducts, allProducts: productsData, cart, wishlist, user, search, setSearch, go, addToCart, updateQuantity, removeFromCart, toggleWishlist, isWishlisted, setUser, selectedCategory, setSelectedCategory };

    if (page === "shop") return <Shop {...commonProps} />;
    if (page === "detail") return <Detail {...commonProps} product={selectedProduct || productsData[0]} />;
    if (page === "sell") return <Sell {...commonProps} />;
    if (page === "chat") return <Chat {...commonProps} product={selectedProduct} />; // PRODUCT PASS KIYA
    if (page === "cart") return <Cart {...commonProps} />;
    if (page === "wishlist") return <Wishlist {...commonProps} />;
    if (page === "profile") return <Profile {...commonProps} />; // PROFILE PAGE ADDED
    return <Home {...commonProps} />;
  };

  return (
    <div className="app-shell">
      <Navbar page={page} go={go} cartCount={cartCount} wishlistCount={wishlist.length} theme={theme} setTheme={setTheme} search={search} setSearch={setSearch} user={user} />
      <main className="app-main">{renderPage()}</main>
    </div>
  );
}
export default App;