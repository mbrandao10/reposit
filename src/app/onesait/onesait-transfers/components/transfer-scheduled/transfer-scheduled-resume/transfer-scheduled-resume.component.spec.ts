import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferScheduledResumeComponent } from './transfer-scheduled-resume.component';

describe('TransferScheduledResumeComponent', () => {
  let component: TransferScheduledResumeComponent;
  let fixture: ComponentFixture<TransferScheduledResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferScheduledResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferScheduledResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
