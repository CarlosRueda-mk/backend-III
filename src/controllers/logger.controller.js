import logger from "../config/logger.js";

class LoggerController {
  static testLogger(req, res) {
    logger.debug("Test debug message");
    logger.http("Test http message");
    logger.info("Test info message");
    logger.warning("Test warning message");
    logger.error("Test error message");
    logger.fatal("Test fatal message");

    res.status(200).json({
      message: "Logger test completed",
    });
  }
}

export default LoggerController;
