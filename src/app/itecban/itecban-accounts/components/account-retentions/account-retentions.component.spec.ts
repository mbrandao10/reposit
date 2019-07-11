import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountRetentionsComponent } from './account-retentions.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule} from '@ngx-translate/core';

describe('AccountRetentionsComponent', () => {
  let component: AccountRetentionsComponent;
  let fixture: ComponentFixture<AccountRetentionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule,
        TranslateModule.forRoot(),
        InfiniteScrollModule ],
      declarations: [],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRetentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
