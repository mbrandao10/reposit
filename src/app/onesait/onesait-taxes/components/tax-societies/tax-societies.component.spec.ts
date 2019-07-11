import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSocietiesComponent } from './tax-societies.component';

describe('TaxSocietiesComponent', () => {
  let component: TaxSocietiesComponent;
  let fixture: ComponentFixture<TaxSocietiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxSocietiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSocietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
