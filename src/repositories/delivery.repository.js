import DeliveryModel from "../models/Delivery.model.js";

class DeliveryRepository {
  static async getDeliveries(skip = 0, limit = 10) {
    return await DeliveryModel.find().skip(skip).limit(limit);
  }

  static async count() {
    return await DeliveryModel.countDocuments();
  }
  static async getDeliveryById(id) {
    return await DeliveryModel.findOne({ _id: id });
  }

  static async createDelivery(delivery) {
    return await DeliveryModel.create(delivery);
  }

  static async updateDelivery(id, delivery) {
    return await DeliveryModel.findOneAndUpdate({ _id: id }, delivery);
  }

  static async deleteDelivery(id) {
    return await DeliveryModel.findOneAndDelete({ _id: id });
  }
}

export default DeliveryRepository;
