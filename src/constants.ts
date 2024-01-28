import { FeeCollector__factory } from "lifi-contract-typings";

export const feeCollectorConstants = {
  address: "0xbD6C7B0d2f68c2b7805d88388319cfB6EcB50eA9",
  abi: FeeCollector__factory.createInterface().format(),
  events: {
    FeesCollected: "FeesCollected",
  },
} as const;
