import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingAddResumeComponent } from './confirming-add-resume.component';

describe('ConfirmingAddResumeComponent', () => {
  let component: ConfirmingAddResumeComponent;
  let fixture: ComponentFixture<ConfirmingAddResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingAddResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingAddResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
