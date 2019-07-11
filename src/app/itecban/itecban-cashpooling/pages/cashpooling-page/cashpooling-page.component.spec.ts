import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashpoolingPageComponent } from './cashpooling-page.component';

describe('CashpoolingPageComponent', () => {
  let component: CashpoolingPageComponent;
  let fixture: ComponentFixture<CashpoolingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashpoolingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashpoolingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
