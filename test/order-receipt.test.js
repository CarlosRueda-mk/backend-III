import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import UserModel from "../src/models/User.model.js";
import ProductModel from "../src/models/Product.model.js";
import OrderModel from "../src/models/Order.model.js";

describe("Order Receipt", () => {
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
      name: "Receipt Test User",
      email: "receipt-test@example.com",
      password: "123456",
    });

    product = await ProductModel.create({
      name: "Receipt Test Product",
      description: "Product for receipt testing",
      code: "RECEIPT-001",
      stock: 10,
      price: 100,
      thumbnail: "test-thumbnail.jpg",
    });

    order = await OrderModel.create({
      user: user._id,
      products: [
        {
          product: product._id,
          quantity: 1,
        },
      ],
    });
  });

  after(async () => {
    await OrderModel.deleteMany({});
    await ProductModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should upload a receipt successfully", async () => {
    const response = await request(app)
      .post(`/api/orders/${order._id}/receipt`)
      .attach("receipt", "test/fixtures/test-document.pdf");

    expect(response.status).to.equal(200);

    expect(response.body).to.have.property("_id");
    expect(response.body).to.have.property("receipt");

    expect(response.body.receipt).to.have.property("originalName");
    expect(response.body.receipt).to.have.property("fileName");
    expect(response.body.receipt).to.have.property("path");
    expect(response.body.receipt).to.have.property("mimetype");
    expect(response.body.receipt).to.have.property("size");
    expect(response.body.receipt).to.have.property("uploadedAt");
  });

  it("should return 404 when order does not exist", async () => {
    const fakeOrderId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .post(`/api/orders/${fakeOrderId}/receipt`)
      .attach("receipt", "test/fixtures/test-document.pdf");

    expect(response.status).to.equal(404);

    expect(response.body).to.have.property("success", false);
    expect(response.body).to.have.property("error");

    expect(response.body.error).to.have.property("code", "NOT_FOUND");
    expect(response.body.error).to.have.property("message", "Order not found");
  });

  it("should return 400 when receipt file is missing", async () => {
    const response = await request(app).post(
      `/api/orders/${order._id}/receipt`,
    );

    expect(response.status).to.equal(400);

    expect(response.body).to.have.property("success", false);
    expect(response.body).to.have.property("error");

    expect(response.body.error).to.have.property("code", "VALIDATION_ERROR");

    expect(response.body.error).to.have.property("message", "File is required");
  });
});
