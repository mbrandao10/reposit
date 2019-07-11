import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingIssueOrdersIndividualComponent } from './confirming-issue-orders-individual.component';

describe('ConfirmingPageComponent', () => {
  let component: ConfirmingIssueOrdersIndividualComponent;
  let fixture: ComponentFixture<ConfirmingIssueOrdersIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingIssueOrdersIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingIssueOrdersIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
