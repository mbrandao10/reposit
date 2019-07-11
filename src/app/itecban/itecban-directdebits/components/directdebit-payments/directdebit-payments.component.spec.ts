/* tslint:disable:no-unused-variable */
/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe} from '@ngx-translate/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../itecban-common//services-http/accounts/account.service';
import { ShareService } from '../../../itecban-common//services/share-service/share.service';
import { UtilsService } from '../../../itecban-common//services/utils-service/utils.service';
import { DatePipe } from '@angular/common';

import { ItecbanAccountServiceMock } from '../../../itecban-common/mocks/service/itecban-accounts-mock';
import { SharedServiceMock } from '../../../itecban-common/mocks/service/shared-service-mock';
import { UtilsServiceMock } from '../../../itecban-common//mocks/service/utils-service-mock';
import { MockedDatePipe } from '../../../../const/mocks/mocks-data';

import { DebitcardMovementsComponent } from './debitcard-movements.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CurrencyformatComponent } from '../../../itecban-common//components/currencyFormat/currencyFormat.component';
import { CurrencyPipe} from '../../../itecban-common//pipes/currency.pipe';
import { Pipe } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';

@Pipe({name: 'DateAgoPipe'})
export class DateAgoPipeMock{
  transform(key:string){

  }
}

describe('AccountMovementsComponent', () => {

  let component: DebitcardMovementsComponent;
  let fixture: ComponentFixture<DebitcardMovementsComponent>;

  let accountServiceMock = new ItecbanAccountServiceMock();
  let datePipe = new MockedDatePipe();
  let sharedMock = new SharedServiceMock();
  let utilsServiceMock = new UtilsServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule,
                InfiniteScrollModule,
                TranslateModule,
                TranslateModule.forRoot()],
      declarations: [
        DebitcardMovementsComponent,
        DateAgoPipeMock,
        CurrencyPipe,
        CurrencyformatComponent],
      providers:[
        {provide: Router},
        {provide: AccountService, useValue: accountServiceMock},
        {provide: ShareService, useValue: sharedMock},
        {provide: UtilsService, useValue: utilsServiceMock},
        {provide: DatePipe, useValue: datePipe}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitcardMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
