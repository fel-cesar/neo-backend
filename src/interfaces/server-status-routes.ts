import { Router } from "express";
import { ServerStatsController } from "./server-status-controller";

const router = Router();

/**
 * @description Route for server statistics.
 */

// Get server uptime and request count
router.get("/stats", ServerStatsController.getStats);

export default router;