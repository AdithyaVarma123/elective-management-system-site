import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdministrationComponent } from './page-administration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

describe('PageAdministrationComponent', () => {
    let component: PageAdministrationComponent;
    let fixture: ComponentFixture<PageAdministrationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageAdministrationComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MessageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageAdministrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
