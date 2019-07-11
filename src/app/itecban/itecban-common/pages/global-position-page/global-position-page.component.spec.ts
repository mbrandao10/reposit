/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GlobalPositionPageComponent } from './global-position-page.component';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('GlobalPositionPageComponent', () => {
  let component: GlobalPositionPageComponent;
  let fixture: ComponentFixture<GlobalPositionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [GlobalPositionPageComponent],
      imports: [TranslateModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPositionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
