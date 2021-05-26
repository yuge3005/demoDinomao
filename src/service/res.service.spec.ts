/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResService } from './res.service';

describe('Service: Res', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResService]
    });
  });

  it('should ...', inject([ResService], (service: ResService) => {
    expect(service).toBeTruthy();
  }));
});
