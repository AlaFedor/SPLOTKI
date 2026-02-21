// Funkcja pobierająca produkty z serwera
async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) throw new Error("Problem z pobraniem danych");

    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Błąd:", error);
    document.getElementById("products-list").innerHTML =
      "<p>Nie udało się załadować produktów.</p>";
  }
}

// Funkcja wypisująca produkty na strone
function renderProducts(allProducts) {
  const containers = {
    bestsellers: document.getElementById("bestsellers-container"),
    czapki: document.getElementById("czapki-container"),
    torebki: document.getElementById("torebki-container"),
    akcesoria: document.getElementById("akcesoria-container"),
  };

  Object.values(containers).forEach((c) => {
    if (c) c.innerHTML = "";
  });

  allProducts.forEach((product) => {
    const productHtml = createProductCard(product);

    // Teraz nazwy kategorii są w: product.categories[].category.name
    const categoryNames = product.categories.map((c) => c.category.name);

    if (categoryNames.includes("bestsellers") && containers.bestsellers) {
      containers.bestsellers.innerHTML += productHtml;
    }
    if (categoryNames.includes("czapki") && containers.czapki) {
      containers.czapki.innerHTML += productHtml;
    }
    if (categoryNames.includes("torebki") && containers.torebki) {
      containers.torebki.innerHTML += productHtml;
    }
    if (categoryNames.includes("akcesoria") && containers.akcesoria) {
      containers.akcesoria.innerHTML += productHtml;
    }
  });
}

function createProductCard(product) {
  return `
    <div class="product">
        <img src="../${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span>${product.price} zł</span>
        <button class="btn-add-to-cart" 
                onclick="addToCart(${product.id})"> <i class="fa-solid fa-plus"></i> DODAJ DO KOSZYKA
        </button>
    </div>
  `;
}

// Funkcja logiki koszyka
async function addToCart(productId) {
  try {
    const response = await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: productId }),
    });

    if (response.ok) {
      alert("Dodano do koszyka!");
      updateCartCount(); // Funkcja, która odświeży cyferkę w menu
    }
  } catch (error) {
    console.error("Błąd podczas dodawania do koszyka:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchProducts);
