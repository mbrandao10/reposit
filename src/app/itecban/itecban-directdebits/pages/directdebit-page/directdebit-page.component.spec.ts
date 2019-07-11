import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectdebitPageComponent } from './directdebit-page.component';

describe('DirectdebitPageComponent', () => {
  let component: DirectdebitPageComponent;
  let fixture: ComponentFixture<DirectdebitPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectdebitPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectdebitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
