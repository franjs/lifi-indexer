import * as lastIndexedBlockService from "./services/lastIndexedBlockService";
import * as feesCollectedService from "./services/feesCollectedService";
import * as chainService from "./services/chainService";
import * as utils from "./utils";
import { feeCollectorConstants } from "./constants";
import config from "./config";

export async function startIndexer() {
  console.log("Starting indexer");

  let lastIndexedBlock = await lastIndexedBlockService.getLastIndexedBlock();

  console.log(`Indexing events from block ${lastIndexedBlock}`);

  while (true) {
    const latestBlock = await chainService.getLatestBlock();
    const toBlock = Math.min(lastIndexedBlock + config.BATCH_SIZE, latestBlock);

    const timerLabel = `Processing batch [${lastIndexedBlock}, ${toBlock}].`;
    console.log(`Batch [${lastIndexedBlock}, ${toBlock}]`);
    console.time(timerLabel);

    if (lastIndexedBlock < latestBlock) {
      const events = await chainService.getEventLogs({
        eventName: feeCollectorConstants.events.FeesCollected,
        contractAddress: feeCollectorConstants.address,
        abi: feeCollectorConstants.abi,
        fromBlock: lastIndexedBlock,
        toBlock,
      });

      console.timeLog(timerLabel, `Retrieved ${events.length} events.`);

      if (events.length > 0) {
        const parsedEvents = utils.parseEventLogs(
          events,
          feeCollectorConstants.abi,
          utils.mapParsedEventToFeeCollected,
        );
        console.timeLog(timerLabel, "Events parsed.");

        await feesCollectedService.saveFeesCollected(parsedEvents);
        console.timeLog(timerLabel, "Events saved.");
      }

      await lastIndexedBlockService.setLastIndexedBlock(toBlock);
      console.timeEnd(timerLabel);
      lastIndexedBlock = toBlock;
    } else {
      await utils.sleep(5000);
    }
  }
}

startIndexer();
