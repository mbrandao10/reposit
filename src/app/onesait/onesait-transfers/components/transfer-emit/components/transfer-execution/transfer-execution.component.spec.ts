import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferExecutionComponent } from './transfer-execution.component';

describe('TransferExecutionComponent', () => {
  let component: TransferExecutionComponent;
  let fixture: ComponentFixture<TransferExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
