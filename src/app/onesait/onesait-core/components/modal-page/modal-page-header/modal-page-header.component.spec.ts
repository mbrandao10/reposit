import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPageHeaderComponent } from './modal-page-header.component';


describe('ModalPageHeaderComponent', () => {
  let component: ModalPageHeaderComponent;
  let fixture: ComponentFixture<ModalPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
