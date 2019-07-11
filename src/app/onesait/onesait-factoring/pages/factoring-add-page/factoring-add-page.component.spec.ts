import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoringAddPageComponent } from './factoring-add-page.component';

describe('FactoringAddPageComponent', () => {
  let component: FactoringAddPageComponent;
  let fixture: ComponentFixture<FactoringAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoringAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoringAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
