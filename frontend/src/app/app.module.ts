import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SortingDropdownComponent } from './components/sorting-dropdown/sorting-dropdown.component';
import { WineListComponent } from './components/wine-list/wine-list.component';
import { WineContainerComponent } from './components/wine-container/wine-container.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SortingDropdownComponent,
    WineListComponent,
    WineContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
