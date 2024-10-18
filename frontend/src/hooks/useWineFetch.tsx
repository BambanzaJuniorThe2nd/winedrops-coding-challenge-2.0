// src/hooks/useWineFetch.ts
import { useEffect, useCallback } from "react";
import { api } from "../services/api";
import { useWineContext } from "../context/WineContext";

export const useWineFetch = () => {
  const { state, dispatch } = useWineContext();

  const fetchWines = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    try {
      const response = state.searchQuery
        ? await api.searchWines(state.searchQuery, state.sortBy, state.page)
        : await api.getBestSellingWines(state.sortBy, state.page);
      dispatch({ type: "SET_WINES", payload: response });
    } catch (err) {
      console.error("Failed to fetch wines:", err);
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch wines. Please try again.",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.searchQuery, state.sortBy, state.page, dispatch]);

  useEffect(() => {
    fetchWines();
  }, [fetchWines]);

  return { fetchWines };
};
