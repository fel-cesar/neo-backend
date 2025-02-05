import { Request, Response } from "express";
import { getServerStats } from "../application/get-server-stats.usecase";
import { CpfRepository } from "../repositories/cpf.repository";

export const ServerStatsController = {
  /**
   * @description Returns server uptime, request count, memory usage, and database health status.
   * @route GET /api/stats
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>}
   * - 200 OK: Returns the uptime, request count, memory usage, and database status.
   * @example
   * // Response:
   * {
   *   "uptime": 3600,
   *   "requestCount": 100,
   *   "memoryUsage": 75.4,
   *   "databaseStatus": "healthy"
   * }
   */
  getStats: async (req: Request, res: Response) => {
    const stats = await getServerStats(new CpfRepository());
    res.json(stats);
  },
};
