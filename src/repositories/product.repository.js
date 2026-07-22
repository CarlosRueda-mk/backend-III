import express from "express";
import ProductModel from "../models/Product.model.js";

class ProductRepository {
  static async find() {
    return await ProductModel.find();
  }
}

export default ProductRepository;
