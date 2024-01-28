import { Interface, EventLog, InterfaceAbi, LogDescription } from "ethers";

/**
 * Takes a list of raw events and parses them into T
 * @param events
 */
export function parseEventLogs<T = LogDescription>(
  events: EventLog[],
  abi: InterfaceAbi,
  mapTo?: (log: LogDescription | null, event: EventLog) => T,
): T[] {
  const contractInterface = new Interface(abi);

  return events.map((event): T => {
    const parsedEvent = contractInterface.parseLog({
      data: event.data,
      topics: event.topics as string[],
    });
    return mapTo ? mapTo(parsedEvent, event) : (parsedEvent as T);
  });
}
