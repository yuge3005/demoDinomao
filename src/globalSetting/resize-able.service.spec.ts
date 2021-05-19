/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResizeAbleService } from './resize-able.service';

describe('Service: ResizeAble', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResizeAbleService]
    });
  });

  it('should ...', inject([ResizeAbleService], (service: ResizeAbleService) => {
    expect(service).toBeTruthy();
  }));
});
