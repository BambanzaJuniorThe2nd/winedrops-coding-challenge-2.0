import { FastifyRequest, FastifyReply } from "fastify";
import { Server } from "../../server/types";

export async function wineRoutes(fastify: Server) {
  const { wineService } = fastify;
  const API_ROOT = fastify.serverConfig.API_ROOT;
  const API_ROOT__WINES = `${API_ROOT}/wines`;

  fastify.get(`${API_ROOT__WINES}/best-selling`, async (request: FastifyRequest<{
    Querystring: { sortBy?: string; page?: number; limit?: number }
  }>, reply: FastifyReply) => {
    const { sortBy = "revenue", page = 1, limit = 20 } = request.query;
    
    try {
      const wines = await wineService.getBestSelling(sortBy, page, limit);
      reply.send(wines);
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  fastify.get(`${API_ROOT__WINES}/search`, async (request: FastifyRequest<{
    Querystring: { query?: string; sortBy?: string; page?: number; limit?: number }
  }>, reply: FastifyReply) => {
    const { query = "", sortBy = "revenue", page = 1, limit = 20 } = request.query;
    
    try {
      const wines = await wineService.search(query, sortBy, page, limit);
      reply.send(wines);
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });
}