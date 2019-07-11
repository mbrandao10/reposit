/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { AccountPageComponent } from './account-page.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';


describe('AccountPageComponent', () => {
  let component: AccountPageComponent;
  let fixture: ComponentFixture<AccountPageComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule,
                InfiniteScrollModule,
                TranslateModule,
                TranslateModule.forRoot()],
      declarations: [ ],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
