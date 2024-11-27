import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortingDropdownComponent } from './sorting-dropdown.component';
import { WineStore } from '../../store/wine.store';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('SortingDropdownComponent', () => {
  let component: SortingDropdownComponent;
  let fixture: ComponentFixture<SortingDropdownComponent>;
  let wineStoreSpy: jasmine.SpyObj<WineStore>;

  beforeEach(async () => {
    // Create a spy object for WineStore
    wineStoreSpy = jasmine.createSpyObj('WineStore', {
      setSortBy: () => undefined, // Method with no return value
      sortBy: () => '' // Initial value
    });

    // Configure testing module
    await TestBed.configureTestingModule({
      imports: [FormsModule, SortingDropdownComponent],
      providers: [{ provide: WineStore, useValue: wineStoreSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SortingDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default sortBy value', () => {
    // Modify the spy to return 'orders' after being called
    wineStoreSpy.sortBy.and.returnValue('revenue');

    // Verify the component's sortBy matches the store's initial value
    expect(component.sortBy).toBe('revenue');

    const selectElement = fixture.debugElement.query(
      By.css('select')
    ).nativeElement;
    selectElement.value = 'revenue';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(selectElement.value).toBe('revenue');
  });

  it('should call wineStore.setSortBy when select value changes', () => {
    // Modify the spy to return 'orders' after being called
    wineStoreSpy.sortBy.and.returnValue('orders');

    const selectElement = fixture.debugElement.query(
      By.css('select')
    ).nativeElement;
    selectElement.value = 'orders';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(wineStoreSpy.setSortBy).toHaveBeenCalledWith('orders');
    expect(wineStoreSpy.setSortBy).toHaveBeenCalledTimes(1);
    expect(component.sortBy).toBe('orders');
  });

  it('should display correct text content for each option', () => {
    const selectElement = fixture.debugElement.query(By.css('select'));
    const options = selectElement.queryAll(By.css('option'));

    const expectedOptions = [
      { value: 'revenue', label: 'Revenue' },
      { value: 'bottles', label: 'Bottles Sold' },
      { value: 'orders', label: 'Number of Orders' }
    ];

    expectedOptions.forEach((expectedOption, index) => {
      const option = options[index].nativeElement;

      expect(option.value).toBe(expectedOption.value);
      expect(option.textContent.trim()).toBe(expectedOption.label);
    });
  });
});
