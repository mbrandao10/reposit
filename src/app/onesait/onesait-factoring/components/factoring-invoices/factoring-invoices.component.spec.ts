import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoringInvoicesComponent } from './factoring-invoices.component';

describe('FactoringInvoicesComponent', () => {
  let component: FactoringInvoicesComponent;
  let fixture: ComponentFixture<FactoringInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoringInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoringInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
