function validateOrder(req, res, next) {
  const { customer, email, phone, address } = req.body;

  if (!customer || !email || !phone) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane." });
  }

  // Walidacja adresu
  if (!address || address.length < 10) {
    return res.status(400).json({ error: "Proszę podać pełny adres dostawy." });
  }

  // Walidacja telefonu (9 cyfr)
  const phoneRegex = /^[0-9]{9}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    return res.status(400).json({ error: "Błędny format numeru telefonu." });
  }

  next(); // Jeśli wszystko OK, idź dalej do kontrolera/modelu
}

module.exports = validateOrder;
