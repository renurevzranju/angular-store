import express from "express";
import routes from "./routes/index";
import bodyParser from "body-parser";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

dotenv.config();
const app: express.Application = express();
const port = 5000;

const corsOptions = {
  origin: "http://localhost:4200"
};

export const verifyJWT = auth({
  jwksUri: process.env.AUTH0_JWKURI,
  audience: process.env.AUTH0_API_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: process.env.AUTH0_ALGORITHM
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, function () {
  console.log(`starting app on: http://localhost:${port}`);
});

export default app;
