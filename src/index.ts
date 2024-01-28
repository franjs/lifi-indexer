import config from "./config";
import { initDb } from "./db/initDb";

(async () => {
  await initDb();

  switch (config.MODE) {
    case "indexer": {
      require("./indexer");
      break;
    }
    case "api": {
      require("./api/server");
      break;
    }
    default: {
      throw new Error(`Invalid MODE: ${config.MODE}`);
    }
  }
})();
