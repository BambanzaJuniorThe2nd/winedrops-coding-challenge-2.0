import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WineStore } from '../../store/wine.store';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBarComponent {
  searchControl = new FormControl('');

  constructor(private wineStore: WineStore) {}

  onSubmit() {
    this.wineStore.setSearchQuery(this.searchControl.value || '');
  }
}
