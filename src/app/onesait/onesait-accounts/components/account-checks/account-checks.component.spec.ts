import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChecksComponent } from './account-checks.component';

describe('AccountChecksComponent', () => {
  let component: AccountChecksComponent;
  let fixture: ComponentFixture<AccountChecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountChecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
