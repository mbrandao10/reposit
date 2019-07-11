import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoHeaderService } from '../../services/info-header-service/info-header.service';
import { InfoHeaderComponent } from './info-header.component';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

export class InfoHeaderServiceMock {
  private notify = new Subject<any>();
  notifyObservable: Observable<any> = this.notify.asObservable();

  showInfoHeader() {
    this.notify.next({});
  }
}

describe('InfoHeaderComponent', () => {
  let component: InfoHeaderComponent;
  let fixture: ComponentFixture<InfoHeaderComponent>;
  let mock = new InfoHeaderServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoHeaderComponent],
      providers: [
        { provide: InfoHeaderService, useValue: mock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
