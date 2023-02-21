import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterWrapComponent } from './footer-wrap.component';

describe('FooterWrapComponent', () => {
  let component: FooterWrapComponent;
  let fixture: ComponentFixture<FooterWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterWrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
