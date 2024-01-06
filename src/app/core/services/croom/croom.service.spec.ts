import { TestBed } from '@angular/core/testing';

import { CroomService } from './croom.service';

describe('CroomService', () => {
  let service: CroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
