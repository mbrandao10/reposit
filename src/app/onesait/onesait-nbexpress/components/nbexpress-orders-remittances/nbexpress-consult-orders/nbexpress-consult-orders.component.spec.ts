import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressConsultOrdersComponent } from './nbexpress-consult-orders.component';

describe('NbExpressNbExpressConsultOrdersComponent', () => {
  let component: NbExpressConsultOrdersComponent;
  let fixture: ComponentFixture<NbExpressConsultOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressConsultOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressConsultOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
