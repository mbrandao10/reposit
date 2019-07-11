import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';

import { Error500PageComponent } from './error-500-page.component';

describe('Error500PageComponent', () => {
  let component: Error500PageComponent;
  let fixture: ComponentFixture<Error500PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Error500PageComponent ],
      providers: [
        {provide: Router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error500PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
