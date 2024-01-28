import { Request, Response } from "express";
import * as feesCollectedService from "../../services/feesCollectedService";
import type { PaginatedResponse } from "../types";
import { FeesCollected } from "../../models/FeesCollectedModel";

export async function getFeesCollected(req: Request, res: Response) {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
  const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
  const integrator = req.query.integrator as string | undefined;
  const filter = integrator ? { integrator } : undefined;

  const feesCollected = await feesCollectedService.getFeesCollected(
    filter,
    limit,
    offset,
  );
  const total = await feesCollectedService.getFeesCollectedCount(filter);

  const response: PaginatedResponse<FeesCollected> = {
    data: feesCollected,
    total,
  };

  return res.json(response);
}
