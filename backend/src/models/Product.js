class Product {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getAll() {
    return await this.prisma.product.findMany({
      include: {
        categories: { include: { category: true } },
      },
    });
  }

  // Pobieranie bestsellerów
  async getBestsellers(limit = 4) {
    return await this.prisma.product.findMany({
      where: {
        categories: {
          some: { category: { name: "bestsellers" } },
        },
      },
      take: limit,
      include: { categories: { include: { category: true } } },
    });
  }
}

module.exports = Product;
