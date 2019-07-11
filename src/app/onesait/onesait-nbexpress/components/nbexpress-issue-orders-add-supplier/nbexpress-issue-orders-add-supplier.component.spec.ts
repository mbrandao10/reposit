import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressIssueOrdersComponentAddSupplierComponent } from './nbexpress-issue-orders-add-supplier.component';

describe('NbExpressNbExpressIssueOrdersComponentAddSupplierComponent', () => {
  let component: NbExpressIssueOrdersComponentAddSupplierComponent;
  let fixture: ComponentFixture<NbExpressIssueOrdersComponentAddSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressIssueOrdersComponentAddSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressIssueOrdersComponentAddSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
