import { CheckCircle2, ImagePlus, IndianRupee, Sparkles, UploadCloud } from "lucide-react";
import { useState } from "react";
import "./Sell.css";

const initialForm = {
    title: "",
    category: "Books",
    branch: "CSE",
    condition: "Like New",
    price: "",
    description: "",
    image: ""
};

export function getSmartPrice({ category, condition, title }) {
    const basePrices = {
        Books: 900,
        Electronics: 2500,
        Furniture: 1500,
        Clothing: 700,
        Stationery: 500
    };

    const conditionMultiplier = {
        New: 1,
        "Like New": 0.78,
        Used: 0.55
    };

    const keywordBoost =
        /macbook|iphone|airpods|laptop|calculator/i.test(title) ? 1.25 : 1;

    return Math.round(
        basePrices[category] * conditionMultiplier[condition] * keywordBoost
    );
}

export function checkImageQuality(file) {
    if (!file) {
        return { ok: false, message: "Please upload an image." };
    }

    if (!file.type.startsWith("image/")) {
        return { ok: false, message: "Only image files are allowed." };
    }

    if (file.size > 5 * 1024 * 1024) {
        return { ok: false, message: "Image should be smaller than 5MB." };
    }

    return { ok: true, message: "Image quality looks good." };
}

function Sell({ go }) {
    const [form, setForm] = useState(initialForm);
    const [suggestion, setSuggestion] = useState(null);
    const [imageMessage, setImageMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const update = (key, value) => {
        setForm((current) => ({ ...current, [key]: value }));
    };

    const suggestPrice = () => {
        setSuggestion(
            getSmartPrice({
                category: form.category,
                condition: form.condition,
                title: form.title
            })
        );
    };

    const handleImage = (event) => {
        const file = event.target.files?.[0];
        const result = checkImageQuality(file);
        setImageMessage(result.message);

        if (result.ok) {
            update("image", URL.createObjectURL(file));
        }
    };

    const submit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="page success-page">
                <div className="success-card card">
                    <CheckCircle2 size={58} />
                    <h1>Listing submitted</h1>
                    <p>Your item has been added to the campus listing queue.</p>
                    <button className="primary-button" onClick={() => go("shop")}>
                        Browse Marketplace
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page sell-page">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">
                        <Sparkles size={15} /> Smart campus selling
                    </span>
                    <h1>Sell an Item</h1>
                    <p>List your unused products for students around you.</p>
                </div>
            </div>

            <form className="sell-layout" onSubmit={submit}>
                <div className="sell-form card">
                    <label>
                        Item title
                        <input
                            required
                            value={form.title}
                            onChange={(event) => update("title", event.target.value)}
                            placeholder="e.g. Engineering Mathematics Book"
                        />
                    </label>

                    <div className="form-grid">
                        <label>
                            Category
                            <select
                                value={form.category}
                                onChange={(event) => update("category", event.target.value)}
                            >
                                <option>Books</option>
                                <option>Electronics</option>
                                <option>Furniture</option>
                                <option>Clothing</option>
                                <option>Stationery</option>
                            </select>
                        </label>

                        <label>
                            Branch
                            <select
                                value={form.branch}
                                onChange={(event) => update("branch", event.target.value)}
                            >
                                <option>CSE</option>
                                <option>ECE</option>
                                <option>ME</option>
                                <option>CE</option>
                            </select>
                        </label>

                        <label>
                            Condition
                            <select
                                value={form.condition}
                                onChange={(event) => update("condition", event.target.value)}
                            >
                                <option>New</option>
                                <option>Like New</option>
                                <option>Used</option>
                            </select>
                        </label>

                        <label>
                            Price
                            <span className="currency-input">
                                <IndianRupee size={15} />
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    value={form.price}
                                    onChange={(event) => update("price", event.target.value)}
                                    placeholder="Enter price"
                                />
                            </span>
                        </label>
                    </div>

                    <label>
                        Description
                        <textarea
                            required
                            rows="6"
                            value={form.description}
                            onChange={(event) => update("description", event.target.value)}
                            placeholder="Describe the item's condition, age and pickup details..."
                        />
                    </label>

                    <button className="primary-button submit-listing" type="submit">
                        Publish Listing
                    </button>
                </div>

                <div className="sell-side">
                    <label className="upload-box card">
                        <input type="file" accept="image/*" onChange={handleImage} />
                        {form.image ? (
                            <img src={form.image} alt="Preview" />
                        ) : (
                            <>
                                <UploadCloud size={35} />
                                <strong>Upload item photo</strong>
                                <span>PNG, JPG up to 5MB</span>
                            </>
                        )}
                    </label>

                    {imageMessage && (
                        <p className={`image-message ${imageMessage.includes("good") ? "good" : ""}`}>
                            <ImagePlus size={15} />
                            {imageMessage}
                        </p>
                    )}

                    <div className="smart-price-card card">
                        <div className="smart-price-icon">
                            <Sparkles size={21} />
                        </div>
                        <div>
                            <h3>AI Smart Price Suggestion</h3>
                            <p>Get a campus-friendly price based on category and condition.</p>
                        </div>
                        <button type="button" onClick={suggestPrice}>
                            Suggest Price
                        </button>
                        {suggestion && (
                            <strong className="suggested-price">
                                Recommended: ₹{suggestion.toLocaleString("en-IN")}
                            </strong>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Sell;