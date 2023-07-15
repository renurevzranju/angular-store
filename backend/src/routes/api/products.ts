import express from "express";
import ProductHandler from "../../handlers/product";
import { verifyJWT } from "../../middleware/auth";

const products = express.Router();
const productHandler = new ProductHandler();

//Create product
products.post("/create", (request, response) => {
  productHandler.create(request, response);
});

//get products based on category
products.get("/category/:category", verifyJWT, (request, response) => {
  productHandler.getProductsByCategory(request, response);
});

//Index - Get all products
products.get("/", verifyJWT, (request, response) => {
  productHandler.index(request, response);
});

//Get Top 5 popular products
products.get("/popular", verifyJWT, (request, response) => {
  productHandler.getPopularProducts(request, response);
});

//Show - Get product based on product id
products.get("/:id", verifyJWT, (request, response) => {
  productHandler.show(request, response);
});

export default products;
