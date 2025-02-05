import { requestCount } from "../middlewares/server-status-middleware"; // this should go to repository layer
import { CpfRepository } from "../repositories/cpf.repository";
import prisma from "../repositories/prisma";

/**
 * @description Gets server statistics, including uptime, request count, and health status.
 * @returns {Promise<Object>} Object containing `uptime`, `requestCount`, `memoryUsage`, and `databaseStatus`.
 */
export const getServerStats = async (repository: CpfRepository) => {
  const serverStartTime = process.uptime();
  let databaseStatus = "unknown";

  try {
    await prisma.$queryRaw`SELECT 1`; // Simple query to check DB connection
    databaseStatus = "healthy";
  } catch (error) {
    databaseStatus = "unreachable";
  }

  return {
    uptime: Math.round(process.uptime()),
    requestCount,
    memoryUsage: process.memoryUsage().rss / 1024 / 1024, // Convert bytes to MB
    databaseStatus,
  };
};
