import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoringContractPageComponent } from './factoring-contract-page.component';

describe('FactoringContractPageComponent', () => {
  let component: FactoringContractPageComponent;
  let fixture: ComponentFixture<FactoringContractPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoringContractPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoringContractPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
