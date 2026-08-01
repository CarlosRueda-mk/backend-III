import express from "express";
import MockController from "../controller/mock.controller.js";

const router = express.Router();

router.get("/users", MockController.getMockUsers);

router.get("/orders", MockController.getMockOrders);

router.get("/products", MockController.getMockProducts);

router.get("/deliveries", MockController.getMockDeliveries);

router.post("/populate", MockController.populateDatabase);

export default router;
