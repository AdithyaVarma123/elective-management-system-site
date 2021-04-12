import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfileComponent } from './page-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';

describe('PageProfileComponent', () => {
    let component: PageProfileComponent;
    let fixture: ComponentFixture<PageProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageProfileComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ServiceWorkerModule.register('ngsw-worker.js', { enabled: false })
            ],
            providers: [MessageService, SwPush, SwUpdate]
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
