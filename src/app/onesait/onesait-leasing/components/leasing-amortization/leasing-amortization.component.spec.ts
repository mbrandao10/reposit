import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdvanceComponent } from './request-advance.component';

describe('RequestAdvanceComponent', () => {
  let component: RequestAdvanceComponent;
  let fixture: ComponentFixture<RequestAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
