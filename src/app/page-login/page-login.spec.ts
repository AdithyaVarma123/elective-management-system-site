// @ts-ignore
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLoginComponent } from './page-login.component';
// @ts-ignore
import { HttpClientTestingModule } from '@angular/common/http/testing';
// @ts-ignore
import { RouterTestingModule } from '@angular/router/testing';
// @ts-ignore
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
