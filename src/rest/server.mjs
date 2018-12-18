import config from "./config";
import * as connections from "./connections";
import restApi from "./rest";

// warm up redis connection
connections.getRedisConnection({});

restApi.listen(config.port, () => {
    global.console.log(`Listening on port ${config.port}!`);
    global.console.log(`Connected to MongoDB @ ${config.mongodb_uri}`);
});
