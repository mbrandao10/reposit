import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxIvaComponent } from './tax-iva.component';

describe('TaxIvaComponent', () => {
  let component: TaxIvaComponent;
  let fixture: ComponentFixture<TaxIvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxIvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
