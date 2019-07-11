import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFavouritesComponent } from './transfer-favourites.component';

describe('TransferFavouritesComponent', () => {
  let component: TransferFavouritesComponent;
  let fixture: ComponentFixture<TransferFavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferFavouritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
