const express = require("express");
const router = express.Router();
const validateOrder = require("../middleware/validateOrder");

// Funkcja, która przyjmuje zainicjalizowany model z server.js
function orderRoutes(orderModel) {
  router.post("/", validateOrder, async (req, res) => {
    try {
      const order = await orderModel.createOrder(req.body);
      res.status(201).json({ message: "Zamówienie złożone!", order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

module.exports = orderRoutes;
