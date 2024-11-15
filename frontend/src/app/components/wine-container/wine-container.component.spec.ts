import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineContainerComponent } from './wine-container.component';

describe('WineContainerComponent', () => {
  let component: WineContainerComponent;
  let fixture: ComponentFixture<WineContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
