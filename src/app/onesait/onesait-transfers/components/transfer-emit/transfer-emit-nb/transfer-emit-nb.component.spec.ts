import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEmitNBComponent } from './transfer-emit-nb.component';

describe('TransferEmitNBComponent', () => {
  let component: TransferEmitNBComponent;
  let fixture: ComponentFixture<TransferEmitNBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEmitNBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEmitNBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
