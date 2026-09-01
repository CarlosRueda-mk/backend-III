import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import UserModel from "../src/models/User.model.js";
import mongoose from "mongoose";

describe("User Documents API", () => {
  let user;

  before(async function () {
    this.timeout(10000);

    await connectDB();

    await UserModel.deleteMany({});

    user = await UserModel.create({
      name: "Document Test User",
      email: "document-test@example.com",
      password: "123456",
    });
  });

  after(async () => {
    await UserModel.deleteMany({});
  });

  it("should upload a user document", async () => {
    const response = await request(app)
      .post(`/api/users/${user._id}/documents`)
      .field("documentType", "driver_license")
      .attach("document", "test/fixtures/test-document.pdf");

    expect(response.status).to.equal(200);

    expect(response.body).to.have.property("_id");
    expect(response.body).to.have.property("documents");

    expect(response.body.documents).to.be.an("array");
    expect(response.body.documents).to.have.lengthOf(1);

    const document = response.body.documents[0];

    expect(document).to.have.property("originalName");
    expect(document).to.have.property("fileName");
    expect(document).to.have.property("path");
    expect(document).to.have.property("mimetype");
    expect(document).to.have.property("size");
    expect(document).to.have.property("documentType");
    expect(document).to.have.property("uploadedAt");

    expect(document.documentType).to.equal("driver_license");
  });

  it("should return 400 when file is missing", async () => {
    const response = await request(app)
      .post(`/api/users/${user._id}/documents`)
      .field("documentType", "driver_license");

    expect(response.status).to.equal(400);

    expect(response.body).to.have.property("success", false);
    expect(response.body).to.have.property("error");

    expect(response.body.error).to.have.property("code");
    expect(response.body.error).to.have.property("message");
  });

  it("should return 400 when document type is invalid", async () => {
    const response = await request(app)
      .post(`/api/users/${user._id}/documents`)
      .field("documentType", "invalid_document")
      .attach("document", "test/fixtures/test-document.pdf");

    expect(response.status).to.equal(400);

    expect(response.body).to.have.property("success", false);
    expect(response.body).to.have.property("error");

    expect(response.body.error).to.have.property("code", "VALIDATION_ERROR");

    expect(response.body.error).to.have.property(
      "message",
      "Invalid document type",
    );
  });

  it("should return 404 when user does not exist", async () => {
    const fakeUserId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .post(`/api/users/${fakeUserId}/documents`)
      .field("documentType", "dni")
      .attach("document", "test/fixtures/test-document.pdf");

    expect(response.status).to.equal(404);

    expect(response.body).to.have.property("success", false);
    expect(response.body).to.have.property("error");

    expect(response.body.error).to.have.property("code", "NOT_FOUND");
    expect(response.body.error).to.have.property("message", "User not found");
  });
});
