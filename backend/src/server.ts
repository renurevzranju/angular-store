import express from "express";
import routes from "./routes/index";
import bodyParser from "body-parser";
import cors from "cors";

const app: express.Application = express();
const port = 5000;

const corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, function () {
  console.log(`starting app on: http://localhost:${port}`);
});

export default app;
