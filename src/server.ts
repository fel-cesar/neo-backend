import express from "express";
import cpfRoutes from "./interfaces/cpf.routes";

const app = express();
app.use(express.json());


// URL/api/cpf...
app.use("/api", cpfRoutes);

const port = process.env.API_PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
