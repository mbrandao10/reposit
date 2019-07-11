import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLocksComponent } from './credit-locks.component';

describe('CreditLocksComponent', () => {
  let component: CreditLocksComponent;
  let fixture: ComponentFixture<CreditLocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditLocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditLocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
