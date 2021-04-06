import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ServiceWorkerModule.register('ngsw-worker.js', { enabled: false })
            ],
            providers: [MessageService, SwPush, SwUpdate]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'elective-management-system-site'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('elective-management-system-site');
    });
});
