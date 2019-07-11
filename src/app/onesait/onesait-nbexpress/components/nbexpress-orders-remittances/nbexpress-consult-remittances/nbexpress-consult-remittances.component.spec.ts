import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressConsultRemittancesComponent } from './nbexpress-consult-remittances.component';

describe('NbExpressConsultRemittancesComponent', () => {
  let component: NbExpressConsultRemittancesComponent;
  let fixture: ComponentFixture<NbExpressConsultRemittancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressConsultRemittancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressConsultRemittancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
