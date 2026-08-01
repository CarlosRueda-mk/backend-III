import ProductService from "../services/product.service.js";

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const productUpdate = await ProductService.updateProduct(
        req.params.id,
        req.body,
      );
      res.status(200).json(productUpdate);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(200).json(`Product deleted`);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
