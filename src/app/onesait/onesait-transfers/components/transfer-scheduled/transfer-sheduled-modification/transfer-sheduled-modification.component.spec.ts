import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSheduledModificationComponent } from './transfer-sheduled-modification.component';

describe('TransferSheduledModificationComponent', () => {
  let component: TransferSheduledModificationComponent;
  let fixture: ComponentFixture<TransferSheduledModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferSheduledModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferSheduledModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
