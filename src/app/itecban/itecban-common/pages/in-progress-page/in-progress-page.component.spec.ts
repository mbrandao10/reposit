import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressPageComponent } from './in-progress-page.component';

describe('InProgressPageComponent', () => {
  let component: InProgressPageComponent;
  let fixture: ComponentFixture<InProgressPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InProgressPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
