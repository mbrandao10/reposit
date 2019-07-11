import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittanceDetailComponent } from './remittance-detail.component';

describe('RemittanceDetailComponent', () => {
  let component: RemittanceDetailComponent;
  let fixture: ComponentFixture<RemittanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemittanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemittanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
