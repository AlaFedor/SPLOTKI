class Cart {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // Pobieranie koszyka
  async getItems() {
    return await this.prisma.cartItem.findMany({
      include: { product: true },
    });
  }

  // Logika dodawania: Sprawdza czy produkt istnieje, jeśli tak - +1, jeśli nie - stwórz
  async addItem(productId) {
    const id = parseInt(productId);
    const existing = await this.prisma.cartItem.findFirst({
      where: { productId: id },
    });

    if (existing) {
      return await this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 },
      });
    }

    return await this.prisma.cartItem.create({
      data: { productId: id, quantity: 1 },
    });
  }

  // Usunięcie konkretnej pozycji
  async removeItem(cartItemId) {
    return await this.prisma.cartItem.delete({
      where: { id: parseInt(cartItemId) },
    });
  }

  // Zmiana ilości pozycji w koszyku
  async updateQuantity(cartItemId, delta) {
    const id = parseInt(cartItemId);
    const item = await this.prisma.cartItem.findUnique({
      where: { id },
    });

    if (!item) throw new Error("Pozycja w koszyku nie znaleziona");

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      return await this.removeItem(cartItemId);
    }

    return await this.prisma.cartItem.update({
      where: { id },
      data: { quantity: newQuantity },
    });
  }
}

module.exports = Cart;
