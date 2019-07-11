/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { AccountsCardboxComponent } from './accounts-cardbox.component';


describe('AccountsCardboxComponent', () => {
  let component: AccountsCardboxComponent;
  let fixture: ComponentFixture<AccountsCardboxComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(AccountsCardboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
