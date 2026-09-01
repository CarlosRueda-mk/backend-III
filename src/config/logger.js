import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { config } from "./index.js";

const customLevels = {
  levels: { fatal: 0, error: 1, warning: 2, info: 3, http: 4, debug: 5 },

  colors: {
    fatal: "red bold",
    error: "red",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "violet",
  },
};

winston.addColors(customLevels.colors);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] ${message}`;
  }),
);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${stack ?? message}`;
  }),
);

const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),

    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "7d",
      level: config.NODE_ENV === "production" ? "info" : "debug",
      format: fileFormat,
    }),

    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "7d",
      format: fileFormat,
    }),
  ],
});

export default logger;
