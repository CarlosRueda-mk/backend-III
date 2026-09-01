import mongoose from "mongoose";
import { ORDER_STATUS } from "../constants/index.js";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  status: {
    type: String,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.PENDING,
  },

  receipt: {
    originalName: String,
    fileName: String,
    path: String,
    mimetype: String,
    size: Number,
    uploadedAt: Date,
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
