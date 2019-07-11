import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEmitComponent } from './transfer-emit.component';

describe('TransferEmitComponent', () => {
  let component: TransferEmitComponent;
  let fixture: ComponentFixture<TransferEmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
