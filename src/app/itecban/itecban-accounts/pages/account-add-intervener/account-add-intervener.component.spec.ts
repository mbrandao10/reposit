/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  from } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { AccountAddIntervenerComponent } from './account-add-intervener.component';

import { AccountService } from 'onesait-core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AccountAddIntervenerComponent', () => {
  let component: AccountAddIntervenerComponent;
  let accountServiceMock = null;
  let fixture: ComponentFixture<AccountAddIntervenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [FormsModule, TranslateModule, TranslateModule.forRoot()],
        declarations: [ AccountAddIntervenerComponent ],
        providers: [
          { provide: AccountService, useValue: accountServiceMock },
          { provide: Router },
          { provide: ActivatedRoute, useValue: { 'params': from([{ 'id': 1 }]) } }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAddIntervenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
        expect(component).toBeTruthy();

        component.newIntervener = {};
            component.newIntervener.name = 'Marina';
            component.newIntervener.surname = 'Casas';
            component.newIntervener.secondSurname = 'Vazquez';
            component.newIntervener.email = 'theuser@theemail.org';
                component.newIntervener.legalDocument = {};
                component.newIntervener.legalDocument.type = '01';
                component.newIntervener.legalDocument.id = '12345678Z';

        accountServiceMock.postInterveners('1', component.newIntervener).subscribe(result => {
            expect(result['data']).toBeTruthy();
        });
  });
});
