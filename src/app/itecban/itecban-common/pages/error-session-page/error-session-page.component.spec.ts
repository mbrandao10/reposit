import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';

import { ErrorSessionPageComponent } from './error-session-page.component';

describe('ErrorSessionPageComponent', () => {
  let component: ErrorSessionPageComponent;
  let fixture: ComponentFixture<ErrorSessionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorSessionPageComponent ],
      providers: [
        {provide: Router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
