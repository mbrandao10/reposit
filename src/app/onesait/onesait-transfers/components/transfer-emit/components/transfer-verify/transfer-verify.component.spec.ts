import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferVerifyComponent } from './transfer-verify.component';

describe('TransferVerifyComponent', () => {
  let component: TransferVerifyComponent;
  let fixture: ComponentFixture<TransferVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
