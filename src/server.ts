// @ts-nocheck
// Enabling no check here because we are using the `any` type at cors.
// On prod it will not be used.
import express from "express";
import cpfRoutes from "./interfaces/cpf.routes";
import cnpjRoutes from "./interfaces/cnpj.routes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api", cpfRoutes);
app.use("/api", cnpjRoutes);

const port = process.env.API_PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
