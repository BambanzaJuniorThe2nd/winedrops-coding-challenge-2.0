import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WineStore } from '../../store/wine.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchForm: FormGroup;

  constructor(private wineStore: WineStore) {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.wineStore.setSearchQuery(this.searchForm.get('search')?.value || '');
    }
  }
}
