/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FirebaseAnaliyticsService } from './firebase-analiytics.service';

describe('Service: FirebaseAnaliytics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseAnaliyticsService]
    });
  });

  it('should ...', inject([FirebaseAnaliyticsService], (service: FirebaseAnaliyticsService) => {
    expect(service).toBeTruthy();
  }));
});
