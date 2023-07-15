import express from "express";
import UserHandler from "../../handlers/user";
import { verifyJWT } from "../../middleware/auth";

const users = express.Router();
const userHandler = new UserHandler();

//Create user
users.post("/", verifyJWT, (request, response) => {
  userHandler.create(request, response);
});

//Index - Get all users
users.get("/", verifyJWT, (request, response) => {
  userHandler.index(request, response);
});

//Show - Get user based on user id
users.get("/:id", verifyJWT, (request, response) => {
  userHandler.show(request, response);
});

//Get user based on email
users.get("/getUserByEmail/:email", verifyJWT, (request, response) => {
  userHandler.getUserByEmail(request, response);
});

export default users;
