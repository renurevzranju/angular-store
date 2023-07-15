import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

dotenv.config();

export const verifyJWT = auth({
  jwksUri: process.env.AUTH0_JWKURI,
  audience: process.env.AUTH0_API_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: process.env.AUTH0_ALGORITHM,
});
