import { DbManager } from "../db";
import { WineManager, RankedWine, Result } from "./types";

export class WineService implements WineManager {
  readonly db: DbManager;

  constructor(db: DbManager) {
    this.db = db;
  }

  /**
   * Retrieves the best selling wines based on the specified sorting criteria, pagination, and limit.
   *
   * @param sortBy - The sorting criteria, which can be "bottles", "orders", or "revenue".
   * @param page - The page number for pagination.
   * @param limit - The maximum number of results to return per page.
   * @returns A Promise that resolves to a `Result` object containing the best selling wines, the total count, the current page, and the limit.
   */
  async getBestSelling(
    sortBy: string,
    page: number,
    limit: number
  ): Promise<Result> {
    const offset = (page - 1) * limit;
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
      WITH ranked_wines AS (
        SELECT 
          mw.id, 
          mw.name, 
          mw.vintage, 
          SUM(co.total_amount) as total_revenue, 
          SUM(co.quantity) as total_bottles, 
          COUNT(DISTINCT co.id) as total_orders,
          ROW_NUMBER() OVER (ORDER BY ${orderBy} DESC) as ranking,
          COUNT(*) OVER () as total_count
        FROM master_wine mw
        JOIN wine_product wp ON mw.id = wp.master_wine_id
        JOIN customer_order co ON wp.id = co.wine_product_id
        WHERE co.status IN ('paid', 'dispatched')
        GROUP BY mw.id, mw.name, mw.vintage
      )
      SELECT 
        *, 
        CASE WHEN ranking <= ROUND(0.1 * total_count) THEN true ELSE false END as is_top_ten,
        CASE WHEN ranking > (total_count - ROUND(0.1 * total_count)) THEN true ELSE false END as is_bottom_ten
      FROM ranked_wines
      ORDER BY ranking
      LIMIT ? OFFSET ?
    `;

    const wines = await this.db.query(query, [limit, offset]);
    const totalCount = wines.length > 0 ? wines[0].total_count : 0;
    const processedWines = this.formatWineResults(wines);

    return {
      wines: processedWines,
      totalCount,
      page,
      limit,
    };
  }

  /**
   * Searches for wines based on the provided search query, sort criteria, and pagination parameters.
   *
   * @param searchQuery - The search query to filter wines by name or vintage.
   * @param sortBy - The field to sort the wines by, one of "bottles", "orders", or "revenue".
   * @param page - The page number for pagination.
   * @param limit - The number of wines to return per page.
   * @returns An object containing the paginated list of wines, the total count of wines, and the current page and limit.
   */
  async search(
    searchQuery: string,
    sortBy: string,
    page: number,
    limit: number
  ): Promise<Result> {
    const offset = (page - 1) * limit;
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
      WITH global_rankings AS (
        SELECT 
          mw.id, 
          mw.name, 
          mw.vintage, 
          SUM(co.total_amount) as total_revenue, 
          SUM(co.quantity) as total_bottles, 
          COUNT(DISTINCT co.id) as total_orders,
          ROW_NUMBER() OVER (ORDER BY ${orderBy} DESC) as ranking,
          COUNT(*) OVER () as global_count
        FROM master_wine mw
        JOIN wine_product wp ON mw.id = wp.master_wine_id
        JOIN customer_order co ON wp.id = co.wine_product_id
        WHERE co.status IN ('paid', 'dispatched')
        GROUP BY mw.id, mw.name, mw.vintage
      ),
      filtered_wines AS (
        SELECT 
          *,
          COUNT(*) OVER () as total_count
        FROM global_rankings
        WHERE LOWER(name) LIKE LOWER(?) OR CAST(vintage AS TEXT) LIKE ?
      )
      SELECT 
        id,
        name,
        vintage,
        total_revenue,
        total_bottles,
        total_orders,
        ranking,
        total_count,
        CASE 
          WHEN ranking <= ROUND(0.1 * global_count) THEN 1 
          ELSE 0 
        END = 1 as is_top_ten,
        CASE 
          WHEN ranking > (global_count - ROUND(0.1 * global_count)) THEN 1 
          ELSE 0 
        END = 1 as is_bottom_ten
      FROM filtered_wines
      ORDER BY ranking
      LIMIT ? OFFSET ?
    `;

    const wines = await this.db.query(query, [
      `%${searchQuery}%`,
      `%${searchQuery}%`,
      limit,
      offset,
    ]);
    const totalCount = wines.length > 0 ? wines[0].total_count : 0;
    const formattedWines = this.formatWineResults(wines);

    return { wines: formattedWines, totalCount, page, limit };
  }

  private formatWineResults(wines: any[]): RankedWine[] {
    return wines.map((wine) => ({
      id: wine.id,
      name: wine.name,
      vintage: wine.vintage,
      total_revenue: wine.total_revenue,
      total_bottles: wine.total_bottles,
      total_orders: wine.total_orders,
      ranking: wine.ranking,
      isTopTen: Boolean(wine.is_top_ten),
      isBottomTen: Boolean(wine.is_bottom_ten),
    }));
  }
}
