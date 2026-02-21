const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("--- Rozpoczynam czyszczenie bazy ---");
  await prisma.categoriesOnProducts.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("--- Tworzę kategorie ---");
  const catBestsellers = await prisma.category.create({
    data: { name: "bestsellers" },
  });
  const catCzapki = await prisma.category.create({ data: { name: "czapki" } });
  const catTorebki = await prisma.category.create({
    data: { name: "torebki" },
  });
  const catAkcesoria = await prisma.category.create({
    data: { name: "akcesoria" },
  });

  console.log("--- Przygotowuję listę produktów ---");

  const itemsToSeed = [
    {
      name: "Shopper bag",
      description: "95% bawełna, 5% elastan",
      price: 120.0,
      img: "img/bag.jpg",
      cats: [catBestsellers, catTorebki],
    },
    {
      name: "Beanie",
      description: "80% bawełna, 20% mohair",
      price: 100.0,
      img: "img/beanie.jpg",
      cats: [catBestsellers, catCzapki],
    },
    {
      name: "Basic Hat",
      description: "100% bawełna",
      price: 90.0,
      img: "img/hat.jpg",
      cats: [catBestsellers, catCzapki],
    },
    {
      name: "Egg Bag",
      description: "95% bawełna, 5% elastan",
      price: 150.0,
      img: "img/bag5.jpg",
      cats: [catTorebki, catBestsellers],
    },
    {
      name: "Briana",
      description: "95% bawełna, 5% elastan",
      price: 150.0,
      img: "img/bag2.jpg",
      cats: [catTorebki],
    },
    {
      name: "Czapka z alpaki",
      description: "100% alpaka",
      price: 100.0,
      img: "img/czapka.jpg",
      cats: [catCzapki],
    },
    {
      name: "Zawieszka",
      description: "100% akryl",
      price: 40.0,
      img: "img/zawieszka.jpg",
      cats: [catAkcesoria],
    },
    {
      name: "Opaska na włosy",
      description: "50% akryl, 50% bawełna",
      price: 55.0,
      img: "img/headband.jpg",
      cats: [catAkcesoria, catBestsellers],
    },
    {
      name: "Scrunchie",
      description: "100% bawełna",
      price: 30.0,
      img: "img/scrunchie.jpg",
      cats: [catAkcesoria],
    },
  ];

  console.log("--- Wstawiam produkty do bazy ---");

  for (const item of itemsToSeed) {
    await prisma.product.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        img: item.img,
        categories: {
          create: item.cats.map((c) => ({
            category: { connect: { id: c.id } },
          })),
        },
      },
    });
    console.log(`Dodano produkt: ${item.name}`);
  }

  console.log("--- Seedowanie zakończone sukcesem! ---");
}

main()
  .catch((e) => {
    console.error("Błąd podczas seedowania:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
