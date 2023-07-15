import express from "express";
import UserHandler from "../../handlers/user";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

const users = express.Router();
const userHandler = new UserHandler();

dotenv.config();

const checkJwt = auth({
  jwksUri: "https://dev-revathi.us.auth0.com/.well-known/jwks.json",
  audience: process.env.AUTH0_API_AUDIENCE,
  issuerBaseURL: "https://dev-revathi.us.auth0.com/",
  tokenSigningAlg: "RS256"
});

//Create user
users.post("/", checkJwt, (request, response) => {
  userHandler.create(request, response);
});

//Delete user based on user id
users.delete("/:id", checkJwt, (request, response) => {
  userHandler.delete(request, response);
});

//Index - Get all users
users.get("/", checkJwt, (request, response) => {
  userHandler.index(request, response);
});

//Show - Get user based on user id
users.get("/:id", checkJwt, (request, response) => {
  userHandler.show(request, response);
});

//Get user based on email
users.get("/getUserByEmail/:email", checkJwt, (request, response) => {
  userHandler.getUserByEmail(request, response);
});

export default users;
