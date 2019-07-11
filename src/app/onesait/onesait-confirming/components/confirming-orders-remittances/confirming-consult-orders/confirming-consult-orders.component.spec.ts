import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingConsultOrdersComponent } from './confirming-consult-orders.component';

describe('ConfirmingConsultOrdersComponent', () => {
  let component: ConfirmingConsultOrdersComponent;
  let fixture: ComponentFixture<ConfirmingConsultOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingConsultOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingConsultOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
