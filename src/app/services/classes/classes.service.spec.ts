import { TestBed } from '@angular/core/testing';

import { ClassesService } from './classes.service';
import { HttpClientModule } from '@angular/common/http';

describe('ClassesService', () => {
    let service: ClassesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.inject(ClassesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
