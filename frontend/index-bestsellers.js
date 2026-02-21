async function loadMainBestsellers() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();

    const container = document.getElementById("main-bestsellers-container");
    container.innerHTML = "";

    const bestsellers = products
      .filter((p) =>
        p.categories.some((c) => c.category.name === "bestsellers"),
      )
      .slice(0, 4); // Pobiera tylko pierwsze 4, żeby nie rozwalić układu

    bestsellers.forEach((product) => {
      container.innerHTML += `
                <div class="featured-product">
                  <a href="Produkty/index.html">
                    <img src="${product.img}" alt="${product.name}" />
                  </a>
                  <p>${product.name}</p>
                </div>
            `;
    });
  } catch (error) {
    console.error("Błąd ładowania bestsellerów:", error);
  }
}

loadMainBestsellers();
