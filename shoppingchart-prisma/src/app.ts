import express, { Application } from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRouters";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRouters";
import addressRoutes from "./routes/addressRouters";
import cartItemRoutes from "./routes/cartItemRoutes";
import rateLimiter from "./utils/rateLimiter";

const app: Application = express();

app.use(bodyParser.json());
app.use(rateLimiter);
app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/cart-items", cartItemRoutes);

export default app;
