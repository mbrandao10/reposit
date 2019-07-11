/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'onesait-core';
// import { ItecbanAccountServiceMock} from '../../../onesait-core/mocks/service/itecban-accounts-mock';
import { AccountInfoConditionComponent } from './account-info-condition.component';


describe('AccountInfoConditionComponent', () => {
  let component: AccountInfoConditionComponent;
  let fixture: ComponentFixture<AccountInfoConditionComponent>;
  let accountServiceMock = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
                TranslateModule,
                TranslateModule.forRoot()],
      declarations: [ AccountInfoConditionComponent ],
      providers: [
        {provide: AccountService, useValue: accountServiceMock},
        {provide: ActivatedRoute, useValue: { 'params': from([{ 'id': 1 }]) } },
        {provide: Router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
