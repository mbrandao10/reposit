import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountLocksComponent } from './account-locks.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
import { AccountService } from 'onesait-core';

describe('AccountLocksComponent', () => {
  let component: AccountLocksComponent;
  let fixture: ComponentFixture<AccountLocksComponent>;
  let accountServiceMock = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [InfiniteScrollModule,
                TranslateModule,
                TranslateModule.forRoot()],
      declarations: [ AccountLocksComponent
                       ],
      providers: [{ provide: AccountService, useValue: accountServiceMock  }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
