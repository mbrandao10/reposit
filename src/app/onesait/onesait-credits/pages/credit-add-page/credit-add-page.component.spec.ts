import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAddPageComponent } from './credit-add-page.component';

describe('CreditAddPageComponent', () => {
  let component: CreditAddPageComponent;
  let fixture: ComponentFixture<CreditAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
