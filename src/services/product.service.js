import ProductRepository from "../repositories/product.repository.js";
import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";

class ProductService {
  static async getAllProducts() {
    const products = await ProductRepository.find();

    const productsWithStock = products.filter((product) => {
      return product.stock > 0;
    });
    return productsWithStock;
  }

  static async getProductById(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new CustomError(ERROR_DICTIONARY.PRODUCT_NOT_FOUND);
    }

    return product;
  }

  static async createProduct(product) {
    const existingProduct = await ProductRepository.findByCode(product.code);

    if (existingProduct) {
      throw new CustomError(ERROR_DICTIONARY.PRODUCT_ALREADY_EXISTS);
    }

    const newProduct = await ProductRepository.create(product);
    return newProduct;
  }

  static async updateProduct(id, product) {
    const existingproduct = await ProductRepository.findById(id);

    if (!existingproduct) {
      throw new CustomError(ERROR_DICTIONARY.PRODUCT_NOT_FOUND);
    }

    const productUpdate = await ProductRepository.update(id, product);
    return productUpdate;
  }

  static async deleteProduct(id) {
    const existingproduct = await ProductRepository.findById(id);

    if (!existingproduct) {
      throw new CustomError(ERROR_DICTIONARY.PRODUCT_NOT_FOUND);
    }

    await ProductRepository.delete(id);
  }
}

export default ProductService;
