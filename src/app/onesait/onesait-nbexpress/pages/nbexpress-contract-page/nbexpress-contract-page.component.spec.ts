import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressContractPageComponent } from './nbexpress-contract-page.component';

describe('NbExpressContractPageComponent', () => {
  let component: NbExpressContractPageComponent;
  let fixture: ComponentFixture<NbExpressContractPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressContractPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressContractPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
