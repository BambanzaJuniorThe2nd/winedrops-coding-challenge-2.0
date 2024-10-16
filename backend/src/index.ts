import Fastify from "fastify";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Database models
interface MasterWine {
  id: number;
  name: string;
  vintage: number;
}

interface WineProduct {
  id: number;
  master_wine_id: number;
  name: string;
  price: number;
}

interface CustomerOrder {
  id: number;
  wine_product_id: number;
  quantity: number;
  total_amount: number;
  status: string;
}

// Database connection
const dbPromise = open({
  filename: "./db/winedrops.db",
  driver: sqlite3.Database,
});

(async () => {
  const fastify = Fastify({});
  const db = await dbPromise;

  // API endpoints
  fastify.get("/api/best-selling-wines", async (request, reply) => {
    const { sortBy = "revenue" } = request.query as { sortBy?: string };

    let orderBy: string;
    switch (sortBy) {
      case "bottles":
        orderBy = "SUM(co.quantity)";
        break;
      case "orders":
        orderBy = "COUNT(DISTINCT co.id)";
        break;
      case "revenue":
      default:
        orderBy = "SUM(co.total_amount)";
    }

    const query = `
      SELECT 
        mw.id,
        mw.name,
        mw.vintage,
        SUM(co.total_amount) as total_revenue,
        SUM(co.quantity) as total_bottles,
        COUNT(DISTINCT co.id) as total_orders
      FROM 
        master_wine mw
        JOIN wine_product wp ON mw.id = wp.master_wine_id
        JOIN customer_order co ON wp.id = co.wine_product_id
      WHERE 
        co.status IN ('paid', 'dispatched')
      GROUP BY 
        mw.id, mw.name, mw.vintage
      ORDER BY 
        ${orderBy} DESC
    `;

    try {
      const results = await db.all(query);
      return results;
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  fastify.get("/api/search-wines", async (request, reply) => {
    const { query = "", sortBy = "revenue" } = request.query as {
      query?: string;
      sortBy?: string;
    };

    let orderBy: string;
    switch (sortBy) {
      case "bottles":
        orderBy = "SUM(co.quantity)";
        break;
      case "orders":
        orderBy = "COUNT(DISTINCT co.id)";
        break;
      case "revenue":
      default:
        orderBy = "SUM(co.total_amount)";
    }

    const searchQuery = `
      SELECT 
        mw.id,
        mw.name,
        mw.vintage,
        SUM(co.total_amount) as total_revenue,
        SUM(co.quantity) as total_bottles,
        COUNT(DISTINCT co.id) as total_orders
      FROM 
        master_wine mw
        JOIN wine_product wp ON mw.id = wp.master_wine_id
        JOIN customer_order co ON wp.id = co.wine_product_id
      WHERE 
        co.status IN ('paid', 'dispatched')
        AND (LOWER(mw.name) LIKE LOWER(?) OR CAST(mw.vintage AS TEXT) LIKE ?)
      GROUP BY 
        mw.id, mw.name, mw.vintage
      ORDER BY 
        ${orderBy} DESC
    `;

    try {
      const results = await db.all(searchQuery, [`%${query}%`, `%${query}%`]);
      return results;
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  try {
    await fastify.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
