import { Request, Response } from "express";
import { CnpjRepository } from "../repositories/cnpj.repository";
import {
  CreateCnpjUseCase,
  DeleteCnpjUseCase,
  GetAllCnpjsUseCase,
} from "../application/cnpj-crud.usecase";
import { SwitchBlockCnpjUseCase } from "../application/switch-block-cnpj.usecase";

const cnpjRepository = new CnpjRepository();

export const CnpjController = {
  /**
   * @description Creates a new CNPJ entry in the database.
   * @route POST /api/cnpj
   * @param {Request} req - Express request object containing CNPJ data in the body.
   * @param {Object} req.body - Request body.
   * @param {string} req.body.cnpj - CNPJ value (14-digit numeric string).
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>}
   * - 201 Created: Returns the created CNPJ object.
   * - 400 Bad Request: If the CNPJ is invalid or already exists.
   * @example
   * // Request Body:
   * {
   *   "cnpj": "11444777000161"
   * }
   * // Response:
   * {
   *   "id": "1",
   *   "value": "11.444.777/0001-61"
   * }
   */
  create: async (req: Request, res: Response) => {
    try {
      const { cnpj } = req.body;
      const createCnpj = new CreateCnpjUseCase(cnpjRepository);

      const result = await createCnpj.execute(cnpj);

      res.status(201).json(result);
    } catch (error) {
      console.log((error as Error).message);
      res.status(400).json({ error: (error as Error).message });
    }
  },

  /**
   * @description Retrieves a list of all CNPJs.
   * @route GET /api/cnpj
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object returning the list of CNPJs.
   * @returns {Promise<Response>}
   * - 200 OK: Returns an array of CNPJ objects.
   * - 400 Bad Request: If an error occurs.
   * @example
   * // Request:
   * GET /api/cnpj
   * // Response:
   * [
   *   {
   *     "id": "1",
   *     "value": "11.444.777/0001-61"
   *   },
   *   {
   *     "id": "2",
   *     "value": "99.887.766/0001-55"
   *   }
   * ]
   */
  getAll: async (req: Request, res: Response) => {
    try {
      const getAllCnpjs = new GetAllCnpjsUseCase(cnpjRepository);

      const listParams = {};
      const { query, blocked, ordering } = req.query;
      if (query) {
        (listParams as any).query = query;
      }
      if ((blocked && blocked === "false") || blocked === "true") {
        (listParams as any).blocked = blocked === "true" ? true : false;
      }
      if (ordering) {
        (listParams as any).ordering = ordering;
      }

      const cpfs = await getAllCnpjs.execute(listParams);
      res.json(cpfs);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  /**
   * @description Deletes a CNPJ record from the database.
   * @route DELETE /api/cnpj/:id
   * @param {Request} req - Express request object containing CNPJ ID as a route parameter.
   * @param {Object} req.params - Route parameters.
   * @param {string} req.params.id - CNPJ ID to delete.
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>}
   * - 204 No Content: If the CNPJ is deleted successfully.
   * - 400 Bad Request: If an error occurs.
   * @example
   * // Request:
   * DELETE /api/cnpj/1
   * // Response:
   * (No Content)
   */
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleteCnpj = new DeleteCnpjUseCase(cnpjRepository);
      await deleteCnpj.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },


  switchBlock: async (req: Request, res: Response) => {
      try {
        const cnpjId = Number(req.params.id);
        const { blocked } = req.body;
        const switchBlockCpf = new SwitchBlockCnpjUseCase(cnpjRepository);
        const result = await switchBlockCpf.execute(cnpjId, blocked);
        res.json({ blocked: result });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    },
};
