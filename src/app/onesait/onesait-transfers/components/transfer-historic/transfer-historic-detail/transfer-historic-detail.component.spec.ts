import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHistoricDetailComponent } from './transfer-historic-detail.component';

describe('TransferHistoricDetailComponent', () => {
  let component: TransferHistoricDetailComponent;
  let fixture: ComponentFixture<TransferHistoricDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferHistoricDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferHistoricDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
