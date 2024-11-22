import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WineStore } from '../../store/wine.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchQuery = signal('');

  constructor(private wineStore: WineStore) {}

  onSubmit(): void {
    this.wineStore.setSearchQuery(this.searchQuery());
  }
}
