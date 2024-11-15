import { Component } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { WineService } from '../../services/wine.service';
import { switchMap, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SortingDropdownComponent } from '../sorting-dropdown/sorting-dropdown.component';
import { WineListComponent } from '../wine-list/wine-list.component';
import { Observable } from 'rxjs';
import { WineState } from '../../store/wine.state';

@Component({
  selector: 'app-wine-container',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, SortingDropdownComponent, WineListComponent],
  templateUrl: './wine-container.component.html',
  styleUrl: './wine-container.component.css',
})
export class WineContainerComponent {
  state$: Observable<WineState> | undefined;

  constructor(private wineStore: WineStore, private wineService: WineService) {
    this.state$ = this.wineStore.getState();
  }

  ngOnInit() {
    // Subscribe to state changes and fetch data accordingly
    this.wineStore.getState().pipe(
      map(state => ({
        searchQuery: state.searchQuery,
        sortBy: state.sortBy,
        page: state.page
      })),
      switchMap(({ searchQuery, sortBy, page }) => {
        console.log("")
        this.wineStore.setLoading(true);
        this.wineStore.setError(null);

        return searchQuery
          ? this.wineService.searchWines(searchQuery, sortBy, page)
          : this.wineService.getBestSellingWines(sortBy, page);
      })
    ).subscribe({
      next: (response) => {
        console.log(response);
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
