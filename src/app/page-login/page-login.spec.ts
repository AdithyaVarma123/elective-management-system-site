import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoginComponent } from './page-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

describe('PageLoginComponent', () => {
    let component: PageLoginComponent;
    let fixture: ComponentFixture<PageLoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MessageService],
            declarations: [PageLoginComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
