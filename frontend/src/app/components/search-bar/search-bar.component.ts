import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WineStore } from '../../store/wine.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
