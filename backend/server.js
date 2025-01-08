import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import helpandsupportRouter from "./routes/helpAndSupportRoutes.js";
import deliveryPartnerRouter from "./routes/deliveryPartnerRoute.js"; // Import delivery partner routes
import 'dotenv/config';

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
// app.use(cors());
app.use(
cors({
origin: “https://food-delivery-ml-sales-prediction.vercel.app/”,
credentials: true,
methods: [“GET”, “POST”, “PUT”, “DELETE”, “PATCH”, “OPTIONS”],
allowedHeaders: [
“Origin”,
“Content-Type”,
“Accept”,
“Authorization”,
“X-Request-With”,
],
})
);
// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/delivery-partner", deliveryPartnerRouter); // Add delivery partner routes
app.use('/api/help-support', helpandsupportRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
