import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountContractCheckPageComponent } from './account-contract-check-page.component';

describe('AccountContractCheckPageComponent', () => {
  let component: AccountContractCheckPageComponent;
  let fixture: ComponentFixture<AccountContractCheckPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountContractCheckPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountContractCheckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
