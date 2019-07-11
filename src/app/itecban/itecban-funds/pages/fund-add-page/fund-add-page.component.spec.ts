import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundAddPageComponent } from './fund-add-page.component';

describe('FundAddPageComponent', () => {
  let component: FundAddPageComponent;
  let fixture: ComponentFixture<FundAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
