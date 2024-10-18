import { Server, Request, Response } from "../../server/types";

export async function wineRoutes(server: Server) {
  const { wineService } = server;
  const API_ROOT = server.serverConfig.API_ROOT;
  const API_ROOT__WINES = `${API_ROOT}/wines`;

  server.get(`${API_ROOT__WINES}/best-selling`, async (request: Request<{
    Querystring: { sortBy?: string; page?: number; limit?: number }
  }>, response: Response) => {
    const { sortBy = "revenue", page = 1, limit = 20 } = request.query;
    
    try {
      const wines = await wineService.getBestSelling(sortBy, page, limit);
      response.send(wines);
    } catch (err) {
      server.log.error(err);
      response.status(500).send({ error: "Internal Server Error" });
    }
  });

  server.get(`${API_ROOT__WINES}/search`, async (request: Request<{
    Querystring: { query?: string; sortBy?: string; page?: number; limit?: number }
  }>, response: Response) => {
    const { query = "", sortBy = "revenue", page = 1, limit = 20 } = request.query;
    
    try {
      const wines = await wineService.search(query, sortBy, page, limit);
      response.send(wines);
    } catch (err) {
      server.log.error(err);
      response.status(500).send({ error: "Internal Server Error" });
    }
  });
}