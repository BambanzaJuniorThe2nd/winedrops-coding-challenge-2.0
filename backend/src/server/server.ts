import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { wineRoutes } from "../rest";
import { ServerConfig, Server, ServerOptions } from "./types";

/**
 * Create a Server instance
 * @param server Server instance
 * @param config Server configurations
 */
export const createServer = async (
  options: ServerOptions,
  serverConfig: ServerConfig
): Promise<Server> => {
  const server = Fastify({
    logger: true,
    connectionTimeout: 60000,
    keepAliveTimeout: 60000,
  }) as Server;

  // Register CORS
  await server.register(fastifyCors, {
    origin: true,
  });

  // Attach serverConfig
  server.decorate("serverConfig", serverConfig);

  // Attach wineService to the Server instance
  server.decorate("wineService", options.core.wineService);

  // Register routes
  server.register(wineRoutes);

  return server;
};

/**
 * Starts the Server instance
 * @param server Server instance
 * @param config Server configurations
 */
export const startServer = async (server: Server, config: ServerConfig) => {
  return new Promise((resolve, reject) => {
    const serverStarted = server.listen({
      host: config.BASE_URL,
      port: config.PORT,
    });
    return resolve(serverStarted);
  });
};
