export interface Wine {
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

export interface WineResponse {
  wines: Wine[];
  totalCount: number;
  page: number;
  limit: number;
}
