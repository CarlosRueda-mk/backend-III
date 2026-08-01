import DeliveryService from "../services/delivery.service.js";

class DeliveryController {
  static async getAllDeliveries(req, res, next) {
    try {
      const deliveries = await DeliveryService.getAllDeliveries();
      res.status(200).json({ deliveries });
    } catch (error) {
      next(error);
    }
  }

  static async getDeliveryById(req, res, next) {
    try {
      const delivery = await DeliveryService.getDeliveryById(req.params.id);
      res.status(200).json({ delivery });
    } catch (error) {
      next(error);
    }
  }

  static async createDelivery(req, res, next) {
    try {
      const newDelivery = await DeliveryService.createDelivery(req.body);
      res.status(201).json({ newDelivery });
    } catch (error) {
      next(error);
    }
  }

  static async updateDelivery(req, res, next) {
    try {
      const updateDelivery = await DeliveryService.updateDelivery(
        req.params.id,
        req.body,
      );
      res.status(200).json({ updateDelivery });
    } catch (error) {
      next(error);
    }
  }

  static async deleteDelivery(req, res, next) {
    try {
      await DeliveryService.deleteDelivery(req.params.id);
      res.status(200).json({ message: "delivery deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default DeliveryController;
