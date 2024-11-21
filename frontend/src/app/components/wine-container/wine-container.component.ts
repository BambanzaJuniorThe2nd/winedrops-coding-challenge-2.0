import { Component, OnInit, OnDestroy } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { WineService } from '../../services/wine.service';
import {
  switchMap,
  map,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SortingDropdownComponent } from '../sorting-dropdown/sorting-dropdown.component';
import { WineListComponent } from '../wine-list/wine-list.component';
import { Observable, Subject } from 'rxjs';
import { WineState } from '../../store/wine.state';

@Component({
  selector: 'app-wine-container',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    SortingDropdownComponent,
    WineListComponent,
  ],
  templateUrl: './wine-container.component.html',
  styleUrl: './wine-container.component.css',
})
export class WineContainerComponent implements OnInit, OnDestroy {
  state$: Observable<WineState>;
  private destroy$ = new Subject<void>();

  constructor(private wineStore: WineStore, private wineService: WineService) {
    this.state$ = this.wineStore.getState();
  }

  ngOnInit() {
    this.wineStore
      .getState()
      .pipe(
        takeUntil(this.destroy$),
        map((state) => ({
          searchQuery: state.searchQuery,
          sortBy: state.sortBy,
          page: state.page,
        })),
        distinctUntilChanged(
          (prev, curr) =>
            prev.searchQuery === curr.searchQuery &&
            prev.sortBy === curr.sortBy &&
            prev.page === curr.page
        ),
        switchMap(({ searchQuery, sortBy, page }) => {
          this.wineStore.setLoading(true);
          return searchQuery
            ? this.wineService.searchWines(searchQuery, sortBy, page)
            : this.wineService.getBestSellingWines(sortBy, page);
        })
      )
      .subscribe({
        next: (response) => this.wineStore.setWines(response),
        error: (error) => {
          console.error('Error fetching wines:', error);
          this.wineStore.setError('Failed to fetch wines. Please try again.');
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
