import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModesToSellComponent } from './modes-to-sell.component';

describe('ModesToSellComponent', () => {
  let component: ModesToSellComponent;
  let fixture: ComponentFixture<ModesToSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModesToSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModesToSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
