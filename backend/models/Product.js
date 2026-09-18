import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    image: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
export default mongoose.model("Product", productSchema);