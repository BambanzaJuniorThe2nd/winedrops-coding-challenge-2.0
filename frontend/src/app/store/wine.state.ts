import { Wine } from "../models/wine.model";

export interface WineState {
  wines: Wine[];
  loading: boolean;
  error: string | null;
  sortBy: string;
  searchQuery: string;
  page: number;
  totalCount: number;
}

export const initialWineState: WineState = {
  wines: [],
  loading: false,
  error: null,
  sortBy: 'revenue',
  searchQuery: '',
  page: 1,
  totalCount: 0
};
