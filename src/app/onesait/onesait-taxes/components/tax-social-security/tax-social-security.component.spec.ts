import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSocialSecurityComponent } from './tax-social-security.component';

describe('TaxSocialSecurityComponent', () => {
  let component: TaxSocialSecurityComponent;
  let fixture: ComponentFixture<TaxSocialSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxSocialSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSocialSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
