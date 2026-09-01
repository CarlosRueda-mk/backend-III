import mongoose from "mongoose";
import { config } from "./index.js";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info(`MongoDB Connected`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
