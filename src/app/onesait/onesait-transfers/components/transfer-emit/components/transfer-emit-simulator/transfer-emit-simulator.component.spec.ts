import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEmitSimulatorComponent } from './transfer-emit-simulator.component';

describe('TransferEmitSimulatorComponent', () => {
  let component: TransferEmitSimulatorComponent;
  let fixture: ComponentFixture<TransferEmitSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEmitSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEmitSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
