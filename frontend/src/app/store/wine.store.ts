import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { WineState, initialWineState } from './wine.state';
import { WineResponse } from '../models/wine.model';

@Injectable({
  providedIn: 'root'
})
export class WineStore {
  private readonly PAGE_SIZE = 20;
  private state = new BehaviorSubject<WineState>(initialWineState);

  // Selectors
  wines$ = this.select(state => state.wines);
  loading$ = this.select(state => state.loading);
  error$ = this.select(state => state.error);
  currentPage$ = this.select(state => state.page);
  totalPages$ = this.select(state =>
    Math.ceil(state.totalCount / this.PAGE_SIZE)
  );
  isLastPage$ = this.select(state =>
    state.page >= Math.ceil(state.totalCount / this.PAGE_SIZE)
  );

  setWines(response: WineResponse) {
    this.updateState({
      wines: response.wines,
      totalCount: response.totalCount,
      loading: false,
      error: null
    });
  }

  setLoading(loading: boolean) {
    this.updateState({ loading });
  }

  setError(error: string | null) {
    this.updateState({
      error,
      loading: false
    });
  }

  setSortBy(sortBy: string) {
    this.updateState({
      sortBy,
      page: 1,  // Reset to first page
      loading: true
    });
  }

  setSearchQuery(searchQuery: string) {
    console.log(searchQuery);
    this.updateState({
      searchQuery,
      page: 1,  // Reset to first page
      loading: true
    });
  }

  setPage(page: number) {
    const totalPages = Math.ceil(this.state.getValue().totalCount / this.PAGE_SIZE);
    if (page >= 1 && page <= totalPages) {
      console.log('Setting current page:', page);
      this.updateState({
        page,
        loading: true
      });
    }
  }

  nextPage() {
    const currentState = this.state.getValue();
    if (!this.isLastPage()) {
      this.setPage(currentState.page + 1);
    }
  }

  previousPage() {
    const currentState = this.state.getValue();
    if (currentState.page > 1) {
      this.setPage(currentState.page - 1);
    }
  }

  getState(): Observable<WineState> {
    return this.state.asObservable();
  }

  private select<T>(selector: (state: WineState) => T): Observable<T> {
    return this.state.asObservable().pipe(
      map(selector),
      distinctUntilChanged()
    );
  }

  private updateState(newState: Partial<WineState>) {
    this.state.next({
      ...this.state.getValue(),
      ...newState
    });
  }

  private isLastPage(): boolean {
    const currentState = this.state.getValue();
    return currentState.page >= Math.ceil(currentState.totalCount / this.PAGE_SIZE);
  }
}
