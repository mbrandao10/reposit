import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalPositionBoxComponent } from './global-position-box.component';

describe('GlobalPositionBoxComponent', () => {
    let component: GlobalPositionBoxComponent;
    let fixture: ComponentFixture<GlobalPositionBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GlobalPositionBoxComponent],
            imports: [
                TranslateModule,
                TranslateModule.forRoot()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GlobalPositionBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
