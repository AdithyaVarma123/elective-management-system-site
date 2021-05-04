import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageClassComponent } from './page-class.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

describe('PageClassComponent', () => {
    let component: PageClassComponent;
    let fixture: ComponentFixture<PageClassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageClassComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MessageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
