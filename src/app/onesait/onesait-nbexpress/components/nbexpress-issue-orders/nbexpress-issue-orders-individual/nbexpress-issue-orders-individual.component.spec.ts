import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressIssueOrdersIndividualComponent } from './nbexpress-issue-orders-individual.component';

describe('NbExpressNbExpressIssueOrdersIndividualComponent', () => {
  let component: NbExpressIssueOrdersIndividualComponent;
  let fixture: ComponentFixture<NbExpressIssueOrdersIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressIssueOrdersIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressIssueOrdersIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
