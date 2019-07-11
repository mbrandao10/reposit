import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingIssueOrdersComponent } from './confirming-issue-orders.component';

describe('ConfirmingPageComponent', () => {
  let component: ConfirmingIssueOrdersComponent;
  let fixture: ComponentFixture<ConfirmingIssueOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingIssueOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingIssueOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
