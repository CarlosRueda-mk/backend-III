import MockService from "../service/mock.service.js";

class MockController {
  static async getMockUsers(req, res, next) {
    try {
      const { quantity } = req.query;
      const users = await MockService.generateUsers(quantity);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getMockOrders(req, res, next) {
    try {
      const { quantity } = req.query;
      const orders = await MockService.generateOrders(quantity);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getMockProducts(req, res, next) {
    try {
      const { quantity } = req.query;
      const products = await MockService.generateProducts(quantity);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getMockDeliveries(req, res, next) {
    try {
      const { quantity } = req.query;
      const deliveries = await MockService.generateDeliveries(quantity);
      res.status(200).json(deliveries);
    } catch (error) {
      next(error);
    }
  }

  static async populateDatabase(req, res, next) {
    try {
      const saveMock = await MockService.populateDatabase(req.body);
      res.status(200).json({
        message: "Mock data inserted successfully",
        data: saveMock,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default MockController;
