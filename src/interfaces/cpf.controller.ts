import { Request, Response } from "express";
import { CpfRepository } from "../repositories/cpf.repository";
import { CreateCpfUseCase } from "../application/CreateCpfUseCase";
import { GetAllCpfsUseCase } from "../application/GetAllCpfsUseCase";
import { DeleteCpfUseCase } from "../application/DeleteCpfUseCase";
import { SwitchBlockCpfUseCase } from "../application/SwitchBlockCpfUseCase";

const cpfRepository = new CpfRepository();

export const CpfController = {
  create: async (req: Request, res: Response) => {
    try {
      const { cpf } = req.body;
      const createCpf = new CreateCpfUseCase(cpfRepository);

      const result = await createCpf.execute(cpf);

      res.status(201).json(result);
    } catch (error) {
      console.log((error as Error).message);
      res.status(400).json({ error: (error as Error).message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const getAllCpfs = new GetAllCpfsUseCase(cpfRepository);

      const listParams = {};
      const { filter, blocked, ordering } = req.query;

      if (filter) {
        (listParams as any).query = filter;
      }
      if ((blocked && blocked === "false") || blocked === "true") {
        (listParams as any).blocked = blocked === "true" ? true : false;
      }
      if (ordering) {
        (listParams as any).ordering = ordering;
      }

      const cpfs = await getAllCpfs.execute(listParams);
      res.json(cpfs);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  switchBlock: async (req: Request, res: Response) => {
    try {
      const cpfId = Number(req.params.id);
      const { blocked } = req.body;
      const switchBlockCpf = new SwitchBlockCpfUseCase(cpfRepository);
      const result = await switchBlockCpf.execute(cpfId, blocked);
      res.json({ blocked: result });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleteCpf = new DeleteCpfUseCase(cpfRepository);
      await deleteCpf.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
};
