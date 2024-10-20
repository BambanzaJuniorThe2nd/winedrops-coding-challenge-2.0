import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Wine, WineResponse } from "../services/api";

interface WineState {
  wines: Wine[];
  loading: boolean;
  error: string | null;
  sortBy: string;
  searchQuery: string;
  page: number;
  totalCount: number;
}

type WineAction =
  | { type: "SET_WINES"; payload: WineResponse }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SORT_BY"; payload: string }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_PAGE"; payload: number };

const initialState: WineState = {
  wines: [],
  loading: false,
  error: null,
  sortBy: "revenue",
  searchQuery: "",
  page: 1,
  totalCount: 0,
};

const wineReducer = (state: WineState, action: WineAction): WineState => {
  switch (action.type) {
    case "SET_WINES":
      return {
        ...state,
        wines: action.payload.wines,
        totalCount: action.payload.totalCount,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload, page: 1 };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

const WineContext = createContext<
  | {
      state: WineState;
      dispatch: React.Dispatch<WineAction>;
    }
  | undefined
>(undefined);

export const WineProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(wineReducer, initialState);

  return (
    <WineContext.Provider value={{ state, dispatch }}>
      {children}
    </WineContext.Provider>
  );
};

export const useWineContext = () => {
  const context = useContext(WineContext);
  if (!context) {
    throw new Error("useWineContext must be used within a WineProvider");
  }
  return context;
};
