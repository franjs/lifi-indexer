const mockInsertMany = jest.fn();

jest.mock("../models/FeesCollectedModel", () => {
  return {
    FeesCollectedModel: {
      insertMany: mockInsertMany,
    },
  };
});

import { FeesCollected } from "../models/FeesCollectedModel";
import { saveFeesCollected } from "./feesCollectedService";

describe("feesCollectedService", () => {
  it("should save multiple fees collected", async () => {
    const feesCollected: FeesCollected[] = [
      {
        token: "0x0000000000000000000000000000000000000000",
        integrator: "0x1aC3EF0ECF4E0ed23D62cab448f3169064230624",
        integratorFee: "17000000000000000",
        lifiFee: "3000000000000000",
        blockNumber: 52808103,
        txHash:
          "0x193101e7e4d4de9668c7c38e757e95c90885fe173423d1d20b27998d0826c6f7",
      },
      {
        token: "0x0000000000000000000000000000000000000000",
        integrator: "0x1aC3EF0ECF4E0ed23D62cab448f3169064230624",
        integratorFee: "17000000000000000",
        lifiFee: "3000000000000000",
        blockNumber: 52808113,
        txHash:
          "0x174674cc03dbb52e7dbe162d9e21aa1781ef112b847be1b80cb89e78bea14faf",
      },
    ];
    await saveFeesCollected(feesCollected);
    expect(mockInsertMany).toHaveBeenCalledWith(feesCollected);
  });
});
