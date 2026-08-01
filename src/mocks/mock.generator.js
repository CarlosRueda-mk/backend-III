import { faker } from "@faker-js/faker";
import {
  USER_ROLES,
  PRODUCT_STATUS,
  ORDER_STATUS,
  DELIVERY_PRIORITY,
} from "../constants/index.js";

class MockGenerator {
  static generateUser() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: USER_ROLES.USER,
    };
  }

  static generateOrder() {
    return {
      user: faker.database.mongodbObjectId(),

      products: [
        {
          product: faker.database.mongodbObjectId(),
          quantity: faker.number.int({
            min: 1,
            max: 10,
          }),
        },
      ],
      status: ORDER_STATUS.PENDING,
    };
  }

  static generateProduct() {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.string.alphanumeric(8).toUpperCase(),
      stock: faker.number.int({
        min: 1,
        max: 500,
      }),
      price: faker.number.float({
        min: 100,
        max: 10000,
        fractionDigits: 2,
      }),
      status: PRODUCT_STATUS.ACTIVE,
      thumbnail: faker.image.url(),
    };
  }

  static generateDelivery() {
    return {
      order: faker.database.mongodbObjectId(),

      deliveryMan: faker.database.mongodbObjectId(),

      priority: DELIVERY_PRIORITY.MEDIUM,

      status: ORDER_STATUS.PENDING,
    };
  }
}

export default MockGenerator;
