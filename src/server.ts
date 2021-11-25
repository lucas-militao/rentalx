import express from "express";
import swagerUi from "swagger-ui-express";

import "./database";

import "./shared/container";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swagerUi.serve, swagerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running!"));
