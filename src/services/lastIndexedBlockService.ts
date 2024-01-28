import config from "../config";
import { LastIndexedBlockModel } from "../models/lastIndexedBlockModel";

export async function getLastIndexedBlock(): Promise<number> {
  const res = await LastIndexedBlockModel.findOne();

  return res?.blockNumber || config.START_BLOCK;
}

export async function setLastIndexedBlock(blockNumber: number): Promise<void> {
  await LastIndexedBlockModel.findOneAndUpdate(
    undefined,
    { blockNumber },
    { upsert: true },
  );
}
