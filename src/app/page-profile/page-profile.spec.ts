import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfileComponent } from './page-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

describe('PageProfileComponent', () => {
    let component: PageProfileComponent;
    let fixture: ComponentFixture<PageProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageProfileComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MessageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
