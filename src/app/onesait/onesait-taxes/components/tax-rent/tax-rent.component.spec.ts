import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRentComponent } from './tax-rent.component';

describe('TaxRentComponent', () => {
  let component: TaxRentComponent;
  let fixture: ComponentFixture<TaxRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
