import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAddPageComponent } from './loan-add-page.component';

describe('LoanAddPageComponent', () => {
  let component: LoanAddPageComponent;
  let fixture: ComponentFixture<LoanAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
