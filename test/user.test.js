import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import UserModel from "../src/models/User.model.js";

describe("Users API", () => {
  before(async function () {
    this.timeout(10000);

    await connectDB();

    await UserModel.deleteMany({});

    await UserModel.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "123456",
    });
  });

  after(async () => {
    await UserModel.deleteMany({});
  });

  it("should get all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("users");
    expect(response.body.users).to.be.an("array");

    expect(response.body).to.have.property("pagination");
    expect(response.body.pagination).to.have.property("page");
    expect(response.body.pagination).to.have.property("limit");
    expect(response.body.pagination).to.have.property("total");
    expect(response.body.pagination).to.have.property("totalPages");

    expect(response.body.users[0]).to.have.property("_id");
    expect(response.body.users[0]).to.have.property("name");
    expect(response.body.users[0]).to.have.property("email");
    expect(response.body.users[0]).to.have.property("role");
  });

  it("should not create a user with an existing email", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Another User",
      email: "testuser@example.com",
      password: "123456",
    });

    expect(response.status).to.equal(409);

    expect(response.body).to.have.property("success", false);
    expect(response.body).to.have.property("error");

    expect(response.body.error).to.have.property("code", "DUPLICATE_RESOURCE");

    expect(response.body.error).to.have.property(
      "message",
      "This email is already used",
    );
  });
});
