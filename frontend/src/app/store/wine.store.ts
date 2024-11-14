import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WineState, initialWineState } from './wine.state';
import { WineResponse } from '../models/wine.model';

@Injectable({
  providedIn: 'root'
})
export class WineStore {
  private state = new BehaviorSubject<WineState>(initialWineState);

  setWines(response: WineResponse) {
    this.updateState({
      wines: response.wines,
      totalCount: response.totalCount
    });
  }

  setLoading(loading: boolean) {
    this.updateState({ loading });
  }

  setError(error: string | null) {
    this.updateState({ error });
  }

  setSortBy(sortBy: string) {
    this.updateState({ sortBy, page: 1 });
  }

  setSearchQuery(searchQuery: string) {
    this.updateState({ searchQuery, page: 1 });
  }

  setPage(page: number) {
    this.updateState({ page });
  }

  getState(): Observable<WineState> {
    return this.state.asObservable();
  }

  private updateState(newState: Partial<WineState>) {
    this.state.next({
      ...this.state.getValue(),
      ...newState
    });
  }
}
