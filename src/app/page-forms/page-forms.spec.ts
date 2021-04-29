import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormsComponent } from './page-forms.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

describe('PageElectivesComponent', () => {
    let component: PageFormsComponent;
    let fixture: ComponentFixture<PageFormsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageFormsComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MessageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageFormsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
