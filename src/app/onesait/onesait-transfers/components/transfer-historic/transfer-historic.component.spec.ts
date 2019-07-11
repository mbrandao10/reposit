import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHistoricComponent } from './transfer-historic.component';

describe('TransferHistoricComponent', () => {
  let component: TransferHistoricComponent;
  let fixture: ComponentFixture<TransferHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
