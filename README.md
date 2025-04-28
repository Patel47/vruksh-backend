# Vruksh - Online Tree Selling Platform

Vruksh is an e-commerce platform for selling plants and trees online. This is the backend API for the platform.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [License](#license)

## Features

- User authentication and authorization
- Product management
- Category management
- Shopping cart functionality
- Order management
- Admin dashboard
- API documentation with Swagger

## Prerequisites

- Node.js (v18 or higher)
- Bun (v1.0 or higher)
- MongoDB (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/vruksh-backend.git
cd vruksh-backend
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vruksh
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
```

## Running the Application

1. Start MongoDB:

```bash
mongod
```

2. Seed the database:

```bash
bun run seed
```

3. Start the development server:

```bash
bun run dev
```

4. Run tests:

```bash
bun run test
```

## API Documentation

The API documentation is available at `http://localhost:5000/api-docs` when the server is running.

### Authentication

#### Register a new user

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login user

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

#### Get user profile

```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Products

#### Get all products

```http
GET /api/products
```

#### Get product by ID

```http
GET /api/products/:id
```

#### Create product (Admin only)

```http
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Monstera Deliciosa",
  "description": "A popular indoor plant",
  "price": 29.99,
  "category": "category_id",
  "stock": 10
}
```

### Categories

#### Get all categories

```http
GET /api/categories
```

#### Create category (Admin only)

```http
POST /api/categories
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Indoor Plants",
  "description": "Plants suitable for indoor environments"
}
```

### Cart

#### Get cart

```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add to cart

```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 2
}
```

### Orders

#### Create order

```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "zipCode": "10001"
  },
  "paymentMethod": "COD"
}
```

## Testing

The application includes comprehensive tests for all major functionalities:

1. Authentication tests
2. Product management tests
3. Cart management tests
4. Order management tests

To run the tests:

```bash
bun run test
```

## License

This project is licensed under the Dhruv Production House License - see the LICENSE file for details.
