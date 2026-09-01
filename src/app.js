import express from "express";
import { config } from "./config/index.js";
import userRoutes from "./routes/users.routes.js";
import productRoutes from "./routes/products.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import deliveryRoutes from "./routes/deliveries.routes.js";
import mockRoutes from "./mocks/routes/mock.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import loggerRoutes from "./routes/logger.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import CustomError from "./errors/custom-error.js";
import ERROR_DICTIONARY from "./errors/error-dictionary.js";

const app = express();

app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/logger", loggerRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    service: "ShipNow API",
    environment: config.NODE_ENV,
    uptime: process.uptime(),
  });
});

if (config.NODE_ENV !== "production") {
  app.use("/api/mocks", mockRoutes);
}

app.use((req, res, next) => {
  const error = new CustomError(ERROR_DICTIONARY.ROUTE_NOT_FOUND);
  next(error);
});

app.use(errorMiddleware);

export default app;
