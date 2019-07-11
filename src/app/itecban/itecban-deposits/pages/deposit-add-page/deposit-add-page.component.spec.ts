import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositAddPageComponent } from './deposit-add-page.component';

describe('DepositAddPageComponent', () => {
  let component: DepositAddPageComponent;
  let fixture: ComponentFixture<DepositAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
