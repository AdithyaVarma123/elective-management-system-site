import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageElectivesComponent } from './page-electives.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

describe('PageElectivesComponent', () => {
    let component: PageElectivesComponent;
    let fixture: ComponentFixture<PageElectivesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageElectivesComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MessageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageElectivesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should fail for bad batch', () => {
        component.batches = ['some_failing_batch'];
        expect(() => {component.addElective();}).toThrow('bad batch');
    });

});
