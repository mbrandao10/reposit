import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingRequestAdvanceComponent } from './confirming-request-advance.component';

describe('ConfirmingRequestAdvanceComponent', () => {
  let component: ConfirmingRequestAdvanceComponent;
  let fixture: ComponentFixture<ConfirmingRequestAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingRequestAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingRequestAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
