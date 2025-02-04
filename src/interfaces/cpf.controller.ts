import { Request, Response } from "express";
import { CpfRepository } from "../repositories/cpf.repository";
import { CreateCpfUseCase } from "../application/CreateCpfUseCase";
import { GetAllCpfsUseCase } from "../application/GetAllCpfsUseCase";
import { DeleteCpfUseCase } from "../application/DeleteCpfUseCase";

const cpfRepository = new CpfRepository();

export const CpfController = {
  create: async (req: Request, res: Response) => {
    try {
      const { Cpf } = req.body;
      const createCpf = new CreateCpfUseCase(cpfRepository);
      const result = await createCpf.execute(Cpf);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: JSON.stringify(error) });
    }
  },

  getAll: async (_: Request, res: Response) => {
    try {
      const getAllCpfs = new GetAllCpfsUseCase(cpfRepository);
      const cpfs = await getAllCpfs.execute();
      res.json(cpfs);
    } catch (error) {
      res.status(400).json({ error: JSON.stringify(error) });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { Cpf } = req.params;
      const deleteCpf = new DeleteCpfUseCase(cpfRepository);
      await deleteCpf.execute(Cpf);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: JSON.stringify(error) });
    }
  },
};
