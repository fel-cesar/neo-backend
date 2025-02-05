// @ts-nocheck
// Disablingcheck here because we are using the `any` type at cors.
// On prod it will not be used.
import express from "express";
import cpfRoutes from "./interfaces/cpf.routes";
import cnpjRoutes from "./interfaces/cnpj.routes";
import serverStatsRoutes from "./interfaces/server-status-routes";
import cors from "cors";
import { requestCounterMiddleware } from "./middlewares/server-status-middleware";

const app = express();
app.use(express.json());
app.use(requestCounterMiddleware); // ✅ Apply the request counter middleware

app.use(cors());
app.use("/api", cpfRoutes);
app.use("/api", cnpjRoutes);
app.use("/api", serverStatsRoutes);

const port = process.env.API_PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
