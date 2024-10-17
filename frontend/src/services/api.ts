import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

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

export const api = {
  getBestSellingWines: async (sortBy: string = 'revenue', page: number = 1, limit: number = 20): Promise<WineResponse> => {
    const response = await axios.get(`${API_URL}/best-selling-wines`, {
      params: { sortBy, page, limit }
    });
    return response.data;
  },

  searchWines: async (query: string, sortBy: string = 'revenue', page: number = 1, limit: number = 20): Promise<WineResponse> => {
    const response = await axios.get(`${API_URL}/search-wines`, {
      params: { query, sortBy, page, limit }
    });
    return response.data;
  }
};