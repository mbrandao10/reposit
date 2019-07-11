import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquityPageComponent } from './equity-page.component';

describe('EquityPageComponent', () => {
  let component: EquityPageComponent;
  let fixture: ComponentFixture<EquityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
