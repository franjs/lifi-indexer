import {
  BlockTag,
  Contract,
  JsonRpcProvider,
  EventLog,
  InterfaceAbi,
} from "ethers";
import config from "../config";

type GetEventLogsParams = {
  eventName: string;
  fromBlock: BlockTag;
  toBlock?: BlockTag;
  contractAddress: string;
  abi: InterfaceAbi;
};

export async function getEventLogs({
  eventName,
  fromBlock,
  toBlock,
  contractAddress,
  abi,
}: GetEventLogsParams): Promise<EventLog[]> {
  const contract = new Contract(
    contractAddress,
    abi,
    new JsonRpcProvider(config.CHAIN_RPC_URL),
  );
  const filter = contract.filters[eventName]();

  return contract.queryFilter(filter, fromBlock, toBlock) as Promise<
    EventLog[]
  >;
}

export async function getLatestBlock(): Promise<number> {
  const provider = new JsonRpcProvider(config.CHAIN_RPC_URL);
  const blockNumber = await provider.getBlockNumber();

  return blockNumber;
}
