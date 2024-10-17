import { CoreConfig, Container } from "./types";
import { DbManager } from "./db";
import { WineService } from "./wine";

/**
 * Initializes the core system and returns the container.
 *
 * @param config - The core configuration.
 * @returns The core container.
 */
export const bootstrap = async (config: CoreConfig): Promise<Container> => {
  // init db
  const dbManager = new DbManager(config.DB_PATH);
  dbManager.initialize();

  // init services
  const wineService = new WineService(dbManager);

  return Object.freeze({
    wineService,
  });
};
