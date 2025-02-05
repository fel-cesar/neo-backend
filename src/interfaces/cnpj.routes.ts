import { Router } from "express";
import { CnpjController } from "./cnpj.controller";

const router = Router();

/**
 * @description Route definitions for CNPJ API.
 */

// Create a new CNPJ
router.post("/cnpj", CnpjController.create);

// Get all CNPJs
router.get("/cnpj", CnpjController.getAll);

// Delete a CNPJ
router.delete("/cnpj/:id", CnpjController.delete);

// Edit block status of a CNPJ
router.put("/cnpj/:id", CnpjController.switchBlock);

export default router;
