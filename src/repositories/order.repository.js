import OrderModel from "../models/Order.model.js";

class OrderRepository {
  static async getOrders() {
    return await OrderModel.find();
  }

  static async getOrderById(id) {
    return await OrderModel.findOne({ _id: id });
  }

  static async createOrder(order) {
    return await OrderModel.create(order);
  }

  static async updateOrder(id, order) {
    return await OrderModel.findOneAndUpdate({ _id: id }, order, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteOrder(id) {
    return await OrderModel.findOneAndDelete({ _id: id });
  }

  static async addReceipt(id, receipt) {
    return await OrderModel.findOneAndUpdate(
      { _id: id },
      { $set: { receipt } },
      { new: true },
    );
  }
}

export default OrderRepository;
