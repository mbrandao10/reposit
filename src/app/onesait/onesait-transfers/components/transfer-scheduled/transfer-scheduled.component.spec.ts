import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferScheduledComponent } from './transfer-scheduled.component';

describe('TransferScheduledComponent', () => {
  let component: TransferScheduledComponent;
  let fixture: ComponentFixture<TransferScheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferScheduledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
