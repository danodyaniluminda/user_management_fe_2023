import { TestBed } from '@angular/core/testing';

import { VerifyAndGenerateResultSheetService } from './verify-and-generate-result-sheet.service';

describe('VerifyAndGenerateResultSheetService', () => {
  let service: VerifyAndGenerateResultSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyAndGenerateResultSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
