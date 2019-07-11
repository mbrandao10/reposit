import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TranslateModule} from '@ngx-translate/core';

import { AccountAddPageComponent } from './account-add-page.component';


describe('AccountAddPageComponent', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAddPageComponent
                       ],
      imports: [
        FormsModule,
        TranslateModule,
        TranslateModule.forRoot()
        ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

  });

  it('should create', () => {

  });
});
