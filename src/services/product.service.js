import ProductRepository from "../repositories/product.repository.js";

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
      throw new Error("Product not found");
    }

    return product;
  }

  static async createProduct(product) {
    const existingProduct = await ProductRepository.findByCode(product.code);

    if (existingProduct) {
      throw new Error("This product already exists");
    }

    const newProduct = await ProductRepository.create(product);
    return newProduct;
  }

  static async updateProduct(id, product) {
    const existingproduct = await ProductRepository.findById(id);

    if (!existingproduct) {
      throw new Error("Product not found");
    }

    const productUpdate = await ProductRepository.update(id, product);
    return productUpdate;
  }

  static async deleteProduct(id) {
    const existingproduct = await ProductRepository.findById(id);

    if (!existingproduct) {
      throw new Error("Product not found");
    }

    await ProductRepository.delete(id);
  }
}

export default ProductService;
