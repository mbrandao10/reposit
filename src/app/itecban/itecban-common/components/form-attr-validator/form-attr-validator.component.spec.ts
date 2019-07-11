import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormAttrValidatorComponent } from './form-attr-validator.component';

describe('FormAttrValidatorComponent', () => {
  let component: FormAttrValidatorComponent;
  let fixture: ComponentFixture<FormAttrValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAttrValidatorComponent ],
      imports: [
        TranslateModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAttrValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
