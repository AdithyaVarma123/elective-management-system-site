import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms.service';
import { HttpClientModule } from "@angular/common/http";

describe('FormsService', () => {
    let service: FormsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.inject(FormsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
