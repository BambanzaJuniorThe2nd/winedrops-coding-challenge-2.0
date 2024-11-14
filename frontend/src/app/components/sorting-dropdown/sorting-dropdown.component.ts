import { Component } from '@angular/core';
import { WineStore } from '../../store/wine.store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sorting-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './sorting-dropdown.component.html',
  styleUrl: './sorting-dropdown.component.css'
})

export class SortingDropdownComponent {
  private readonly wineStore: WineStore;
  sortBy$: any;

  constructor(wineStore: WineStore) {
    this.wineStore = wineStore;
    this.sortBy$ = this.wineStore.getState().pipe(map(state => state.sortBy));
  }

  onSortChange(value: string) {
    this.wineStore.setSortBy(value);
  }
}
