# Splotki - E-commerce Platform

A simple e-commerce platform for handmade crochet products, built with Node.js, Express, Prisma, and vanilla JavaScript.

## Features

- **Product Catalog**: Browse products by categories (bestsellers, hats, bags, accessories)
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Place orders with customer details
- **Admin Features**: (Future) Manage products and orders

## Tech Stack

- **Backend**: Node.js, Express.js, Prisma ORM, SQLite
- **Frontend**: HTML, CSS, JavaScript
- **Database**: SQLite (via Prisma)

## Project Structure

```
SPLOTKI/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── migrations/
│   ├── src/
│   │   ├── models/ (Product, Cart, Order)
│   │   ├── routes/ (productRoutes, cartRoutes, orderRoutes)
│   │   └── middleware/ (validateOrder)
│   ├── tests/ (unit tests)
│   ├── server.js
│   └── package.json
└── frontend/
    ├── index.html
    ├── style.css
    ├── cart.js
    ├── produkty.js
    └── Koszyk/, O nas/, Produkty/ (pages)
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm

### Installation

1. **Clone the repository** (if applicable) or navigate to the project folder.

2. **Backend Setup**:

   ```bash
   cd backend
   npm install
   npx prisma migrate deploy
   npx prisma db seed
   npm start
   ```

   Server runs on `http://localhost:3000`

3. **Frontend**:
   Open `frontend/index.html` in your browser. It connects to the backend API.

### Running Tests

```bash
cd backend
npm test
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart (body: { productId })
- `DELETE /api/cart/:id` - Remove item from cart
- `PATCH /api/cart/update` - Update item quantity (body: { cartItemId, delta })
- `POST /api/orders` - Create order (body: customer details)

## Database Schema

- **Product**: id, name, description, price, img, categories
- **Category**: id, name
- **CartItem**: id, productId, quantity
- **Order**: id, customer, email, phone, address, createdAt, items

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Push and create a PR

## License

ISC
