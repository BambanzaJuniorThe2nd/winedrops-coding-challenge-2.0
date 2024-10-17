import { createLogger, transports } from "winston";
import { bootstrap as bootstrapCore, CoreConfig } from "./core";
import { createServer, startServer, ServerConfig } from "./server";

interface SuperConfig extends CoreConfig, ServerConfig {}

const logger = createLogger({
  transports: [new transports.Console()],
});

const loadConfig = (env: any): SuperConfig => {
  return {
    BASE_URL: env.BASE_URL || "http://localhost:5003",
    PORT: env.PORT || 5003,
    DB_PATH: env.DB_PATH || "./db/winedrops.db",
    API_ROOT: env.API_ROOT || "/winesdrop/api",
  };
};

const start = async () => {
  const config = loadConfig(process.env);
  const envMode = process.env.NODE_ENV || "development";
  try {
    const core = await bootstrapCore(config);
    const fastifyServer = await createServer();
    await startServer(fastifyServer, config);
    logger.info(`CRM_SERVICE: Started on port ${config.PORT}`);
  } catch (e) {
    logger.error("Application could not start", {
      error: e,
      message: e.message,
    });
    process.exit(1);
  }
};

// start app
start();
