import express from "express";
import Product from "../models/Product.js";
const router = express.Router();

router.get("/", async (req, res) => { const p = await Product.find(); res.json(p); });
router.post("/", async (req, res) => { const p = await Product.create(req.body); res.json(p); });

export default router;