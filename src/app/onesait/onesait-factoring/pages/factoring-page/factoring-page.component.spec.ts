import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoringPageComponent } from './factoring-page.component';

describe('FactoringPageComponent', () => {
  let component: FactoringPageComponent;
  let fixture: ComponentFixture<FactoringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoringPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
