import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingPageComponent } from './confirming-page.component';

describe('ConfirmingPageComponent', () => {
  let component: ConfirmingPageComponent;
  let fixture: ComponentFixture<ConfirmingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
