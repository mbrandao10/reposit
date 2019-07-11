import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingConsultRemittancesComponent } from './confirming-consult-remittances.component';

describe('ConfirmingConsultRemittancesComponent', () => {
  let component: ConfirmingConsultRemittancesComponent;
  let fixture: ComponentFixture<ConfirmingConsultRemittancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingConsultRemittancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingConsultRemittancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
