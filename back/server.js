const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Pozwala frontendowi łączyć się z backendem
app.use(express.json()); // Pozwala serwerowi rozumieć dane w formacie JSON

//Pobieranie produktów z bazy
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Błąd podczas pobierania produktów" });
  }
});

//Dodawanie produktów do koszyka
app.post("/api/cart", async (req, res) => {
  try {
    const { productId } = req.body;
    const pId = parseInt(productId);

    // Sprawdzamy czy ten produkt już jest w koszyku
    const existingItem = await prisma.cartItem.findFirst({
      where: { productId: pId },
    });

    if (existingItem) {
      // Jeśli jest, zwiększamy ilość o 1
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });
      return res.json(updatedItem);
    } else {
      // Jeśli nie ma, tworzymy nowy wpis
      const newItem = await prisma.cartItem.create({
        data: {
          productId: pId,
          quantity: 1,
        },
      });
      return res.status(201).json(newItem);
    }
  } catch (error) {
    console.error("Błąd serwera:", error);
    res.status(500).json({ error: "Błąd podczas dodawania do bazy" });
  }
});

//Pobieranie zawartości koszyka
app.get("/api/cart", async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      include: {
        product: true,
      },
    });
    res.json(cartItems);
  } catch (error) {
    console.error("Błąd podczas pobierania koszyka:", error);
    res.status(500).json({ error: "Błąd podczas pobierania koszyka" });
  }
});

// Aktualizacja ilości produktu w koszyku (+1 / -1)
app.patch("/api/cart/update", async (req, res) => {
  try {
    const { cartItemId, delta } = req.body;

    const item = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!item)
      return res.status(404).json({ error: "Nie znaleziono elementu" });

    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      // Jeśli ilość spadnie do 0, usuwamy produkt z koszyka
      await prisma.cartItem.delete({ where: { id: cartItemId } });
      return res.json({ message: "Usunięto z koszyka" });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas aktualizacji ilości" });
  }
});

//Usunięcie produktów z koszyka
app.delete("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cartItem.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Usunięto produkt" });
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas usuwania" });
  }
});

//Pobieranie danych z formularza do zamówienia
app.post("/api/orders", async (req, res) => {
  try {
    const { customer, email, phone, address } = req.body;

    if (!address || address.length < 5) {
      return res
        .status(400)
        .json({ error: "Proszę podać pełny adres dostawy." });
    }

    const cartItems = await prisma.cartItem.findMany();
    if (cartItems.length === 0)
      return res.status(400).json({ error: "Koszyk jest pusty" });

    const newOrder = await prisma.$transaction(async (tx) => {
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

      await tx.cartItem.deleteMany();
      return order;
    });

    res.status(201).json({ message: "Zamówienie złożone!" });
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas składania zamówienia" });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer Splotki działa na http://localhost:${PORT}`);
});
