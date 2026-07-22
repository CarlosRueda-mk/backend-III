import express from "express";
import ProductService from "../services/product.service.js";

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(`Error getting Products: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
