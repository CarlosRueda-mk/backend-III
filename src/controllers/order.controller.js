import OrderService from "../services/order.service.js";

class OrderController {
  static async getAllOrders(req, res, next) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json({ orders });
    } catch (error) {
      next(error);
    }
  }

  static async getOrderById(req, res, next) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      res.status(200).json({ order });
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req, res, next) {
    try {
      const newOrder = await OrderService.createOrder(req.body);
      res.status(201).json({ newOrder });
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(req, res, next) {
    try {
      const updateOrder = await OrderService.updateOrder(
        req.params.id,
        req.body,
      );
      res.status(200).json({ updateOrder });
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req, res, next) {
    try {
      await OrderService.deleteOrder(req.params.id);
      res.status(200).json({ message: "Order deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async addReceipt(req, res, next) {
    try {
      const updatedOrder = await OrderService.addReceipt(
        req.params.id,
        req.file,
      );

      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
