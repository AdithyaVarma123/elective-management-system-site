import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageResetPasswordComponent } from './page-reset-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

describe('PageResetPasswordComponent', () => {
    let component: PageResetPasswordComponent;
    let fixture: ComponentFixture<PageResetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageResetPasswordComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MessageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
