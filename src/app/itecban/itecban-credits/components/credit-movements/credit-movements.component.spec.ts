import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditMovementsComponent } from './credit-movements.component';

describe('CreditMovementsComponent', () => {
  let component: CreditMovementsComponent;
  let fixture: ComponentFixture<CreditMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
