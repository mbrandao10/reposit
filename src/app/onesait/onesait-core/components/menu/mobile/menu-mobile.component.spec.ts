/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule} from '@ngx-translate/core';
import { MenuMobileComponent } from './menu-mobile.component';

import { Router } from '@angular/router';


describe('MenuMobileComponent', () => {
  let component: MenuMobileComponent;
  let fixture: ComponentFixture<MenuMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMobileComponent ],
      imports: [
        TranslateModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: Router, useValue: {url: 'prueba'}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
