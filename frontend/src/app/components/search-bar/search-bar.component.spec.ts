import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar.component';
import { WineStore } from '../../store/wine.store';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let wineStoreSpy: jasmine.SpyObj<WineStore>;

  beforeEach(async () => {
    // Create a spy object for WineStore
    wineStoreSpy = jasmine.createSpyObj('WineStore', ['setSearchQuery']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        SearchBarComponent
      ],
      providers: [
        { provide: WineStore, useValue: wineStoreSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search query', () => {
    expect(component.searchQuery()).toBe('');
  });

  it('should update searchQuery when input value changes', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.value = 'Merlot';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchQuery()).toBe('Merlot');
  });

  it('should call wineStore.setSearchQuery when form is submitted', () => {
    // Set a search query
    component.searchQuery.set('Cabernet');
    fixture.detectChanges();

    // Get the form element and submit it
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(wineStoreSpy.setSearchQuery).toHaveBeenCalledWith('Cabernet');
    expect(wineStoreSpy.setSearchQuery).toHaveBeenCalledTimes(1);
  });

  it('should handle empty search query submission', () => {
    // Submit with empty query
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(wineStoreSpy.setSearchQuery).toHaveBeenCalledWith('');
    expect(wineStoreSpy.setSearchQuery).toHaveBeenCalledTimes(1);
  });

  it('should have correct input placeholder text', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.placeholder).toBe('Search wines...');
  });

  it('should have submit button with correct text', () => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent.trim()).toBe('Search');
  });
});
