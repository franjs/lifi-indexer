import {
  FeesCollectedModel,
  FeesCollected,
} from "../models/FeesCollectedModel";

export async function saveFeesCollected(
  feesCollected: FeesCollected[],
): Promise<void> {
  await FeesCollectedModel.insertMany(feesCollected);
}
