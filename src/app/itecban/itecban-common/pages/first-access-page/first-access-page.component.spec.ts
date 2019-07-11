import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAccessComponent } from './first-access-page.component';

describe('FirstAccessComponent', () => {
  let component: FirstAccessComponent;
  let fixture: ComponentFixture<FirstAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
