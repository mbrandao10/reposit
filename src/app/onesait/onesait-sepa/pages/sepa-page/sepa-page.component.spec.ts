import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SepaPageComponent } from './sepa-page.component';

describe('SepaPageComponent', () => {
  let component: SepaPageComponent;
  let fixture: ComponentFixture<SepaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SepaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SepaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
