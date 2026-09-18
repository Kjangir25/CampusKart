import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

function Shop({
    allProducts,
    go,
    addToCart,
    toggleWishlist,
    isWishlisted,
    search,
    setSearch,
    selectedCategory, // App.jsx se ayega
    setSelectedCategory
}) {
    const [category, setCategory] = useState(selectedCategory || "All");
    const [branch, setBranch] = useState("All");
    const [condition, setCondition] = useState("All");
    const [sort, setSort] = useState("featured");
    const [maxPrice, setMaxPrice] = useState(5000);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const categories = ["All", "Books", "Electronics", "Furniture", "Clothing", "Stationery"];
    const branches = ["All", "CSE", "ECE", "ME", "CE"];
    const conditions = ["All", "New", "Like New", "Used"];

    // FIX - Home se category aaye toh update karo
    useEffect(() => {
        if (selectedCategory && selectedCategory!== "All") {
            setCategory(selectedCategory);
        }
    }, [selectedCategory]);

    const filteredProducts = useMemo(() => {
        let result = allProducts.filter((product) => {
            const matchesCategory = category === "All" || product.category === category;
            const matchesBranch = branch === "All" || product.branch === branch;
            const matchesCondition = condition === "All" || product.condition === condition;
            const matchesPrice = product.price <= maxPrice;
            const matchesSearch =!search.trim() || `${product.title} ${product.category} ${product.branch}`.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesBranch && matchesCondition && matchesPrice && matchesSearch;
        });
        if (sort === "low") result.sort((a, b) => a.price - b.price);
        if (sort === "high") result.sort((a, b) => b.price - a.price);
        if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
        return result;
    }, [allProducts, category, branch, condition, maxPrice, search, sort]);

    const resetFilters = () => {
        setCategory("All");
        setBranch("All");
        setCondition("All");
        setMaxPrice(5000);
        setSearch("");
        setSort("featured");
        if(setSelectedCategory) setSelectedCategory("All");
    };

    return (
        <div className="page shop-page">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">Discover nearby listings</span>
                    <h1>Shop Marketplace</h1>
                    <p>Find useful products from verified students around your campus.</p>
                </div>
                <button className="filter-toggle" onClick={() => setFiltersOpen(!filtersOpen)}>
                    <SlidersHorizontal size={17} /> Filters
                </button>
            </div>
            <div className="shop-layout">
                <aside className={`filters-panel card ${filtersOpen? "open" : ""}`}>
                    <div className="filter-title"><span><Filter size={17} /> Filters</span><button onClick={resetFilters}>Reset</button></div>
                    <label className="filter-field">Category
                        <select value={category} onChange={(e) => { setCategory(e.target.value); if(setSelectedCategory) setSelectedCategory(e.target.value); }}>
                            {categories.map((item) => <option key={item}>{item}</option>)}
                        </select>
                    </label>
                    <label className="filter-field">Branch
                        <select value={branch} onChange={(e) => setBranch(e.target.value)}>{branches.map((item) => <option key={item}>{item}</option>)}</select>
                    </label>
                    <label className="filter-field">Condition
                        <select value={condition} onChange={(e) => setCondition(e.target.value)}>{conditions.map((item) => <option key={item}>{item}</option>)}</select>
                    </label>
                    <label className="filter-field">Price up to ₹{maxPrice.toLocaleString("en-IN")}
                        <input className="price-range" type="range" min="100" max="5000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                    </label>
                    <button className="mobile-close-filter" onClick={() => setFiltersOpen(false)}><X size={16} /> Apply Filters</button>
                </aside>
                <section className="shop-results">
                    <div className="results-toolbar"><span><strong>{filteredProducts.length}</strong> products found</span>
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                            <option value="featured">Sort: Featured</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                    {filteredProducts.length? (
                        <div className="products-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} go={go} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} />)}</div>
                    ) : (
                        <div className="empty-results card"><Search size={34} /><h2>No products found</h2><p>Try changing your filters.</p><button className="primary-button" onClick={resetFilters}>Clear Filters</button></div>
                    )}
                </section>
            </div>
        </div>
    );
}
export default Shop;