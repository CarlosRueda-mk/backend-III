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

  static async createProduct(req, res) {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(`Error creating Product: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      console.error(`Error  finding Product : ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const productUpdate = await ProductService.updateProduct(
        req.params.id,
        req.body,
      );
      res.status(200).json(productUpdate);
    } catch (error) {
      console.error(`Error updating product : ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(200).json(`Product deleted`);
    } catch (error) {
      console.error(`Error deleting product: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
