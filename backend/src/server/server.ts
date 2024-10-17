import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { wineRoutes } from "../rest";
import { ServerConfig, Server, ServerOptions } from "./types";

/**
 * Starts the Fastify server
 * @param server Server instance
 * @param config Server configurations
 */
export const createServer = async (options: ServerOptions, serverConfig: ServerConfig): Promise<Server> => {
  const fastify = Fastify({ logger: true }) as Server;

  // Register CORS
  await fastify.register(fastifyCors, {
    origin: true, // Adjust origin settings for production
  });

  // Attach serverConfig
  fastify.decorate("serverConfig", serverConfig);

  // Attach wineService to the Server instance
  fastify.decorate("wineService", options.core.wineService);

  // Register routes
  fastify.register(wineRoutes);

  return fastify;
};

/**
 * Starts the Fastify server
 * @param server Server instance
 * @param config Server configurations
 */
export const startServer = async (server: Server, config: ServerConfig) => {
  return new Promise((resolve, reject) => {
    const serverStarted = server.listen({ host: config.BASE_URL, port: config.PORT });
    return resolve(serverStarted);
  });
};
