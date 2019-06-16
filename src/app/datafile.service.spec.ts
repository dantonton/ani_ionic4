import { TestBed } from '@angular/core/testing';

import { DatafileService } from './datafile.service';

describe('DatafileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatafileService = TestBed.get(DatafileService);
    expect(service).toBeTruthy();
  });
});
