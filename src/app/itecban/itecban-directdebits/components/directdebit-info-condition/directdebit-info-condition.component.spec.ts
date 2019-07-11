import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectdebitInfoConditionComponent } from './directdebit-info-condition.component';

describe('DirectdebitInfoConditionComponent', () => {
  let component: DirectdebitInfoConditionComponent;
  let fixture: ComponentFixture<DirectdebitInfoConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectdebitInfoConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectdebitInfoConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
