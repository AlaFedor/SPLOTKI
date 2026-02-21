const express = require("express");
const router = express.Router();

// Funkcja, która przyjmuje zainicjalizowany model z server.js
function productRoutes(productModel) {
  router.get("/", async (req, res) => {
    try {
      const products = await productModel.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

module.exports = productRoutes;
