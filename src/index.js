import express from "express";
import connectDB from "./config/db.js";
import { config } from "./config/index.js";
import userRoutes from "./routes/users.routes.js";
import productRoutes from "./routes/products.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import deliveryRoutes from "./routes/deliveries.routes.js";
import mockRoutes from "./mocks/routes/mock.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/deliveries", deliveryRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

if (config.NODE_ENV !== "production") {
  app.use("/api/mocks", mockRoutes);
}

app.use(errorMiddleware);

app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`);
});
