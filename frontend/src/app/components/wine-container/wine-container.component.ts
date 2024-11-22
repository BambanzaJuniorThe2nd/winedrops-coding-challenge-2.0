import { Component, DestroyRef, OnInit, effect, inject } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { WineService } from '../../services/wine.service';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SortingDropdownComponent } from '../sorting-dropdown/sorting-dropdown.component';
import { WineListComponent } from '../wine-list/wine-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class WineContainerComponent implements OnInit {
  private wineStore = inject(WineStore);
  private wineService = inject(WineService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    // This effect will run whenever any of the signals (i.e., searchQuery, sortBy, page) change
    effect(() => {
      // Access only the specific signals we care about
      const searchQuery = this.wineStore.searchQuery();
      const sortBy = this.wineStore.sortBy();
      const page = this.wineStore.currentPage();

      this.wineStore.setLoading(true);
      const fetchWines = searchQuery
        ? this.wineService.searchWines(searchQuery, sortBy, page)
        : this.wineService.getBestSellingWines(sortBy, page);

      fetchWines.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (response) => {
          this.wineStore.setWines(response);
          this.wineStore.setLoading(false);
        },
        error: (error) => {
          this.wineStore.setError(error);
          this.wineStore.setLoading(false);
        },
      });
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {}

  // Add public methods for template access if needed
  public loading() {
    return this.wineStore.loading();
  }

  public error() {
    return this.wineStore.error();
  }

  public wines() {
    return this.wineStore.wines();
  }
}
