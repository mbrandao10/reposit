import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingContractPageComponent } from './confirming-contract-page.component';

describe('ConfirmingContractPageComponent', () => {
  let component: ConfirmingContractPageComponent;
  let fixture: ComponentFixture<ConfirmingContractPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingContractPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingContractPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
