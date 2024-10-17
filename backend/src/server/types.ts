import { FastifyInstance, FastifyServerOptions } from "fastify";
import { Container } from "../core";
import { WineService } from "../core/wine";

export interface ServerConfig {
  BASE_URL: string;
  PORT: number;
  API_ROOT: string;
}

export interface ServerOptions extends FastifyServerOptions { core: Container }

declare module "fastify" {
  interface FastifyInstance {
    serverConfig: ServerConfig;
    wineService: WineService;
  }
}

export interface Server extends FastifyInstance {}

