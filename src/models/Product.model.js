import mongoose from "mongoose";
import { PRODUCT_STATUS } from "../constants/index.js";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true, default: 0, min: 0, max: 1000 },
  price: { type: Number, required: true },
  status: { type: String, required: true, default: PRODUCT_STATUS.ACTIVE },
  thumbnail: { type: String, required: true, default: [] },
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
