import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TokenComponent } from 'itecban-common/components/token/token.component';

import { PersonsPersonalDataComponent } from './persons-personal-data.component';

import { CustomersService } from 'itecban-common/services-http/customers/customers.service';
import { PersonsUtilsService } from '../../services/persons-utils/persons-utils.service';
import { UtilsService } from 'itecban-common/services/utils-service/utils.service';
import { CompareModificationsService } from 'itecban-common/services/compare-modifications-service/compare-modifications.service';

import { UtilsServiceMock } from '../../../itecban-common/mocks/service/utils-service-mock';
import { ItecbanPersonsServiceMock } from '../../../itecban-common/mocks/service/itecban-persons-mock';
import { CompareModificationsServiceMock } from '../../../itecban-common/mocks/service/compare-modifications-service-mock';

describe('PersonsPersonalInfoComponent', () => {
  let component: PersonsPersonalDataComponent;
  let fixture: ComponentFixture<PersonsPersonalDataComponent>;

  let utilsServiceMock = new UtilsServiceMock();
  let personsServiceMock = new ItecbanPersonsServiceMock();
  let compareModificationsServiceMock = new CompareModificationsServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
                TranslateModule,
                TranslateModule.forRoot()],
      declarations: [ PersonsPersonalDataComponent,
                      TokenComponent ],
      providers: [ {provide: UtilsService, useValue: utilsServiceMock },
                   {provide: CustomersService, useValue: personsServiceMock},
                   {provide: PersonsUtilsService, useValue: personsServiceMock},
                   {provide: CompareModificationsService, useValue: compareModificationsServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
