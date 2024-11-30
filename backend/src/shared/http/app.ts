import "reflect-metadata";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import morgan from "morgan";
import {errorHandler} from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(routes);

app.use(errorHandler);

export {app};