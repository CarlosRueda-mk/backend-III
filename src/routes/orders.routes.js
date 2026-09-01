import express from "express";
import OrderController from "../controllers/order.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrderById);
router.post("/", OrderController.createOrder);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);
router.post(
  "/:id/receipt",
  upload.single("receipt"),
  OrderController.addReceipt,
);

export default router;
