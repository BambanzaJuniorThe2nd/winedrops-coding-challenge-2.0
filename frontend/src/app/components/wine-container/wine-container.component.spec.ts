import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WineContainerComponent } from './wine-container.component';
import { WineStore } from '../../store/wine.store';
import { Wine } from '../../models/wine.model';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SortingDropdownComponent } from '../sorting-dropdown/sorting-dropdown.component';
import { WineListComponent } from '../wine-list/wine-list.component';
import { WineService } from '../../services/wine.service';

describe('WineContainerComponent', () => {
  let component: WineContainerComponent;
  let fixture: ComponentFixture<WineContainerComponent>;
  let wineStoreSpy: jasmine.SpyObj<WineStore>;
  let wineServiceSpy: jasmine.SpyObj<WineService>;
  let wines: Wine[] = [
    {
      id: 99,
      name: 'Alto del Cielo',
      vintage: 2020,
      total_revenue: 32584.66,
      total_bottles: 625,
      total_orders: 108,
      ranking: 1,
      isTopTen: true,
      isBottomTen: false,
    },
    {
      id: 77,
      name: 'Cascina della Rosa',
      vintage: 2015,
      total_revenue: 31005.71,
      total_bottles: 592,
      total_orders: 102,
      ranking: 2,
      isTopTen: true,
      isBottomTen: false,
    },
    {
      id: 73,
      name: 'Vigneti di Sogno',
      vintage: 2021,
      total_revenue: 27832.82,
      total_bottles: 536,
      total_orders: 94,
      ranking: 3,
      isTopTen: true,
      isBottomTen: false,
    },
    {
      id: 123,
      name: 'Côte de Lune',
      vintage: 2021,
      total_revenue: 27566.53,
      total_bottles: 575,
      total_orders: 100,
      ranking: 4,
      isTopTen: true,
      isBottomTen: false,
    },
    {
      id: 163,
      name: "Les Vignes d'Or",
      vintage: 2016,
      total_revenue: 27550.25,
      total_bottles: 540,
      total_orders: 104,
      ranking: 5,
      isTopTen: true,
      isBottomTen: false,
    },
    {
      id: 27,
      name: 'Villa Bianca',
      vintage: 2004,
      total_revenue: 23928.1,
      total_bottles: 571,
      total_orders: 102,
      ranking: 6,
      isTopTen: true,
      isBottomTen: false,
    },
    {
      id: 18,
      name: 'Vin de Provence',
      vintage: 2020,
      total_revenue: 23280.26,
      total_bottles: 491,
      total_orders: 93,
      ranking: 7,
      isTopTen: true,
      isBottomTen: false,
    },
    {
      id: 147,
      name: 'Terra Serena',
      vintage: 2012,
      total_revenue: 23176.94,
      total_bottles: 463,
      total_orders: 83,
      ranking: 8,
      isTopTen: true,
      isBottomTen: false,
    },
    {
      id: 14,
      name: 'Clos de la Rivière',
      vintage: 2016,
      total_revenue: 22459.23,
      total_bottles: 519,
      total_orders: 92,
      ranking: 9,
      isTopTen: true,
      isBottomTen: false,
    },
    {
      id: 142,
      name: 'Villa del Vento',
      vintage: 2013,
      total_revenue: 22236.25,
      total_bottles: 487,
      total_orders: 90,
      ranking: 10,
      isTopTen: true,
      isBottomTen: false,
    },
    {
      id: 146,
      name: 'Vigna del Sogno',
      vintage: 2016,
      total_revenue: 20877.48,
      total_bottles: 605,
      total_orders: 110,
      ranking: 11,
      isTopTen: false,
      isBottomTen: false,
    },
    {
      id: 141,
      name: 'Vignoble de la Baie',
      vintage: 2008,
      total_revenue: 20822.94,
      total_bottles: 410,
      total_orders: 79,
      ranking: 12,
      isTopTen: false,
      isBottomTen: false,
    },
    {
      id: 100,
      name: 'Alto del Cielo',
      vintage: 2016,
      total_revenue: 20469.75,
      total_bottles: 523,
      total_orders: 86,
      ranking: 13,
      isTopTen: false,
      isBottomTen: false,
    },
    {
      id: 89,
      name: 'Golden Hill Vineyards',
      vintage: 2021,
      total_revenue: 20416.27,
      total_bottles: 540,
      total_orders: 99,
      ranking: 14,
      isTopTen: false,
      isBottomTen: false,
    },
    {
      id: 81,
      name: 'Horizon Vineyards',
      vintage: 2015,
      total_revenue: 20273.28,
      total_bottles: 456,
      total_orders: 84,
      ranking: 15,
      isTopTen: false,
      isBottomTen: false,
    },
    {
      id: 129,
      name: 'Vin de Cristal',
      vintage: 2002,
      total_revenue: 19664.73,
      total_bottles: 478,
      total_orders: 84,
      ranking: 16,
      isTopTen: false,
      isBottomTen: false,
    },
    {
      id: 78,
      name: 'Côte des Amours',
      vintage: 2004,
      total_revenue: 19397.06,
      total_bottles: 400,
      total_orders: 73,
      ranking: 17,
      isTopTen: false,
      isBottomTen: false,
    },
    {
      id: 138,
      name: 'Vin des Collines',
      vintage: 2019,
      total_revenue: 19320.06,
      total_bottles: 389,
      total_orders: 70,
      ranking: 18,
      isTopTen: false,
      isBottomTen: false,
    },
    {
      id: 47,
      name: 'Vignoble des Merveilles',
      vintage: 2015,
      total_revenue: 18894.16,
      total_bottles: 514,
      total_orders: 88,
      ranking: 19,
      isTopTen: false,
      isBottomTen: false,
    },
    {
      id: 8,
      name: "Les Vignes d'Or",
      vintage: 2003,
      total_revenue: 18220.86,
      total_bottles: 502,
      total_orders: 94,
      ranking: 20,
      isTopTen: false,
      isBottomTen: false,
    },
  ];

  beforeEach(async () => {
    // Create a spy object for winestore
    wineStoreSpy = jasmine.createSpyObj('WineStore', [], {
      wines: jasmine.createSpy('wines').and.returnValue(wines),
      sortBy: jasmine.createSpy('sortBy').and.returnValue('revenue'),
      currentPage: jasmine.createSpy('currentPage').and.returnValue(1),
      totalPages: jasmine.createSpy('totalPages').and.returnValue(9),
      previousPage: jasmine
        .createSpy('previousPage')
        .and.returnValue(undefined),
      nextPage: jasmine.createSpy('nextPage').and.returnValue(undefined),
      searchQuery: jasmine.createSpy('searchQuery').and.returnValue(''),
      setLoading: jasmine.createSpy('setLoading').and.returnValue(undefined),
      loading: jasmine.createSpy('loading').and.returnValue(false),
      error: jasmine.createSpy('error').and.returnValue(null),
    });

    // Create a spy object for wineService
    wineServiceSpy = jasmine.createSpyObj('WineService', ['searchWines', 'getBestSellingWines']);

    // Configure testing module
    await TestBed.configureTestingModule({
      imports: [
        SearchBarComponent,
        SortingDropdownComponent,
        WineListComponent,
        WineContainerComponent,
      ],
      providers: [{ provide: WineStore, useValue: wineStoreSpy }, { provide: WineService, useValue: wineServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(WineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
