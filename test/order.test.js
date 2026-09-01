import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import UserModel from "../src/models/User.model.js";
import ProductModel from "../src/models/Product.model.js";
import OrderModel from "../src/models/Order.model.js";

describe("Orders API", () => {
  let user;
  let product;
  let order;
  before(async function () {
    this.timeout(10000);

    await connectDB();

    await OrderModel.deleteMany({});
    await ProductModel.deleteMany({});
    await UserModel.deleteMany({});

    user = await UserModel.create({
      name: "Test User",
      email: "order-test@example.com",
      password: "123456",
    });

    product = await ProductModel.create({
      name: "Test Product",
      description: "Product for testing",
      code: "TEST-001",
      stock: 10,
      price: 100,
      thumbnail: "test-thumbnail.jpg",
    });

    order = await OrderModel.create({
      user: user._id,
      products: [
        {
          product: product._id,
          quantity: 2,
        },
      ],
    });
  });

  after(async () => {
    await OrderModel.deleteMany({});
    await ProductModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should get all orders", async () => {
    const response = await request(app).get("/api/orders");

    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("orders");

    expect(response.body.orders).to.be.an("array");
    expect(response.body.orders).to.have.lengthOf(1);

    expect(response.body.orders[0]).to.have.property("_id");
    expect(response.body.orders[0]).to.have.property("user");
    expect(response.body.orders[0]).to.have.property("products");
    expect(response.body.orders[0]).to.have.property("status");
  });

  it("should create an order", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        user: user._id,
        products: [
          {
            product: product._id,
            quantity: 2,
          },
        ],
      });

    expect(response.status).to.equal(201);

    expect(response.body).to.have.property("newOrder");

    expect(response.body.newOrder).to.have.property("_id");
    expect(response.body.newOrder).to.have.property("user");
    expect(response.body.newOrder).to.have.property("products");
    expect(response.body.newOrder).to.have.property("status");
  });

  it("should get an order by id", async () => {
    const response = await request(app).get(`/api/orders/${order._id}`);

    expect(response.status).to.equal(200);

    expect(response.body).to.have.property("order");

    expect(response.body.order).to.have.property("_id");
    expect(response.body.order).to.have.property("user");
    expect(response.body.order).to.have.property("products");
    expect(response.body.order).to.have.property("status");
  });

  it("should return 404 when order does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app).get(`/api/orders/${fakeId}`);

    expect(response.status).to.equal(404);

    expect(response.body).to.have.property("success", false);
    expect(response.body).to.have.property("error");

    expect(response.body.error).to.have.property("code");
    expect(response.body.error).to.have.property("message");

    expect(response.body.error.message).to.equal("Order not found");
  });

  it("should update an order", async () => {
    const response = await request(app).put(`/api/orders/${order._id}`).send({
      status: "shipped",
    });

    expect(response.status).to.equal(200);

    expect(response.body).to.have.property("updateOrder");

    expect(response.body.updateOrder).to.have.property("_id");
    expect(response.body.updateOrder).to.have.property("status");

    expect(response.body.updateOrder.status).to.equal("shipped");
  });

  it("should return 400 when order status is invalid", async () => {
    const response = await request(app).put(`/api/orders/${order._id}`).send({
      status: "invalid_status",
    });

    expect(response.status).to.equal(400);

    expect(response.body).to.have.property("success", false);
    expect(response.body).to.have.property("error");

    expect(response.body.error).to.have.property("code");
    expect(response.body.error.code).to.equal("VALIDATION_ERROR");

    expect(response.body.error).to.have.property("message");
  });

  it("should return 400 when order data is incomplete", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        products: [
          {
            product: product._id,
            quantity: 2,
          },
        ],
      });

    expect(response.status).to.equal(400);

    expect(response.body).to.have.property("success", false);
    expect(response.body).to.have.property("error");

    expect(response.body.error).to.have.property("code");
    expect(response.body.error).to.have.property("message");
  });
});
