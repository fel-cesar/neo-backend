import { Router } from "express";
import { CpfController } from "./cpf.controller";

const router = Router();

router.post("/cpf", CpfController.create);
router.get("/cpf", CpfController.getAll);
router.put("/cpf/:id", CpfController.switchBlock);
router.delete("/cpf/:id", CpfController.delete);

export default router;
