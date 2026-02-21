// src/routes/cartRoutes.js
const express = require("express");
const router = express.Router();

// Funkcja, która przyjmuje zainicjalizowany model z server.js
function cartRoutes(cartModel) {
  router.get("/", async (req, res) => {
    try {
      const cartItems = await cartModel.getItems();
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { productId } = req.body;
      const item = await cartModel.addItem(productId);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const cartItemId = req.params.id;
      const item = await cartModel.removeItem(cartItemId);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.patch("/update", async (req, res) => {
    try {
      const { cartItemId, delta } = req.body;
      const item = await cartModel.updateQuantity(cartItemId, delta);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

module.exports = cartRoutes;
