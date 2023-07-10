# Echo Store API

> API for Echo Store application

This is a simple API server that implements a logic for the Echo store application

### HTTP

Here's the map of API's HTTP routes:


- `/users` — routes related to authentication & user.
  - `/validate` **GET** — validate the token
    - `/register` **POST** — register user in with `email` and `password`.
  - `/login` **POST** — log user in with `email` and `password`.
    - `/get/` **GET** — get all the users



~

  - `/cart` — routes related to cart.
  - `/add` **POST** — add  to cart
  - `/:id` **GET** — retrieve cart by user id.
  - `/:id` **delete** — remove  cart by id
   - `/:id` **PUT** — update  cart by user
  - `/:id` **POST** — remove carts after the ordering


~


  - `/products` — routes related to products.
  - `/` **GET** — retrieve the products
  - `/:id` **GET** — retrieve on product by id
  - `/category/:query` **GET** — retrieve products by category
  -
### Requirements

To run this server locally you need to have these requirements:

- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com/download-center#community)

### Installations

Use following commands to run this API-server locally:

```zsh
git clone https://github.com/pierrelstan/echo-store-backend
cd echo-store-backend
yarn install
yarn  start
```







