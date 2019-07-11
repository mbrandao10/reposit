import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingDetailPageComponent } from './leasing-detail-page.component';

describe('ConfirmingPageComponent', () => {
  let component: LeasingDetailPageComponent;
  let fixture: ComponentFixture<LeasingDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasingDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasingDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
