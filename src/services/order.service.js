import OrderRepository from "../repositories/order.repository.js";
import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";
import logger from "../config/logger.js";

class OrderService {
  static async getAllOrders() {
    const orders = await OrderRepository.getOrders();
    logger.info(`Retrieving all orders. Total: ${orders.length}`);
    return orders;
  }

  static async getOrderById(id) {
    const order = await OrderRepository.getOrderById(id);
    if (!order) {
      throw new CustomError(ERROR_DICTIONARY.ORDER_NOT_FOUND);
    }
    return order;
  }

  static async createOrder(order) {
    const newOrder = await OrderRepository.createOrder(order);
    logger.info(`Order created successfully: ${newOrder._id}`);
    return newOrder;
  }

  static async updateOrder(id, order) {
    const existingOrder = await OrderRepository.getOrderById(id);
    if (!existingOrder) {
      throw new CustomError(ERROR_DICTIONARY.ORDER_NOT_FOUND);
    }
    const orderUpdate = await OrderRepository.updateOrder(id, order);
    return orderUpdate;
  }

  static async deleteOrder(id) {
    const order = await OrderRepository.getOrderById(id);
    if (!order) {
      throw new CustomError(ERROR_DICTIONARY.ORDER_NOT_FOUND);
    }
    return await OrderRepository.deleteOrder(id);
  }
}

export default OrderService;
