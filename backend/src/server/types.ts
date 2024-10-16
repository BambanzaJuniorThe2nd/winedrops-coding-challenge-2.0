import { FastifyInstance, FastifyServerOptions } from "fastify";

export interface ServerConfig {
  BASE_URL: string;
  PORT: number;
  API_ROOT: string;
}

export interface ServerOptions extends FastifyServerOptions {}

export interface Server extends FastifyInstance {}


