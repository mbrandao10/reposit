import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEmitTargetComponent } from './transfer-emit-target.component';

describe('TransferEmitTargetComponent', () => {
  let component: TransferEmitTargetComponent;
  let fixture: ComponentFixture<TransferEmitTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEmitTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEmitTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
