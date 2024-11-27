import { Component } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sorting-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sorting-dropdown.component.html',
  styleUrl: './sorting-dropdown.component.css'
})
export class SortingDropdownComponent {
  constructor(private wineStore: WineStore) {}

  // Getter that always returns the latest value from wineStore
  get sortBy() {
    return this.wineStore.sortBy();
  }

  onSortChange(value: string) {
    this.wineStore.setSortBy(value);
  }
}
