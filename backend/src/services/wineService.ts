// services/wineService.ts
import { DbConnection } from "../db";

export class WineService {
  private db: DbConnection;

  constructor(db: DbConnection) {
    this.db = db;
  }

  async getBestSellingWines(sortBy: string, page: number, limit: number) {
    const offset = (page - 1) * limit;
    let orderBy: string;
    switch (sortBy) {
      case "bottles":
        orderBy = "total_bottles";
        break;
      case "orders":
        orderBy = "total_orders";
        break;
      case "revenue":
      default:
        orderBy = "total_revenue";
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
      LIMIT ? OFFSET ?
    `;

    const wines = await this.db.query(query, [limit, offset]);
    const totalCount = await this.getTotalCount();
    const rankedWines = this.addRankingToWines(wines, totalCount);

    return {
      wines: rankedWines,
      totalCount,
      page,
      limit
    };
  }

  async searchWines(searchQuery: string, sortBy: string, page: number, limit: number) {
    const offset = (page - 1) * limit;
    let orderBy: string;
    switch (sortBy) {
      case "bottles":
        orderBy = "total_bottles";
        break;
      case "orders":
        orderBy = "total_orders";
        break;
      case "revenue":
      default:
        orderBy = "total_revenue";
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
        AND (LOWER(mw.name) LIKE LOWER(?) OR CAST(mw.vintage AS TEXT) LIKE ?)
      GROUP BY 
        mw.id, mw.name, mw.vintage
      ORDER BY 
        ${orderBy} DESC
      LIMIT ? OFFSET ?
    `;

    const wines = await this.db.query(query, [`%${searchQuery}%`, `%${searchQuery}%`, limit, offset]);
    const totalCount = await this.getTotalCount(searchQuery);
    const rankedWines = this.addRankingToWines(wines, totalCount);

    return {
      wines: rankedWines,
      totalCount,
      page,
      limit
    };
  }

  private async getTotalCount(searchQuery?: string): Promise<number> {
    let query = `
      SELECT COUNT(DISTINCT mw.id) as count
      FROM master_wine mw
      JOIN wine_product wp ON mw.id = wp.master_wine_id
      JOIN customer_order co ON wp.id = co.wine_product_id
      WHERE co.status IN ('paid', 'dispatched')
    `;

    const params = [];
    if (searchQuery) {
      query += ` AND (LOWER(mw.name) LIKE LOWER(?) OR CAST(mw.vintage AS TEXT) LIKE ?)`;
      params.push(`%${searchQuery}%`, `%${searchQuery}%`);
    }

    const result = await this.db.query(query, params);
    return result[0].count;
  }

  private addRankingToWines(wines: any[], totalCount: number): any[] {
    const topThreshold = Math.ceil(totalCount * 0.1);
    const bottomThreshold = Math.floor(totalCount * 0.9);

    return wines.map((wine, index) => ({
      ...wine,
      ranking: index + 1,
      isTopTen: index < topThreshold,
      isBottomTen: index >= bottomThreshold
    }));
  }
}