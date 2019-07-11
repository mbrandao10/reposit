import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittanceReturnedListComponent } from './remittance-returned-list.component';

describe('RemittanceReturnedListComponent', () => {
  let component: RemittanceReturnedListComponent;
  let fixture: ComponentFixture<RemittanceReturnedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemittanceReturnedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemittanceReturnedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
