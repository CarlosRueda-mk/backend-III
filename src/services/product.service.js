import express from "express";
import ProductRepository from "../repositories/product.repository.js";

class ProductService {
  static async getAllProducts() {
    const products = await ProductRepository.find();
  }
}

export default ProductService;
