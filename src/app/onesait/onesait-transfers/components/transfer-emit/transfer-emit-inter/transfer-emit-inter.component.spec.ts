import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEmitInterComponent } from './transfer-emit-inter.component';

describe('TransferEmitInterComponent', () => {
  let component: TransferEmitInterComponent;
  let fixture: ComponentFixture<TransferEmitInterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEmitInterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEmitInterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
