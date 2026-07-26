import ProductModel from "../models/Product.model.js";

class ProductRepository {
  static async find() {
    return await ProductModel.find();
  }

  static async findById(id) {
    return await ProductModel.findOne({ _id: id });
  }

  static async findByCode(code) {
    return await ProductModel.findOne({ code: code });
  }

  static async create(product) {
    return await ProductModel.create(product);
  }

  static async update(id, product) {
    return await ProductModel.findOneAndUpdate({ _id: id }, product);
  }

  static async delete(id) {
    return await ProductModel.findOneAndDelete({ _id: id });
  }
}

export default ProductRepository;
