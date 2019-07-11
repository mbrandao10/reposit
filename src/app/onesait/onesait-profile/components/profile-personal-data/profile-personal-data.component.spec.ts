import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePersonalDataComponent } from './profile-personal-data.component';

describe('ProfilePersonalDataComponent', () => {
  let component: ProfilePersonalDataComponent;
  let fixture: ComponentFixture<ProfilePersonalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePersonalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
