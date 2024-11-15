import { Component } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { map } from 'rxjs/operators';
import { Wine } from '../../models/wine.model';

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [],
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.css'
})
export class WineListComponent {
  headers = ['Rank', 'Name', 'Vintage', 'Revenue', 'Bottles Sold', 'Orders'];
  wines$: any;
  currentPage$: any;
  totalPages$: any;
  isLastPage$: any;

  constructor(private wineStore: WineStore) {
    this.wines$ = this.wineStore.getState().pipe(map(state => state.wines));
    this.currentPage$ = this.wineStore.getState().pipe(map(state => state.page));
    this.totalPages$ = this.wineStore.getState().pipe(
      map(state => Math.ceil(state.totalCount / 20))
    );
    this.isLastPage$ = this.wineStore.getState().pipe(
      map(state => state.page >= Math.ceil(state.totalCount / 20))
    );
  }

  getRowClassName(wine: Wine): string {
    if (wine.isTopTen) return 'bg-green-300';
    if (wine.isBottomTen) return 'bg-red-300';
    return '';
  }

  previousPage() {
    this.wineStore.getState().pipe(
      map(state => state.page)
    ).subscribe(currentPage => {
      if (currentPage > 1) {
        this.wineStore.setPage(currentPage - 1);
      }
    });
  }

  nextPage() {
    this.wineStore.getState().pipe(
      map(state => state.page)
    ).subscribe(currentPage => {
      this.wineStore.setPage(currentPage + 1);
    });
  }
}
