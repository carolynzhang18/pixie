import cors from "cors";
import express from "express";
import { createServer } from "http";
import { wallet } from "./wallet.js";

const CORS_ALLOW_LIST = [
  "http://localhost:3000",
];

const CORS_OPTIONS = {
  origin: CORS_ALLOW_LIST,
  credentials: true,
};

const app = express();

const server = createServer(app);

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

wallet.state().subscribe((state) => {
  console.log(state);
});

server.listen({ port: 8000 }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port 8000!`);
});
