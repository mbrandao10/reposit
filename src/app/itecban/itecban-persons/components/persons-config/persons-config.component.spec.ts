import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonsConfigComponent } from './persons-config.component';

describe('PersonsConfigComponent', () => {

  let component: PersonsConfigComponent;
  let fixture: ComponentFixture<PersonsConfigComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
