// routes/wineRoutes.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { WineService } from "../services";

export async function wineRoutes(fastify: FastifyInstance) {
  const wineService = new WineService(fastify.db);

  fastify.get("/api/best-selling-wines", async (request: FastifyRequest<{
    Querystring: { sortBy?: string; page?: number; limit?: number }
  }>, reply: FastifyReply) => {
    const { sortBy = "revenue", page = 1, limit = 20 } = request.query;
    
    try {
      const wines = await wineService.getBestSellingWines(sortBy, page, limit);
      reply.send(wines);
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  fastify.get("/api/search-wines", async (request: FastifyRequest<{
    Querystring: { query?: string; sortBy?: string; page?: number; limit?: number }
  }>, reply: FastifyReply) => {
    const { query = "", sortBy = "revenue", page = 1, limit = 20 } = request.query;
    
    try {
      const wines = await wineService.searchWines(query, sortBy, page, limit);
      reply.send(wines);
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });
}