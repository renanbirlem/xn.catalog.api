import config from "./config";
import * as connections from "./connections";
import { app } from "./rest";

// warm up redis connection
connections.getRedisConnection({});

app.listen(config.port, () => {
    global.console.log(`Listening on port ${config.port}!`);
    global.console.log(`Connected to MongoDB @ ${config.mongodb_uri}`);
});
