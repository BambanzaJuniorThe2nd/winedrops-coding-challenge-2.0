import { Component } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { map } from 'rxjs/operators';
import { Wine } from '../../models/wine.model';
import { Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.css',
})
export class WineListComponent {
  private destroy$ = new Subject<void>();

  headers = ['Rank', 'Name', 'Vintage', 'Revenue', 'Bottles Sold', 'Orders'];
  wines$: Observable<Wine[]> | undefined;
  currentPage$: Observable<number> | undefined;
  totalPages$: Observable<number> | undefined;
  isLastPage$: Observable<boolean> | undefined;

  constructor(private wineStore: WineStore) {
    // Use pre-defined selectors
    this.wines$ = this.wineStore.wines$;
    this.currentPage$ = this.wineStore.currentPage$;
    this.totalPages$ = this.wineStore.totalPages$;
    this.isLastPage$ = this.wineStore.isLastPage$;
  }

  getRowClassName(wine: Wine): string {
    if (wine.isTopTen) return 'bg-green-300';
    if (wine.isBottomTen) return 'bg-red-300';
    return '';
  }

  previousPage(): void {
    this.wineStore.previousPage();
  }

  nextPage(): void {
    this.wineStore.nextPage();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
