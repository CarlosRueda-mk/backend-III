import MockGenerator from "../mock.generator.js";
import UserModel from "../../models/User.model.js";
import ProductModel from "../../models/Product.model.js";
import OrderModel from "../../models/Order.model.js";
import DeliveryModel from "../../models/Delivery.model.js";
import CustomError from "../../errors/custom-error.js";
import ERROR_DICTIONARY from "../../errors/error-dictionary.js";
import logger from "../../config/logger.js";

class MockService {
  static async generateUsers(quantity) {
    const total = Number(quantity);
    if (isNaN(total) || total < 1 || total > 100) {
      logger.warning(
        `invalid quantity provided for generating users: ${quantity}`,
      );
      throw new CustomError(ERROR_DICTIONARY.INVALID_QUANTITY);
    }

    return Array.from({ length: total }, () => MockGenerator.generateUser());
  }

  static async generateOrders(quantity) {
    const total = Number(quantity);
    if (isNaN(total) || total < 1 || total > 100) {
      logger.warning(
        `invalid quantity provided for generating Orders: ${quantity}`,
      );
      throw new CustomError(ERROR_DICTIONARY.INVALID_QUANTITY);
    }

    return Array.from({ length: total }, () => MockGenerator.generateOrder());
  }

  static async populateDatabase(data) {
    const { users, products, orders, deliveries } = data;

    if (users < 1 || products < 1 || orders < 1 || deliveries < 1) {
      logger.warning("Invalid quantity provided for database population");

      throw new CustomError(ERROR_DICTIONARY.INVALID_QUANTITY);
    }

    const mockUsers = Array.from({ length: users }, () =>
      MockGenerator.generateUser(),
    );

    const createdUsers = await UserModel.insertMany(mockUsers);

    const mockProducts = Array.from({ length: products }, () =>
      MockGenerator.generateProduct(),
    );

    const createdProducts = await ProductModel.insertMany(mockProducts);

    const mockOrders = Array.from({ length: orders }, () => {
      const order = MockGenerator.generateOrder();

      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];

      const randomProduct =
        createdProducts[Math.floor(Math.random() * createdProducts.length)];

      order.user = randomUser._id;
      order.products[0].product = randomProduct._id;

      return order;
    });

    const createdOrders = await OrderModel.insertMany(mockOrders);

    const mockDeliveries = Array.from({ length: deliveries }, () => {
      const delivery = MockGenerator.generateDelivery();

      const randomOrder =
        createdOrders[Math.floor(Math.random() * createdOrders.length)];

      const randomDeliveryMan =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];

      delivery.order = randomOrder._id;
      delivery.deliveryMan = randomDeliveryMan._id;

      return delivery;
    });

    const createdDeliveries = await DeliveryModel.insertMany(mockDeliveries);

    logger.info(
      `Mock database populated: ${users} users, ${products} products, ${orders} orders, ${deliveries} deliveries`,
    );
    return {
      users: createdUsers,
      products: createdProducts,
      orders: createdOrders,
      deliveries: createdDeliveries,
    };
  }
  static async generateProducts(quantity) {
    const total = Number(quantity);

    if (isNaN(total) || total < 1 || total > 100) {
      logger.warning(
        `invalid quantity provided for generating products: ${quantity}`,
      );
      throw new CustomError(ERROR_DICTIONARY.INVALID_QUANTITY);
    }

    return Array.from({ length: total }, () => MockGenerator.generateProduct());
  }
  static async generateDeliveries(quantity) {
    const total = Number(quantity);

    if (isNaN(total) || total < 1 || total > 100) {
      logger.warning(
        `invalid quantity provided for generating deliveries: ${quantity}`,
      );
      throw new CustomError(ERROR_DICTIONARY.INVALID_QUANTITY);
    }

    return Array.from({ length: total }, () =>
      MockGenerator.generateDelivery(),
    );
  }
}

export default MockService;
