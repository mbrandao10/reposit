/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomSanitizer} from '@angular/platform-browser';

import { DocumentboxListComponent } from './documentbox-list.component';


describe('DocumentboxListComponent', () => {
  let component: DocumentboxListComponent;
  let fixture: ComponentFixture<DocumentboxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

        ],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have documents', () => {

  });
});
