import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingPageComponent } from './leasing-page.component';

describe('ConfirmingPageComponent', () => {
  let component: LeasingPageComponent;
  let fixture: ComponentFixture<LeasingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
