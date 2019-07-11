import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEmitTraspComponent } from './transfer-emit-trasp.component';

describe('TransferEmitTraspComponent', () => {
  let component: TransferEmitTraspComponent;
  let fixture: ComponentFixture<TransferEmitTraspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEmitTraspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEmitTraspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
