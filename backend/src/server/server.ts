import Fastify, { FastifyInstance } from "fastify";
// import fastifyEnv from "@fastify/env";
import fastifyCors from "@fastify/cors";
// import { wineRoutes } from "../routes";
// import { DbConnection } from "./db";
import { ServerConfig, Server, ServerOptions } from "./types";

// /**
//  * Schema for the server configuration
//  */
// const schema = {
//   type: 'object',
//   required: ['PORT', 'DB_PATH'],
//   properties: {
//     PORT: { type: 'number', default: 3000 },
//     DB_PATH: { type: 'string', default: './db/winedrops.db' }
//   }
// };


/**
 * Creates a Fastify server instance
 * @param options Fastify server options (optional)
 * @returns FastifyInstance
 */
export const createServer = async (
  options: ServerOptions = {}
): Promise<Server> => {
  const fastify = Fastify(options);

  // Register environment configuration
//   await fastify.register(fastifyEnv, {
//     schema,
//     dotenv: true,
//   });

  // Register CORS
  await fastify.register(fastifyCors, {
    origin: true, // Adjust origin settings for production
  });

  // Database initialization
//   const dbConnection = new DbConnection(fastify.config.DB_PATH);
//   await dbConnection.initialize();
//   fastify.decorate("db", dbConnection);

  // Register routes
//   fastify.register(wineRoutes);

  return fastify;
};

/**
 * Starts the Fastify server
 * @param server Server instance
 * @param config Server configurations
 */
export const startServer = async (server: Server, config: ServerConfig) => {
  try {
    await server.listen({ port: config.PORT });
    server.log.info(
      `Server is running on ${config.BASE_URL}:${config.PORT}`
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
