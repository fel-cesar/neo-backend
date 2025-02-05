import { Request, Response } from "express";
import { CpfRepository } from "../repositories/cpf.repository";
import { CreateCpfUseCase } from "../application/CreateCpfUseCase";
import { GetAllCpfsUseCase } from "../application/GetAllCpfsUseCase";
import { DeleteCpfUseCase } from "../application/DeleteCpfUseCase";
import { SwitchBlockCpfUseCase } from "../application/SwitchBlockCpfUseCase";

const cpfRepository = new CpfRepository();

export const CpfController = {
  /**
   * @description Creates a new CPF entry in the database.
   * @route POST /api/cpf
   * @param {Request} req - Express request object containing CPF data in the body.
   * @param {Object} req.body - Request body.
   * @param {string} req.body.cpf - CPF value (11-digit numeric string).
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>}
   * - 201 Created: Returns the created CPF object.
   * - 400 Bad Request: If the CPF is invalid or already exists.
   * @example
   * // Request Body:
   * {
   *   "cpf": "12345678901"
   * }
   * // Response:
   * {
   *   "id": "1",
   *   "value": "12345678901"
   * }
   */
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

  /**
   * @description Retrieves a list of all CPFs, optionally filtered by query parameters.
   * @route GET /api/cpf
   * @param {Request} req - Express request object with optional query parameters.
   * @param {Object} req.query - Query parameters.
   * @param {string} [req.query.query] - Search keyword to filter CPFs.
   * @param {string} [req.query.blocked] - Filter by blocked status ("true" or "false").
   * @param {string} [req.query.ordering] - Sorting field (e.g., "asc" or "desc").
   * @param {Response} res - Express response object returning the list of CPFs.
   * @returns {Promise<Response>}
   * - 200 OK: Returns an array of CPF objects.
   * - 400 Bad Request: If an error occurs.
   * @example
   * // Request Query:
   * GET /api/cpf?query=123&blocked=true&ordering=asc
   * // Response:
   * [
   *   {
   *     "id": "1",
   *     "value": "12345678901",
   *     "blocked": true
   *   },
   *   {
   *     "id": "2",
   *     "value": "98765432100",
   *     "blocked": false
   *   }
   * ]
   */
  getAll: async (req: Request, res: Response) => {
    try {
      const getAllCpfs = new GetAllCpfsUseCase(cpfRepository);

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

      const cpfs = await getAllCpfs.execute(listParams);
      res.json(cpfs);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  /**
   * @description Toggles the "blocked" status of a CPF.
   * @route PATCH /api/cpf/:id/block
   * @param {Request} req - Express request object containing CPF ID as a route parameter and "blocked" status in the body.
   * @param {Object} req.params - Route parameters.
   * @param {string} req.params.id - CPF ID to update.
   * @param {Object} req.body - Request body.
   * @param {boolean} req.body.blocked - New blocked status (`true` or `false`).
   * @param {Response} res - Express response object returning the updated status.
   * @returns {Promise<Response>}
   * - 200 OK: Returns the updated blocked status.
   * - 400 Bad Request: If an error occurs.
   * @example
   * // Request Body:
   * {
   *   "blocked": true
   * }
   * // Response:
   * {
   *   "blocked": true
   * }
   */
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

  /**
   * @description Deletes a CPF record from the database.
   * @route DELETE /api/cpf/:id
   * @param {Request} req - Express request object containing CPF ID as a route parameter.
   * @param {Object} req.params - Route parameters.
   * @param {string} req.params.id - CPF ID to delete.
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>}
   * - 204 No Content: If the CPF is deleted successfully.
   * - 400 Bad Request: If an error occurs.
   * @example
   * // Request:
   * DELETE /api/cpf/1
   * // Response:
   * (No Content)
   */
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
