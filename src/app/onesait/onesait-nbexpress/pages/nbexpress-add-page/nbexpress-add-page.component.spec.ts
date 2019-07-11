import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbExpressAddPageComponent } from './nbexpress-add-page.component';

describe('NbExpressAddPageComponent', () => {
  let component: NbExpressAddPageComponent;
  let fixture: ComponentFixture<NbExpressAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbExpressAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbExpressAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
