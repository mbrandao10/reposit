import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferResumeComponent } from './transfer-resume.component';

describe('TransferResumeComponent', () => {
  let component: TransferResumeComponent;
  let fixture: ComponentFixture<TransferResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
