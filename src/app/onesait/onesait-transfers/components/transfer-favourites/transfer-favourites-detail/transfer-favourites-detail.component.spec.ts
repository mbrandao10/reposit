import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFavouritesDetailComponent } from './transfer-favourites-detail.component';

describe('TransferFavouritesDetailComponent', () => {
  let component: TransferFavouritesDetailComponent;
  let fixture: ComponentFixture<TransferFavouritesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferFavouritesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFavouritesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
