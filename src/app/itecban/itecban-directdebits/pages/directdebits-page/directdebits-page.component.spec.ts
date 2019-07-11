import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectdebitsPageComponent } from './directdebits-page.component';

describe('DirectdebitsPageComponent', () => {
  let component: DirectdebitsPageComponent;
  let fixture: ComponentFixture<DirectdebitsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectdebitsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectdebitsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
