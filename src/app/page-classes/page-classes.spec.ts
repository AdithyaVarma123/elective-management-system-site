import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageClassesComponent } from './page-classes.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MessageService } from "primeng/api";

describe('PageClassesComponent', () => {
    let component: PageClassesComponent;
    let fixture: ComponentFixture<PageClassesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageClassesComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MessageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageClassesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
