import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressIssueOrdersComponent } from './nbexpress-issue-orders.component';

describe('NbExpressNbExpressIssueOrdersComponent', () => {
  let component: NbExpressIssueOrdersComponent;
  let fixture: ComponentFixture<NbExpressIssueOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressIssueOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressIssueOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
