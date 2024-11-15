import { Component } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sorting-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sorting-dropdown.component.html',
  styleUrl: './sorting-dropdown.component.css'
})

export class SortingDropdownComponent {
  private readonly wineStore: WineStore;
  sortBy$: Observable<string> | undefined;

  constructor(wineStore: WineStore) {
    this.wineStore = wineStore;
    this.sortBy$ = this.wineStore.getState().pipe(map(state => state.sortBy));
  }

  onSortChange(value: string) {
    this.wineStore.setSortBy(value);
  }
}
