const request = require("supertest");
const app = require("../server");

describe("Order Routes", () => {
  it("should create an order", async () => {
    const orderData = {
      customer: "Test Customer",
      email: "test@example.com",
      phone: "123456789",
      address: "Test Address",
    };
    const response = await request(app).post("/api/orders").send(orderData);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Zamówienie złożone!");
  });
});
