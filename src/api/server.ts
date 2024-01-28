import config from "../config";
import app from "./app";

const port = config.API_PORT || 4000;

app
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (err) => {
    console.error(err);
  });
