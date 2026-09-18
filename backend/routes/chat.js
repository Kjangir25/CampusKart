import express from "express";
import Message from "../models/Message.js";
const router = express.Router();

router.get("/:roomId", async (req, res) => {
    const msgs = await Message.find({ roomId: req.params.roomId });
    res.json(msgs);
});
router.post("/", async (req, res) => {
    const msg = await Message.create(req.body);
    res.json(msg);
});

export default router;