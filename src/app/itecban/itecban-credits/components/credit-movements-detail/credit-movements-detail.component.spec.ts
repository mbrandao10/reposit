import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditMovementsDetailComponent } from './credit-movements-detail.component';

describe('CreditMovementsComponent', () => {
  let component: CreditMovementsDetailComponent;
  let fixture: ComponentFixture<CreditMovementsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditMovementsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditMovementsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
