import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNotVerifiedComponent } from './account-not-verified.component';

describe('AccountNotVerifiedComponent', () => {
  let component: AccountNotVerifiedComponent;
  let fixture: ComponentFixture<AccountNotVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountNotVerifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNotVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
