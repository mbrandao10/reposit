import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressPageComponent } from './nbexpress-page.component';

describe('NbExpressPageComponent', () => {
  let component: NbExpressPageComponent;
  let fixture: ComponentFixture<NbExpressPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
