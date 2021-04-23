import { TestBed } from '@angular/core/testing';

import { ElectivesService } from './electives.service';

describe('ElectivesService', () => {
  let service: ElectivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
