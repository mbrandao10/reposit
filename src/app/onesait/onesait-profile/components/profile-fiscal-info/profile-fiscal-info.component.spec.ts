import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFiscalInfoComponent } from './profile-fiscal-info.component';

describe('ProfileFiscalInfoComponent', () => {
  let component: ProfileFiscalInfoComponent;
  let fixture: ComponentFixture<ProfileFiscalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFiscalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFiscalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
