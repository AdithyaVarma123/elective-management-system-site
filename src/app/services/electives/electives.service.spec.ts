import { TestBed } from '@angular/core/testing';

import { ElectivesService } from './electives.service';
import { HttpClientModule } from "@angular/common/http";

describe('ElectivesService', () => {
    let service: ElectivesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.inject(ElectivesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
