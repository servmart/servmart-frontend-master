import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountWelcomeComponent } from './account-welcome.component';

describe('AccountWelcomeComponent', () => {
  let component: AccountWelcomeComponent;
  let fixture: ComponentFixture<AccountWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
