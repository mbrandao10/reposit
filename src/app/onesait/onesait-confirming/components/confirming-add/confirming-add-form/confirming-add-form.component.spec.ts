import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingAddFormComponent } from './confirming-add-form.component';

describe('ConfirmingAddFormComponent', () => {
  let component: ConfirmingAddFormComponent;
  let fixture: ComponentFixture<ConfirmingAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
