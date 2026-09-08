import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";

dotenv.config({ path: envFile });

const REQUIRED_ENV_VARS = ["PORT", "MONGODB_URI", "NODE_ENV", "LOG_LEVEL"];

REQUIRED_ENV_VARS.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Error: missing required environment variable ${varName}`);
    process.exit(1);
  }
});

export const config = {
  PORT: Number(process.env.PORT),
  MONGODB_URI: process.env.MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
};
