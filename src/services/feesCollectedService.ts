import {
  FeesCollectedModel,
  FeesCollected,
} from "../models/FeesCollectedModel";

export async function saveFeesCollected(
  feesCollected: FeesCollected[],
): Promise<void> {
  await FeesCollectedModel.insertMany(feesCollected);
}

export async function getFeesCollected(
  filter?: Partial<FeesCollected>,
  limit = 25,
  offset = 0,
): Promise<FeesCollected[]> {
  return FeesCollectedModel.find({ ...filter })
    .limit(limit)
    .skip(offset)
    .select("-__v")
    .lean();
}

export async function getFeesCollectedCount(
  filter?: Partial<FeesCollected>,
): Promise<number> {
  return FeesCollectedModel.countDocuments({
    ...filter,
  });
}
