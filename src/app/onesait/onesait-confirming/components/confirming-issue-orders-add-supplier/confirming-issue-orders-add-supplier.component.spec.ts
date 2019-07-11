import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingIssueOrdersComponentAddSupplierComponent } from './confirming-issue-orders-add-supplier.component';

describe('ConfirmingPageComponent', () => {
  let component: ConfirmingIssueOrdersComponentAddSupplierComponent;
  let fixture: ComponentFixture<ConfirmingIssueOrdersComponentAddSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingIssueOrdersComponentAddSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingIssueOrdersComponentAddSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
