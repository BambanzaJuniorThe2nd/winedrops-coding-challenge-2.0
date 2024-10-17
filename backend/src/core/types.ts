import { WineService } from './wine';

/**
 * Interface for core configuration options.
 */
export interface CoreConfig {
  DB_PATH: string;
}

/**
 * Interface for a container object.
 */
export interface Container {
    readonly wineService: WineService;
}
