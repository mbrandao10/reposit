import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesPaidDetailComponent } from './fees-paid-detail.component';

describe('FeesPaidDetailComponent', () => {
  let component: FeesPaidDetailComponent;
  let fixture: ComponentFixture<FeesPaidDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesPaidDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesPaidDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
