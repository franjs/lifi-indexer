import { EventLog, LogDescription } from "ethers";
import { FeesCollected } from "../models/FeesCollectedModel";

export function mapParsedEventToFeeCollected(
  log: LogDescription | null,
  event: EventLog,
): FeesCollected {
  return {
    token: log?.args[0],
    integrator: log?.args[1],
    integratorFee: BigInt(log?.args[2]).toString(),
    lifiFee: BigInt(log?.args[3]).toString(),
    blockNumber: event.blockNumber,
    txHash: event.transactionHash,
  };
}
