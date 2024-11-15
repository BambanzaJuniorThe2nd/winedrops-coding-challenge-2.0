import { Component } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { WineService } from '../../services/wine.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-wine-container',
  standalone: true,
  imports: [],
  templateUrl: './wine-container.component.html',
  styleUrl: './wine-container.component.css',
})
export class WineContainerComponent {
  state$: WineStore | undefined;

  constructor(private wineStore: WineStore, private wineService: WineService) {}

  ngOnInit() {
    // Subscribe to state changes and fetch data accordingly
    this.wineStore.getState().pipe(
      map(state => ({
        searchQuery: state.searchQuery,
        sortBy: state.sortBy,
        page: state.page
      })),
      switchMap(({ searchQuery, sortBy, page }) => {
        this.wineStore.setLoading(true);
        this.wineStore.setError(null);

        return searchQuery
          ? this.wineService.searchWines(searchQuery, sortBy, page)
          : this.wineService.getBestSellingWines(sortBy, page);
      })
    ).subscribe({
      next: (response) => {
        this.wineStore.setWines(response);
        this.wineStore.setLoading(false);
      },
      error: (error) => {
        this.wineStore.setError('Failed to fetch wines. Please try again.');
        this.wineStore.setLoading(false);
      }
    });
  }
}
