import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEmitSepaComponent } from './transfer-emit-sepa.component';

describe('TransferEmitSepaComponent', () => {
  let component: TransferEmitSepaComponent;
  let fixture: ComponentFixture<TransferEmitSepaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEmitSepaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEmitSepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
