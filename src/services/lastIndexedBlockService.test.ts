const mockFindOneAndUpdate = jest.fn();
const mockFindOne = jest.fn();

jest.mock("../models/LastIndexedBlockModel", () => {
  return {
    LastIndexedBlockModel: {
      findOneAndUpdate: mockFindOneAndUpdate,
      findOne: mockFindOne,
    },
  };
});

import {
  setLastIndexedBlock,
  getLastIndexedBlock,
} from "./lastIndexedBlockService";
import config from "../config";

describe("lastIndexedBlockService", () => {
  describe("setLastIndexedBlock", () => {
    it("should set the last indexed block", async () => {
      await setLastIndexedBlock(2);
      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        undefined,
        { blockNumber: 2 },
        { upsert: true },
      );
    });
  });

  describe("getLastIndexedBlock", () => {
    it("should get last indexed block", async () => {
      mockFindOne.mockResolvedValue({ blockNumber: 2 });
      const lastIndexedBlock = await getLastIndexedBlock();
      expect(lastIndexedBlock).toEqual(2);
    });

    it("should return START_BLOCK if no last indexed block", async () => {
      config.START_BLOCK = 10;
      mockFindOne.mockResolvedValue(null);
      const lastIndexedBlock = await getLastIndexedBlock();
      expect(lastIndexedBlock).toEqual(10);
    });
  });
});
