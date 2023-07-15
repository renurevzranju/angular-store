# Store Backend Project

### Setting up the environment
After cloning/downloading this repo, create a file named '.env' and add the below environment variables.

```
POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = store
POSTGRES_USER = test_user
POSTGRES_PASSWORD = test_user
ENV = dev
AUTH0_DOMAIN = dev-revathi.us.auth0.com
AUTH0_API_AUDIENCE = https://dev-revathi.us.auth0.com/api/v2/
AUTH0_JWKURI = https://dev-revathi.us.auth0.com/.well-known/jwks.json
AUTH0_ALGORITHM = RS256
```

### Setting up postgresql
I'm using Windows OS, so all my commands will be related to that.

1. Install the PostgreSQL from [here](https://www.postgresql.org/download/windows). Ignore if you have installed it already.
2. Run `psql postgres` and login to the PostgreSQL database.
3. Run `CREATE USER test_user CREATEDB CREATEROLE PASSWORD 'test_user'` to create a user 'test_user' with password test_user and have privileges to create db and new role.
4. Run `CREATE DATABASE store WITH OWNER = test_user;` to create the database `store`.
5. Run `psql -h localhost -U test_user -d store` to check if the user is able to access the database store.

### Run Locally

Clone the project
```
  git clone https://github.com/renurevzranju/angular-store.git
```

Go to the project directory
```
  cd angular-store\backend
```

Install dependencies
```
  npm install
```

#### Scripts

Build script to compile TS to JS
```
  npm run build
```

Start the application after build
```
  npm run start
```

Start the application in watch mode
```
  npm run watch
```

Format the code
```
  npm run prettier
```

Lint the code
```
  npm run lint
```

## Usage

Server will be running on port 5000

### API Endpoints

#### Users
- POST http://localhost:5000/api/users -Create. Parameters are `user_name` and `email`. [token required]
- GET http://localhost:5000/api/users -Index [token required].
- GET http://localhost:5000/api/users/:id -Show [token required]
- GET http://localhost:5000/api/users/getUserByEmail/:email -Get User ID based on email [token required]

#### Products
- GET http://localhost:5000/api/products -Index - Ignoring token verification to add products before starting the Angular application.
- GET http://localhost:5000/api/products/:id -Show [token required]
- POST http://localhost:5000/api/products -Create [token required]. Parameters are: `name`, `price`, `category`, `description` and `imagecode`. [token required]
- GET http://localhost:5000/api/products/category/:category -Products by category [token required]
- GET http://localhost:5000/api/products/popular -Top 5 popular products [token required]
```
Create Product Example:
{
  "name": "Passion Fruit, 1 kg",
  "price": 575,
  "category": "fruits",
  "description": "A fruit that gives the taste buds an explosion of sweetness to tartness, passion fruit is generally round shaped with yellow-orange skin.The flesh of a passion fruit is soft and juicy. Its jelly like texture with the crunchiness of numerous tart seeds within the flesh is a taste loved by many.",
  "imageCode": "pas.png"
}

For more products refer [here](../frontend/products.json)
```

#### Orders
- GET http://localhost:5000/api/orders/cart/:id -Get all the products by order_id [token required].
- GET http://localhost:5000/api/orders/getOrderByStatus/:id/:status - Orders by status and user_id [token required]
- GET http://localhost:5000/api/orders/product/:orderID/:productID -Product added in the order [token required]
- PUT http://localhost:5000/api/orders/status - Update order status [token required].Parameters are: `status`, `user_id` and `id` of the order.
- PUT http://localhost:5000/api/orders/updateQuantity - Update product quantity in the order-product [token required].Parameters are: `quantity` and `id` of the order-product.
- DELETE http://localhost:5000/api/orders//deleteProduct/:orderProductID -Delete product in the order by order_product_id [token required]
- POST http://localhost:5000/api/orders/addProduct -Add products to order [token required]. Parameters are: `product_id`, `order_id` and `quantity`
- POST http://localhost:5000/api/orders/create/:user_id -Create [token required]. Parameters are: `status` and `products`. [`user_id`(provided in url)].
```
Create Order Example:
{
  "status": "active" // active or completed
  "products": [
    {
      "product_id": 1,
      "quantity": 3
    }
  ]
}
```
