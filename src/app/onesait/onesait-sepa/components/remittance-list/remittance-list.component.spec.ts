import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittanceListComponent } from './remittance-list.component';

describe('RemittanceListComponent', () => {
  let component: RemittanceListComponent;
  let fixture: ComponentFixture<RemittanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemittanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemittanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
