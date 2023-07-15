import express from "express";
import OrderHandler from "../../handlers/order";
import { verifyJWT } from "../../middleware/auth";

const orders = express.Router();
const orderHandler = new OrderHandler();

//Add Products to an order
orders.post("/addProduct", verifyJWT, (request, response) => {
  orderHandler.addProduct(request, response);
});

//Cart Items based on order id
orders.get("/cart/:id", verifyJWT, (request, response) => {
  orderHandler.getCartItems(request, response);
});

//Create order
orders.post("/create/:user_id", verifyJWT, (request, response) => {
  orderHandler.create(request, response);
});


//Delete product based on order id
orders.delete(
  "/deleteProduct/:orderProductID",
  verifyJWT,
  (request, response) => {
    orderHandler.deleteProduct(request, response);
  }
);

//get orders based on status and user id
orders.get("/getOrderByStatus/:id/:status", verifyJWT, (request, response) => {
  orderHandler.getOrderByStatus(request, response);
});

//Get product based on order id
orders.get("/product/:orderID/:productID", verifyJWT, (request, response) => {
  orderHandler.getExistingProduct(request, response);
});

//Update status of the order
orders.put("/updateQuantity", verifyJWT, (request, response) => {
  orderHandler.updateProductQuantity(request, response);
});

//Update status of the order
orders.put("/status", verifyJWT, (request, response) => {
  orderHandler.updateOrderStatus(request, response);
});

export default orders;
