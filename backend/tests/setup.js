jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    product: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: "Test Product",
          price: 100,
          img: "test.jpg",
          categories: [{ category: { name: "bestsellers" } }],
        },
      ]),
    },
    cartItem: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          productId: 1,
          quantity: 1,
          product: { id: 1, name: "Test Product", price: 100, img: "test.jpg" },
        },
      ]),
      findFirst: jest.fn().mockResolvedValue(null),
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({
        id: 1,
        productId: 1,
        quantity: 1,
      }),
      delete: jest.fn().mockResolvedValue({
        id: 1,
      }),
      update: jest.fn().mockResolvedValue({
        id: 1,
        quantity: 2,
      }),
    },
    order: {
      create: jest.fn().mockResolvedValue({
        id: 1,
        customer: "Test",
        email: "test@example.com",
        phone: "123456789",
        address: "Test Address",
      }),
    },
    $transaction: jest.fn((callback) =>
      callback({
        cartItem: {
          findMany: jest
            .fn()
            .mockResolvedValue([{ id: 1, productId: 1, quantity: 1 }]),
          deleteMany: jest.fn().mockResolvedValue({}),
        },
        order: {
          create: jest.fn().mockResolvedValue({
            id: 1,
            customer: "Test",
            email: "test@example.com",
            phone: "123456789",
            address: "Test Address",
          }),
        },
      }),
    ),
  };

  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});
