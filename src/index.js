import connectDB from "./config/db.js";
import { config } from "./config/index.js";
import logger from "./config/logger.js";
import app from "./app.js";

connectDB();

app.listen(config.PORT, () => {
  logger.info(`server running on port ${config.PORT}`);
});
