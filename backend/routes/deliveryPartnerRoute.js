import express from "express";
import DeliveryPartner from "../models/DeliveryPartner.js";

const router = express.Router();

// Route to get delivery partner details
router.get("/details", async (req, res) => {
    try {
        const partner = await DeliveryPartner.findOne(); // Fetch the first partner or adjust logic
        if (partner) {
            res.status(200).json({ success: true, partner });
        } else {
            res.status(404).json({ success: false, message: "No delivery partner found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching delivery partner details" });
    }
});

export default router;
