import { TestBed } from '@angular/core/testing';

import { AngularxDatatableService } from './angularx-datatable.service';

describe('AngularxDatatableService', () => {
  let service: AngularxDatatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularxDatatableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
