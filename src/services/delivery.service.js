import DeliveryRepository from "../repositories/delivery.repository.js";
import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";

class DeliveryService {
  static async getDeliveries(page = 1, limit = 10) {
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

    const [deliveries, total] = await Promise.all([
      DeliveryRepository.getDeliveries(skip, limit),
      DeliveryRepository.count(),
    ]);

    return {
      deliveries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getDeliveryById(id) {
    const delivery = await DeliveryRepository.getDeliveryById(id);
    if (!delivery) {
      throw new CustomError(ERROR_DICTIONARY.DELIVERY_NOT_FOUND);
    }
    return delivery;
  }

  static async createDelivery(delivery) {
    const newDelivery = await DeliveryRepository.createDelivery(delivery);
    return newDelivery;
  }

  static async updateDelivery(id, delivery) {
    const existingDelivery = await DeliveryRepository.getDeliveryById(id);
    if (!existingDelivery) {
      throw new CustomError(ERROR_DICTIONARY.DELIVERY_NOT_FOUND);
    }
    const deliveryUpdate = await DeliveryRepository.updateDelivery(
      id,
      delivery,
    );
    return deliveryUpdate;
  }

  static async deleteDelivery(id) {
    const delivery = await DeliveryRepository.getDeliveryById(id);
    if (!delivery) {
      throw new CustomError(ERROR_DICTIONARY.DELIVERY_NOT_FOUND);
    }
    return await DeliveryRepository.deleteDelivery(id);
  }
}

export default DeliveryService;
