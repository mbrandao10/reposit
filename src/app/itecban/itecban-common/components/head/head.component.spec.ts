/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeadComponent } from './head.component';

import { Router } from '@angular/router';

describe('HeadComponent', () => {
  let component: HeadComponent;
  let fixture: ComponentFixture<HeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadComponent ],
      providers: [
        {provide: Router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
