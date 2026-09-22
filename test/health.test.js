import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Health Check", () => {
  it("should return the API health status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("status", "ok");
    expect(response.body).to.have.property("environment");
    expect(response.body).to.have.property("uptime");
    expect(response.body).to.have.property("timestamp");

    expect(response.body.uptime).to.be.a("number");
    expect(response.body.timestamp).to.be.a("string");
  });
});
