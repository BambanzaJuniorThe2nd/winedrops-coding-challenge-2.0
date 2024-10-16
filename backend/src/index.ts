// index.ts
import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyCors from "@fastify/cors";
import { wineRoutes } from "./routes";
import { DbConnection } from "./db";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
      DB_PATH: string;
    };
    db: DbConnection;
  }
}

const schema = {
  type: 'object',
  required: ['PORT', 'DB_PATH'],
  properties: {
    PORT: {
      type: 'number',
      default: 3000
    },
    DB_PATH: {
      type: 'string',
      default: "./db/winedrops.db"
    }
  }
};

(async () => {
  const fastify = Fastify({ logger: true });

  await fastify.register(fastifyEnv, {
    schema: schema,
    dotenv: true
  });

  await fastify.register(fastifyCors, {
    origin: true  // Allow all origins in development. Adjust this in production.
  });

  const dbConnection = new DbConnection(fastify.config.DB_PATH);
  await dbConnection.initialize();

  fastify.decorate('db', dbConnection);

  fastify.register(wineRoutes);

  try {
    await fastify.listen({ port: fastify.config.PORT });
    fastify.log.info(`Server is running on http://localhost:${fastify.config.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
