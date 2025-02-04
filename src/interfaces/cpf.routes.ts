import { Router } from "express";
import { CpfController } from "./cpf.controller";

const router = Router();

router.post("/cpf", CpfController.create);
router.get("/cpf", CpfController.getAll);

export default router;
