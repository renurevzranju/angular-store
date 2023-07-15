import express from "express";
import OrderHandler from "../../handlers/order";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

dotenv.config();
const orders = express.Router();
const orderHandler = new OrderHandler();
const checkJwt = auth({
  jwksUri: process.env.AUTH0_JWKURI,
  audience: process.env.AUTH0_API_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: process.env.AUTH0_ALGORITHM
});

//Add Products to an order
orders.post("/addProduct", checkJwt, (request, response) => {
  orderHandler.addProduct(request, response);
});

//Cart Items based on order id
orders.get("/cart/:id", checkJwt, (request, response) => {
  orderHandler.getCartItems(request, response);
});

//Create order
orders.post("/create/:user_id", checkJwt, (request, response) => {
  orderHandler.create(request, response);
});

//Delete order based on order id
orders.delete("/deleteOrder/:id", checkJwt, (request, response) => {
  orderHandler.delete(request, response);
});

//get orders based on status and user id
orders.get(
  "/getOrderByStatus/:id/:status",
  checkJwt,
  (request, response) => {
    orderHandler.getOrderByStatus(request, response);
  }
);

//Index - Get all orders
orders.get("/", checkJwt, (request, response) => {
  orderHandler.index(request, response);
});

//Show - Get order based on user id
orders.get("/:id", checkJwt, (request, response) => {
  orderHandler.show(request, response);
});

//Get product based on order id
orders.get("/product/:orderID/:productID", checkJwt, (request, response) => {
  orderHandler.getExistingProduct(request, response);
});

//Delete product based on order id
orders.delete("/deleteProduct/:orderProductID", checkJwt, (request, response) => {
  orderHandler.deleteProduct(request, response);
});

//Update status of the order
orders.put("/updateQuantity", checkJwt, (request, response) => {
  orderHandler.updateProductQuantity(request, response);
});

//Update status of the order
orders.put("/status", checkJwt, (request, response) => {
  orderHandler.updateOrderStatus(request, response);
});

export default orders;
