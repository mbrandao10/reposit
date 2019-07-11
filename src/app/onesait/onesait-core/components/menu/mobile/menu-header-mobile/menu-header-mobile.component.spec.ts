/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule} from '@ngx-translate/core';
import { MenuHeaderMobileComponent } from './menu-header-mobile.component';

import { Router } from '@angular/router';


describe('MenuHeaderMobileComponent', () => {
  let component: MenuHeaderMobileComponent;
  let fixture: ComponentFixture<MenuHeaderMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuHeaderMobileComponent ],
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
    fixture = TestBed.createComponent(MenuHeaderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
