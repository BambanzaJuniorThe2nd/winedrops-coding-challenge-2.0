import { createLogger, transports } from "winston";
import { bootstrap as bootstrapCore, CoreConfig } from "./core";
import { createServer, startServer, ServerConfig } from "./server";
import * as dotenv from 'dotenv';


interface SuperConfig extends CoreConfig, ServerConfig {}

const logger = createLogger({
  transports: [new transports.Console()],
});

dotenv.config();

const loadConfig = (env: any): SuperConfig => {
  return {
    BASE_URL: env.BASE_URL || "localhost",
    PORT: env.PORT || 3000,
    DB_PATH: env.DB_PATH || "./src/core/db/winedrops.db",
    API_ROOT: env.API_ROOT || "/winesdrop/api",
  };
};

const start = async () => {
  const config = loadConfig(process.env);
  const envMode = process.env.NODE_ENV || "development";
  try {
    logger.info(`Bootstrapping core services...`);
    const core = await bootstrapCore(config);
    logger.info("Creating server...");
    const server = await createServer({ core }, config);
    logger.info("Starting server...");
    await startServer(server, config);
    logger.info(`Server is running on ${config.BASE_URL}:${config.PORT}`)
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
