# Splotki - E-commerce Platform

A simple e-commerce platform for handmade crochet products, built with Node.js, Express, Prisma, and JavaScript.

## Features

- **Product Catalog**: Browse products by categories (bestsellers, hats, bags, accessories)
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Place orders with customer details

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

- Node.js
- npm

### Installation

1. **Clone the repository**
2. **Ensure .env file exists**
   -if not create .env file in folder "backend" and paste
   `DATABASE_URL="file:./dev.db"` into it

3. **Backend Setup**:

   ```bash
   cd backend
   npm install
   npx prisma migrate deploy
   npx prisma db seed
   npm start
   ```

   Server runs on `http://localhost:3000`

4. **Frontend**:
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
