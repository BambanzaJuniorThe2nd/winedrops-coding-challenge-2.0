import { Component } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { CommonModule } from '@angular/common';
import { Wine } from '../../models/wine.model';

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.css',
})
export class WineListComponent {
  headers = ['Rank', 'Name', 'Vintage', 'Revenue', 'Bottles Sold', 'Orders'];

  constructor(private wineStore: WineStore) {}

  getRowClassName(wine: Wine): string {
    if (wine.isTopTen) return 'bg-green-300';
    if (wine.isBottomTen) return 'bg-red-300';
    return '';
  }

  wines(): Wine[] {
    return this.wineStore.wines();
  }

  currentPage(): number {
    return this.wineStore.currentPage();
  }

  totalPages(): number {
    return this.wineStore.totalPages();
  }

  previousPage(): void {
    this.wineStore.previousPage();
  }

  nextPage(): void {
    this.wineStore.nextPage();
  }
}
