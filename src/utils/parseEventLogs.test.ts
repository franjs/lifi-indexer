import { EventLog } from "ethers";
import { parseEventLogs } from "./parseEventLogs";
import { FeesCollected } from "../models/FeesCollectedModel";

describe("parseEventLogs", () => {
  it("should parse event logs", () => {
    const parsedLogs = parseEventLogs([testEventLogs[0]], testAbi);

    expect(parsedLogs[0].name).toEqual("FeesCollected");
    expect(parsedLogs[0].args).toEqual([
      "0x0000000000000000000000000000000000000000",
      "0x1aC3EF0ECF4E0ed23D62cab448f3169064230624",
      17000000000000000n,
      3000000000000000n,
    ]);
    expect(parsedLogs[0].topic).toEqual(
      "0x28a87b6059180e46de5fb9ab35eb043e8fe00ab45afcc7789e3934ecbbcde3ea",
    );
    expect(parsedLogs[0].signature).toEqual(
      "FeesCollected(address,address,uint256,uint256)",
    );
  });

  it("should map event logs when passing a mapper", () => {
    const parsedLogs = parseEventLogs<FeesCollected>(
      testEventLogs,
      testAbi,
      (log, event) => {
        return {
          token: log?.args[0],
          integrator: log?.args[1],
          integratorFee: BigInt(log?.args[2]).toString(),
          lifiFee: BigInt(log?.args[3]).toString(),
          blockNumber: event?.blockNumber,
          txHash: event?.transactionHash,
        };
      },
    );

    expect(parsedLogs).toEqual([
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
    ]);
  });
});

const testAbi = [
  "event FeesCollected(address indexed _token, address indexed _integrator, uint256 _integratorFee, uint256 _lifiFee)",
];

const testEventLogs = [
  {
    _type: "log",
    address: "0xbD6C7B0d2f68c2b7805d88388319cfB6EcB50eA9",
    blockHash:
      "0x978ae3419c65682ae6d270a5a76c3bc744bf4ed9adbddb0c5e7b3d57e3aa49a8",
    blockNumber: 52808103,
    data: "0x000000000000000000000000000000000000000000000000003c6568f12e8000000000000000000000000000000000000000000000000000000aa87bee538000",
    index: 253,
    removed: false,
    topics: [
      "0x28a87b6059180e46de5fb9ab35eb043e8fe00ab45afcc7789e3934ecbbcde3ea",
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "0x0000000000000000000000001ac3ef0ecf4e0ed23d62cab448f3169064230624",
    ],
    transactionHash:
      "0x193101e7e4d4de9668c7c38e757e95c90885fe173423d1d20b27998d0826c6f7",
    transactionIndex: 46,
  },
  {
    _type: "log",
    address: "0xbD6C7B0d2f68c2b7805d88388319cfB6EcB50eA9",
    blockHash:
      "0xd5bd2992710c94481d9dcc9c5a924055550f7c57efac48223be569ee7b1b90a4",
    blockNumber: 52808113,
    data: "0x000000000000000000000000000000000000000000000000003c6568f12e8000000000000000000000000000000000000000000000000000000aa87bee538000",
    index: 371,
    removed: false,
    topics: [
      "0x28a87b6059180e46de5fb9ab35eb043e8fe00ab45afcc7789e3934ecbbcde3ea",
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "0x0000000000000000000000001ac3ef0ecf4e0ed23d62cab448f3169064230624",
    ],
    transactionHash:
      "0x174674cc03dbb52e7dbe162d9e21aa1781ef112b847be1b80cb89e78bea14faf",
    transactionIndex: 84,
  },
] as unknown as EventLog[];
