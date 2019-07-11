/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { TranslateModule} from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AccountMovementDetailComponent } from './account-movement-detail.component';
import { MovementTRComponent } from './types/movement-tr/movement-tr.component';
import { MovementTRIComponent } from './types/movement-tri/movement-tri.component';
import { MovementADComponent } from './types/movement-ad/movement-ad.component';
import { MovementLIQComponent } from './types/movement-liq/movement-liq.component';
import { MovementRM34Component } from './types/movement-rm34/movement-rm34.component';
import { MovementARADComponent } from './types/movement-arad/movement-arad.component';
import { MovementSINDComponent } from './types/movement-sind/movement-sind.component';


@NgModule({
  declarations: [],
  entryComponents: [
    MovementTRComponent,
    MovementTRIComponent,
    MovementADComponent,
    MovementLIQComponent,
    MovementRM34Component,
    MovementARADComponent,
    MovementSINDComponent
  ]
})
class TestModule {}

describe('AccountMovementDetailComponent', () => {
  let component: AccountMovementDetailComponent;
  let fixture: ComponentFixture<AccountMovementDetailComponent>;




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TestModule,
        TranslateModule,
        TranslateModule.forRoot()
        ],
      declarations: [
        AccountMovementDetailComponent,
        MovementTRComponent,
        MovementTRIComponent,
        MovementADComponent,
        MovementLIQComponent,
        MovementRM34Component,
        MovementARADComponent,
        MovementSINDComponent
      ],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMovementDetailComponent);
    component = fixture.componentInstance;
    component.accountId = '1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // component.movementDetailId = "1";
    component.loadDetail();
  });
});
