import DeliveryRepository from "../repositories/delivery.repository.js";
import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";

class DeliveryService {
  static async getAllDeliveries() {
    const deliveries = await DeliveryRepository.getDeliveries();
    return deliveries;
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
