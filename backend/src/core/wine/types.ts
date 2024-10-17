export interface RankedWine {
    id: number;
    name: string;
    vintage: number;
    total_revenue: number;
    total_bottles: number;
    total_orders: number;
    ranking: number;
    isTopTen: boolean;
    isBottomTen: boolean;
}

export interface Result {
    wines: Array<RankedWine>;
    totalCount: number;
    page: number;
    limit: number;
}

export interface WineManager {
    getBestSelling(sortBy: string, page: number, limit: number): Promise<Result>;
    search(searchQuery: string, sortBy: string, page: number, limit: number): Promise<Result>
}