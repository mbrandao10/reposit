import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHeaderComponent } from './transfer-header.component';

describe('TransferHeaderComponent', () => {
  let component: TransferHeaderComponent;
  let fixture: ComponentFixture<TransferHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
