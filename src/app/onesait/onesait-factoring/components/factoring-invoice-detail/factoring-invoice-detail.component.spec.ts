import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoringInvoiceDetailComponent } from './factoring-invoice-detail.component';

describe('FactoringInvoiceDetailComponent', () => {
  let component: FactoringInvoiceDetailComponent;
  let fixture: ComponentFixture<FactoringInvoiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoringInvoiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoringInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
