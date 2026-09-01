import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Logger API", () => {
  it("should execute the logger test", async () => {
    const response = await request(app).get("/api/logger/test");

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("message", "Logger test completed");
  });
});
