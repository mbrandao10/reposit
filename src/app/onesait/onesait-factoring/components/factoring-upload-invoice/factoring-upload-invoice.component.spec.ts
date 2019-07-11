import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoringUploadInvoiceComponent } from './factoring-upload-invoice.component';

describe('FactoringUploadInvoiceComponent', () => {
  let component: FactoringUploadInvoiceComponent;
  let fixture: ComponentFixture<FactoringUploadInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoringUploadInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoringUploadInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
