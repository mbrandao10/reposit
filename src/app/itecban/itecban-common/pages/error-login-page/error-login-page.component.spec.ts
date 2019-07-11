import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';

import { ErrorLoginPageComponent } from './error-login-page.component';

describe('ErrorLoginPageComponent', () => {
  let component: ErrorLoginPageComponent;
  let fixture: ComponentFixture<ErrorLoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorLoginPageComponent ],
      providers: [
        {provide: Router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
