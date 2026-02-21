const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

// Import modeli i routerów
const OrderModel = require("./src/models/Order");
const CartModel = require("./src/models/Cart");
const ProductModel = require("./src/models/Product");
const orderRoutes = require("./src/routes/orderRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Inicjalizacja modeli
const orderManager = new OrderModel(prisma);
const cartManager = new CartModel(prisma);
const productManager = new ProductModel(prisma);

// Podpięcie routerów z przekazanymi modelami
app.use("/api/orders", orderRoutes(orderManager));
app.use("/api/products", productRoutes(productManager));
app.use("/api/cart", cartRoutes(cartManager));

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
}

module.exports = app;
