const request = require("supertest");
const app = require("../server");

describe("Cart Routes", () => {
  it("should get cart items", async () => {
    const response = await request(app).get("/api/cart");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should add item to cart", async () => {
    const response = await request(app)
      .post("/api/cart")
      .send({ productId: 1 });
    expect(response.status).toBe(201);
  });
});
