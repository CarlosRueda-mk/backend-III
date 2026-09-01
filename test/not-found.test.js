import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Not Found", () => {
  it("should return 404 for a route that does not exist", async () => {
    const response = await request(app).get("/api/this-route-does-not-exist");

    expect(response.status).to.equal(404);

    expect(response.body).to.have.property("success", false);
    expect(response.body).to.have.property("error");

    expect(response.body.error).to.have.property("code", "NOT_FOUND");
    expect(response.body.error).to.have.property("message", "Route not found");
  });
});
