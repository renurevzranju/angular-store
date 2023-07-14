import express from "express";
import OrderHandler from "../../handlers/order";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

dotenv.config();
const orders = express.Router();
const orderHandler = new OrderHandler();
const checkJwt = auth({
  jwksUri: "https://dev-revathi.us.auth0.com/.well-known/jwks.json",
  audience: process.env.AUTH0_API_AUDIENCE,
  issuerBaseURL: "https://dev-revathi.us.auth0.com/",
  tokenSigningAlg: "RS256"
});

//Add Products to an order
orders.post("/addProduct", checkJwt, (request, response) => {
  orderHandler.addProduct(request, response);
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

//Update status of the order
orders.put("/status/:user_id", checkJwt, (request, response) => {
  orderHandler.updateOrderStatus(request, response);
});

export default orders;
