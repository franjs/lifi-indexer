import { Router } from "express";
import { getFeesCollected } from "./controllers/feesCollectedController";

const router = Router();

router.get("/fees-collected", getFeesCollected);

export default router;
