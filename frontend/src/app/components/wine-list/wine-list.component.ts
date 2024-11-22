import { Component } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.css',
})
export class WineListComponent {
  headers = ['Rank', 'Name', 'Vintage', 'Revenue', 'Bottles Sold', 'Orders'];

  constructor(public wineStore: WineStore) {}

  getRowClassName(wine: any): string {
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
}
