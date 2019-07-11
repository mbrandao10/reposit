import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MySpacePageComponent } from './my-space-page.component';

import { PersonsUtilsService } from '../../services/persons-utils/persons-utils.service';


import { from } from 'rxjs';

describe('MySpacePageComponent', () => {
  let component: MySpacePageComponent;
  let fixture: ComponentFixture<MySpacePageComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        TranslateModule,
        TranslateModule.forRoot()
      ],
      declarations: [MySpacePageComponent],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
