import express from "express";
import ProductHandler from "../../handlers/product";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

const products = express.Router();
const productHandler = new ProductHandler();

dotenv.config();

const checkJwt = auth({
  jwksUri: process.env.AUTH0_JWKURI,
  audience: process.env.AUTH0_API_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: process.env.AUTH0_ALGORITHM
});

//Create product
products.post("/create", checkJwt, (request, response) => {
  productHandler.create(request, response);
});


//get products based on category
products.get("/category/:category", checkJwt, (request, response) => {
  productHandler.getProductsByCategory(request, response);
});

//Index - Get all products
products.get("/", (request, response) => {
  productHandler.index(request, response);
});

//Get Top 5 popular products
products.get("/popular", (request, response) => {
  productHandler.getPopularProducts(request, response);
});

//Show - Get product based on product id
products.get("/:id", (request, response) => {
  productHandler.show(request, response);
});

export default products;
