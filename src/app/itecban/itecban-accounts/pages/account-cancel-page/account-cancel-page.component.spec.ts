import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCancelPageComponent } from './account-cancel-page.component';

describe('AccountCancelPageComponent', () => {
  let component: AccountCancelPageComponent;
  let fixture: ComponentFixture<AccountCancelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCancelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCancelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
