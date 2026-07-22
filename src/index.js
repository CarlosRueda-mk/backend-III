import express from "express";
import connectDB from "./config/db.js";
import { config } from "./config/index.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`);
});
