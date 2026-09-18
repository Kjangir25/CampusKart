import {
  Bell,
  Home,
  MessageCircle,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  UserRound,
  Heart,
  PlusCircle
} from "lucide-react";
import "./Navbar.css";

function Navbar({
  page,
  go,
  cartCount,
  wishlistCount,
  theme,
  setTheme,
  search,
  setSearch,
  user
}) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "shop", label: "Shop", icon: Search },
    { id: "sell", label: "Sell", icon: PlusCircle },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "cart", label: "Cart", icon: ShoppingBag },
    { id: "chat", label: "Chat", icon: MessageCircle }
  ];

  return (
    <>
      <header className="topbar glass">
        <button className="brand" onClick={() => go("home")}>
          <span className="brand-mark">
            <ShoppingBag size={22} />
          </span>
          <span>
            <strong>CampusKart</strong>
            <small>Midnight Archive</small>
          </span>
        </button>

        <div className="top-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onFocus={() => go("shop")}
            placeholder="Search textbooks, tech, furniture..."
          />
        </div>

        <div className="top-actions">
          <button className="icon-button" aria-label="Notifications">
            <Bell size={20} />
          </button>

          <button
            className="theme-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* FIX 1 - PROFILE CLICK ADDED */}
          <button className="profile-chip" onClick={() => go("profile")}>
            <span className="avatar">
              <UserRound size={17} />
            </span>
            <span>{user.name}</span>
          </button>
        </div>
      </header>

      <aside className="sidebar glass">
        <div className="sidebar-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${page === id ? "active" : ""}`}
              onClick={() => go(id)}
              title={label}
            >
              <span className="nav-icon">
                <Icon size={21} />
                {id === "cart" && cartCount > 0 && (
                  <b className="nav-count">{cartCount}</b>
                )}
                {id === "wishlist" && wishlistCount > 0 && (
                  <b className="nav-count">{wishlistCount}</b>
                )}
              </span>
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </div>
      </aside>

      <nav className="mobile-nav glass">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`mobile-nav-item ${page === id ? "active" : ""}`}
            onClick={() => go(id)}
          >
            <span className="mobile-icon">
              <Icon size={20} />
              {id === "cart" && cartCount > 0 && (
                <b className="nav-count">{cartCount}</b>
              )}
            </span>
            <small>{label}</small>
          </button>
        ))}
      </nav>
    </>
  );
}

export default Navbar;