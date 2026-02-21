const validateOrder = require("../src/middleware/validateOrder");

describe("validateOrder Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next() for valid data", () => {
    req.body = {
      customer: "John Doe",
      email: "john@example.com",
      phone: "123456789",
      address: "Valid Address 123",
    };

    validateOrder(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 400 if customer is missing", () => {
    req.body = {
      email: "john@example.com",
      phone: "123456789",
      address: "Valid Address 123",
    };

    validateOrder(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Wszystkie pola są wymagane.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 if email is missing", () => {
    req.body = {
      customer: "John Doe",
      phone: "123456789",
      address: "Valid Address 123",
    };

    validateOrder(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Wszystkie pola są wymagane.",
    });
  });

  it("should return 400 if phone is missing", () => {
    req.body = {
      customer: "John Doe",
      email: "john@example.com",
      address: "Valid Address 123",
    };

    validateOrder(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Wszystkie pola są wymagane.",
    });
  });

  it("should return 400 if address is too short", () => {
    req.body = {
      customer: "John Doe",
      email: "john@example.com",
      phone: "123456789",
      address: "Short",
    };

    validateOrder(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Proszę podać pełny adres dostawy.",
    });
  });

  it("should return 400 for invalid phone format", () => {
    req.body = {
      customer: "John Doe",
      email: "john@example.com",
      phone: "123-456-78",
      address: "Valid Address 123",
    };

    validateOrder(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Błędny format numeru telefonu.",
    });
  });
});
