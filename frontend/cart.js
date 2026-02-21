async function updateCartCount() {
  try {
    const response = await fetch("http://localhost:3000/api/cart");
    const cartItems = await response.json();

    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.innerText = totalCount;
    }
  } catch (error) {
    console.error("Błąd podczas aktualizacji licznika koszyka:", error);
  }
}

async function fetchCartItems() {
  try {
    const response = await fetch("http://localhost:3000/api/cart");
    const cartItems = await response.json();

    const container = document.getElementById("cart-items-container");
    if (!container) return;

    container.innerHTML = "";
    let total = 0;

    cartItems.forEach((item) => {
      const itemTotal = item.product.price * item.quantity;
      total += itemTotal;

      container.innerHTML += `
        <tr>
            <td data-label="Produkt"><img src="../${item.product.img}" alt="${item.product.name}" class="cart-table-img"></td>
            <td data-label="Nazwa" class="product-name">${item.product.name}</td>
            <td data-label="Cena">${item.product.price} zł</td>
            <td data-label="Ilość">
                <div class="quantity-controls">
                    <button class="btn-qty" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span class="qty-number">${item.quantity}</span>
                    <button class="btn-qty" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </td>
            <td data-label="Suma" class="item-total">${itemTotal.toFixed(2)} zł</td>
            <td data-label="Akcja">
                <button class="btn-remove-cart" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
    `;
    });

    const totalElement = document.getElementById("total-price");
    if (totalElement) totalElement.innerText = `${total.toFixed(2)} zł`;
  } catch (error) {
    console.error("Błąd podczas ładowania koszyka:", error);
  }
}

// funkcja do zmiany ilości produktu w koszyku
async function changeQuantity(cartItemId, delta) {
  try {
    await fetch("http://localhost:3000/api/cart/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId, delta }),
    });
    fetchCartItems();
    updateCartCount();
  } catch (error) {
    console.error("Błąd podczas zmiany ilości:", error);
  }
}

async function removeFromCart(cartItemId) {
  if (!confirm("Czy na pewno chcesz usunąć ten produkt z koszyka?")) return;

  try {
    const response = await fetch(
      `http://localhost:3000/api/cart/${cartItemId}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      fetchCartItems();
      updateCartCount();
    } else {
      console.error("Błąd podczas usuwania produktu");
    }
  } catch (error) {
    console.error("Błąd sieci:", error);
  }
}

const orderForm = document.getElementById("final-order-form");
if (orderForm) {
  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const orderData = {
      customer: document.getElementById("cust-name").value,
      email: document.getElementById("cust-email").value,
      phone: document.getElementById("cust-phone").value,
      address: `${document.getElementById("cust-street").value}, ${document.getElementById("cust-zip").value} ${document.getElementById("cust-city").value}, Polska`,
    };

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Dziękujemy za złożenie zamówienia!");
        fetchCartItems();
        updateCartCount();
        e.target.reset();
      } else {
        const err = await response.json();
        alert("Błąd: " + err.error);
      }
    } catch (error) {
      console.error("Błąd połączenia:", error);
    }
  });
}

const zipInput = document.getElementById("cust-zip");
if (zipInput) {
  zipInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      e.target.value = value.slice(0, 2) + "-" + value.slice(2, 5);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  if (document.getElementById("cart-items-container")) {
    fetchCartItems();
  }
});
