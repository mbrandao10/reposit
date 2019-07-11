import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressRequestAdvanceComponent } from './nbexpress-request-advance.component';

describe('NbExpressRequestAdvanceComponent', () => {
  let component: NbExpressRequestAdvanceComponent;
  let fixture: ComponentFixture<NbExpressRequestAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressRequestAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressRequestAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
