import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRetentionsComponent } from './credit-retentions.component';

describe('CreditRetentionsComponent', () => {
  let component: CreditRetentionsComponent;
  let fixture: ComponentFixture<CreditRetentionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditRetentionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditRetentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
