import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxOthersComponent } from './tax-others.component';

describe('TaxOthersComponent', () => {
  let component: TaxOthersComponent;
  let fixture: ComponentFixture<TaxOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
