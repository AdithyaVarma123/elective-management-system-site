import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFillFormComponent } from './page-fill-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

describe('PageFillFormComponent', () => {
    let component: PageFillFormComponent;
    let fixture: ComponentFixture<PageFillFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageFillFormComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MessageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageFillFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
