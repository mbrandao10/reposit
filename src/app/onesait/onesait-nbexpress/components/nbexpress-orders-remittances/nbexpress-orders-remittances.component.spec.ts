import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressOrdersRemittancesComponent } from './nbexpress-orders-remittances.component';

describe('NbExpressOrdersRemittancesComponent', () => {
  let component: NbExpressOrdersRemittancesComponent;
  let fixture: ComponentFixture<NbExpressOrdersRemittancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressOrdersRemittancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressOrdersRemittancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
