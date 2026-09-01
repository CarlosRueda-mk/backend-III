import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Swagger API", () => {
  it("should access Swagger documentation", async () => {
    const response = await request(app).get("/api/docs");

    expect(response.status).to.equal(301);
    expect(response.headers).to.have.property("location", "/api/docs/");
  });
});
