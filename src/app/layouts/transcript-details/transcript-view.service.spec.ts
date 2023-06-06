import { TranscriptViewService } from "./transcript-view.service";
import { TestBed } from "@angular/core/testing";

describe("TranscriptViewService", () => {

  let service: TranscriptViewService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranscriptViewService
      ]
    });
    service = TestBed.get(TranscriptViewService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
