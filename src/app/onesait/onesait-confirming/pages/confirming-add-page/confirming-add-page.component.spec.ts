import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingAddPageComponent } from './confirming-add-page.component';

describe('ConfirmingAddPageComponent', () => {
  let component: ConfirmingAddPageComponent;
  let fixture: ComponentFixture<ConfirmingAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
