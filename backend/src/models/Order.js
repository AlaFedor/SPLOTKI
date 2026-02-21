class Order {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createOrder(customerData) {
    const { customer, email, phone, address } = customerData;

    // Używamy transakcji, żeby mieć pewność, że nie zostanie zamówienie bez wyczyszczenia koszyka
    return await this.prisma.$transaction(async (tx) => {
      const cartItems = await tx.cartItem.findMany();
      if (cartItems.length === 0) throw new Error("Koszyk jest pusty");

      const order = await tx.order.create({
        data: {
          customer,
          email,
          phone,
          address,
          items: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      });

      // Czyścimy koszyk po udanym zamówieniu
      await tx.cartItem.deleteMany();
      return order;
    });
  }
}

module.exports = Order;
