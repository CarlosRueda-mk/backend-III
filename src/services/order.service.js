import OrderRepository from "../repositories/order.repository.js";
import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";
import logger from "../config/logger.js";

class OrderService {
  static async getOrders(page = 1, limit = 10) {
    page = Number(page);
    limit = Number(limit);

    if (!Number.isInteger(page) || page < 1) {
      page = 1;
    }

    if (!Number.isInteger(limit) || limit < 1) {
      limit = 10;
    }

    if (limit > 100) {
      limit = 100;
    }

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      OrderRepository.getOrders(skip, limit),
      OrderRepository.count(),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
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

  static async addReceipt(id, file) {
    const existingOrder = await OrderRepository.getOrderById(id);

    if (!existingOrder) {
      throw new CustomError(ERROR_DICTIONARY.ORDER_NOT_FOUND);
    }

    if (!file) {
      throw new CustomError(ERROR_DICTIONARY.FILE_REQUIRED);
    }

    const receipt = {
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      uploadedAt: new Date(),
    };

    const updatedOrder = await OrderRepository.addReceipt(id, receipt);

    if (!updatedOrder) {
      throw new CustomError(ERROR_DICTIONARY.ORDER_NOT_FOUND);
    }
    logger.info(`Receipt uploaded successfully for order: ${id}`);
    return updatedOrder;
  }
}

export default OrderService;
