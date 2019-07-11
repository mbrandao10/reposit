import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferShowAddFavComponent } from './transfer-show-add-fav.component';

describe('TransferShowAddFavComponent', () => {
  let component: TransferShowAddFavComponent;
  let fixture: ComponentFixture<TransferShowAddFavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferShowAddFavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferShowAddFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
