import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import UserModel from "../src/models/User.model.js";
import ProductModel from "../src/models/Product.model.js";
import OrderModel from "../src/models/Order.model.js";
import DeliveryModel from "../src/models/Delivery.model.js";
import connectDB from "../src/config/db.js";

describe("Mocks API", () => {
  before(async function () {
    this.timeout(10000);
    await connectDB();
  });

  after(async () => {
    await DeliveryModel.deleteMany({});
    await OrderModel.deleteMany({});
    await ProductModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should generate the requested amount of users", async () => {
    const response = await request(app).get("/api/mocks/users?quantity=5");

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf(5);
  });

  it("should return 400 when quantity is invalid", async () => {
    const response = await request(app).get("/api/mocks/users?quantity=0");

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("success", false);
    expect(response.body.error).to.have.property("code", "VALIDATION_ERROR");
  });

  it("should generate the requested amount of products", async () => {
    const response = await request(app).get("/api/mocks/products?quantity=5");

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf(5);

    expect(response.body[0]).to.have.property("name");
    expect(response.body[0]).to.have.property("description");
    expect(response.body[0]).to.have.property("code");
    expect(response.body[0]).to.have.property("stock");
    expect(response.body[0]).to.have.property("price");
    expect(response.body[0]).to.have.property("status");
    expect(response.body[0]).to.have.property("thumbnail");
  });

  it("should generate the requested amount of orders", async () => {
    const response = await request(app).get("/api/mocks/orders?quantity=5");

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf(5);

    expect(response.body[0]).to.have.property("user");
    expect(response.body[0]).to.have.property("products");
    expect(response.body[0]).to.have.property("status");

    expect(response.body[0].products).to.be.an("array");
    expect(response.body[0].products[0]).to.have.property("product");
    expect(response.body[0].products[0]).to.have.property("quantity");
  });

  it("should generate the requested amount of deliveries", async () => {
    const response = await request(app).get("/api/mocks/deliveries?quantity=5");

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf(5);

    expect(response.body[0]).to.have.property("order");
    expect(response.body[0]).to.have.property("deliveryMan");
    expect(response.body[0]).to.have.property("priority");
    expect(response.body[0]).to.have.property("status");
  });

  it("should populate the database with mock data", async () => {
    const response = await request(app).post("/api/mocks/populate").send({
      users: 2,
      products: 2,
      orders: 2,
      deliveries: 2,
    });

    expect(response.status).to.equal(200);

    expect(response.body).to.have.property(
      "message",
      "Mock data inserted successfully",
    );

    expect(response.body).to.have.property("data");

    expect(response.body.data).to.have.property("users");
    expect(response.body.data).to.have.property("products");
    expect(response.body.data).to.have.property("orders");
    expect(response.body.data).to.have.property("deliveries");

    expect(response.body.data.users).to.have.lengthOf(2);
    expect(response.body.data.products).to.have.lengthOf(2);
    expect(response.body.data.orders).to.have.lengthOf(2);
    expect(response.body.data.deliveries).to.have.lengthOf(2);
  });
});
