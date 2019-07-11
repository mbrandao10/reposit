/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AccountMovementsComponent } from './account-movements.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('AccountMovementsComponent', () => {

  let component: AccountMovementsComponent;
  let fixture: ComponentFixture<AccountMovementsComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule,
                InfiniteScrollModule,
                TranslateModule,
                TranslateModule.forRoot()],
      declarations: [],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
