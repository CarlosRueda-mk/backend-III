import mongoose from "mongoose";
import { DELIVERY_PRIORITY, ORDER_STATUS } from "../constants/index.js";

const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },

  deliveryMan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  priority: {
    type: String,
    enum: Object.values(DELIVERY_PRIORITY),
    default: DELIVERY_PRIORITY.MEDIUM,
  },

  status: {
    type: String,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.PENDING,
  },
});
const DeliveryModel = mongoose.model("Delivery", deliverySchema);

export default DeliveryModel;
